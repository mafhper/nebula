// Valida .github/dependabot.yml contra o schema oficial do Dependabot.
//
// POR QUE ISTO EXISTE
// A check ".github/dependabot.yml" do GitHub roda SO no push para a main. Um
// config invalido passa o PR inteiro -- todos os checks verdes, mergeado -- e
// so quebra DEPOIS do merge. Foi o que aconteceu com `auto-update: true`:
// propriedade que nao existe no schema, rejeitada com
//
//   The property '#/updates/0/' contains additional properties
//   ["auto-update"] outside of the schema when none are allowed
//
// Este script move a validacao para o PR. Schema:
// https://json.schemastore.org/dependabot-2.0.json
//
// Dependencias: prettier (parser YAML, ja devDependency) e ajv (via eslint).
// Nao ha js-yaml no projeto; por isso o parser do prettier.
//
// Uso:  node scripts/validar-dependabot.mjs
// Saida: 0 = valido, 1 = invalido, 2 = erro de ambiente (nao e falha do config)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const Ajv = require('ajv');
const { parsers } = await import('prettier/plugins/yaml.mjs');

const ARQUIVO = '.github/dependabot.yml';
const SCHEMA_URL = 'https://json.schemastore.org/dependabot-2.0.json';
// Cache em node_modules/.cache: ja ignorado e autossuficiente. Gravar fora
// quebra em clone limpo.
const CACHE = join('node_modules', '.cache', 'dependabot-schema.json');

function cachecarSchema() {
  if (existsSync(CACHE)) return readFileSync(CACHE, 'utf8');
  throw new Error('cache ausente');
}

async function obterSchema() {
  let texto;
  try {
    texto = cachecarSchema();
  } catch {
    const resposta = await fetch(SCHEMA_URL);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status} ao baixar o schema`);
    texto = await resposta.text();
    mkdirSync(dirname(CACHE), { recursive: true });
    writeFileSync(CACHE, texto);
  }
  return JSON.parse(texto);
}

// mappingKey/mappingValue/sequenceItem tem sempre exatamente um filho, e a
// conversao devolve array. Desembrulhar aqui -- e so aqui, nunca em 'sequence',
// onde um array de 1 item e um valor legitimo.
function desembrulhar(v) {
  return Array.isArray(v) && v.length === 1 ? v[0] : v;
}

function astParaJson(nos) {
  if (Array.isArray(nos)) return nos.map(astParaJson);
  if (nos === null || typeof nos !== 'object') return nos;
  if (typeof nos.type !== 'string') return nos;
  switch (nos.type) {
    case 'root':
      return desembrulhar(astParaJson(nos.children));
    case 'document': {
      const corpo = (nos.children ?? []).find((c) => c.type === 'documentBody');
      return corpo ? desembrulhar(astParaJson(corpo)) : null;
    }
    case 'documentBody':
      return astParaJson(nos.children);
    case 'documentHead':
      return null;
    case 'mapping':
      return Object.fromEntries(
        nos.children
          .map((item) => {
            const [k, v] = item.children ?? [];
            return [String(astParaJson(k)), astParaJson(v)];
          })
          .filter(([k]) => k !== 'undefined' && k !== 'null'),
      );
    case 'mappingItem':
    case 'mappingKey':
    case 'mappingValue':
    case 'sequenceItem':
      return desembrulhar(astParaJson(nos.children));
    case 'sequence':
      return astParaJson(nos.children);
    case 'plain':
    case 'quoteSingle': {
      const cru = (nos.raw ?? nos.value ?? '').trim();
      const v = nos.value ?? cru;
      if (typeof v === 'string') {
        if (/^-?\d+$/.test(cru)) return Number(cru);
        if (cru === 'true') return true;
        if (cru === 'false') return false;
        if (cru === 'null' || cru === '~') return null;
        return cru;
      }
      return v;
    }
    default:
      if ('children' in nos) return astParaJson(nos.children);
      if ('value' in nos) return astParaJson(nos.value);
      return null;
  }
}

let schema;
try {
  schema = await obterSchema();
} catch (e) {
  // Sem rede e sem cache: nao e falha do dependabot.yml. Falhar aqui
  // transformaria indisponibilidade de rede em PR vermelho sem causa.
  console.warn(`AVISO: nao foi possivel obter o schema do Dependabot (${e.message}). Pulando.`);
  process.exit(2);
}

const ast = parsers.yaml.parse(readFileSync(ARQUIVO, 'utf8'), { filepath: ARQUIVO });
const doc = astParaJson(ast);

const ajv = new Ajv({ allErrors: true, strict: false });
const validar = ajv.compile(schema);

if (validar(doc)) {
  console.log('VALIDO: .github/dependabot.yml conforms ao schema do Dependabot');
  for (const [i, u] of doc.updates.entries()) {
    console.log(`  updates[${i}] ${u['package-ecosystem']}: ${Object.keys(u).join(', ')}`);
  }
  process.exit(0);
}

console.error(`INVALIDO: ${ARQUIVO}`);
for (const e of validar.errors) {
  const caminho = e.instancePath || '(raiz)';
  console.error(`  ${caminho} -> ${e.message}`);
  if (e.params?.additionalProperty) {
    console.error(`      propriedade nao permitida: "${e.params.additionalProperty}"`);
  }
}
process.exit(1);
