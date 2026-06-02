import { describe, expect, it } from 'vitest';

import { effectSettingsMap } from './effectSettings';
import {
  auroraPresetIds,
  type EffectId,
  effectIds,
  fluidPresetIds,
  geometricPresetIds,
  particleGalaxyPresetIds,
  plasmaPresetIds,
  starfieldPresetIds,
  vortexPresetIds,
  wavePlanePresetIds,
} from './effectRegistry';

const firstPresetId: Record<EffectId, string> = {
  aurora: auroraPresetIds[0],
  'fluid-gradient': fluidPresetIds[0],
  geometric: geometricPresetIds[0],
  'particle-galaxy': particleGalaxyPresetIds[0],
  plasma: plasmaPresetIds[0],
  starfield: starfieldPresetIds[0],
  vortex: vortexPresetIds[0],
  'wave-plane': wavePlanePresetIds[0],
};

describe('effectSettingsMap', () => {
  it('has entries for all registered effects', () => {
    for (const id of effectIds) {
      expect(effectSettingsMap[id]).toBeDefined();
    }
    expect(Object.keys(effectSettingsMap)).toHaveLength(effectIds.length);
  });

  for (const id of effectIds) {
    describe(`${id} adapter`, () => {
      const adapter = effectSettingsMap[id];
      const presetId = firstPresetId[id];

      it('toSettings returns a record with color1 and color2', () => {
        const settings = adapter.toSettings(presetId);
        expect(settings).toBeTypeOf('object');
        expect(settings.color1).toBeTypeOf('string');
        expect(settings.color2).toBeTypeOf('string');
      });

      it('toSettings returns at least 5 keys', () => {
        const settings = adapter.toSettings(presetId);
        expect(Object.keys(settings).length).toBeGreaterThanOrEqual(5);
      });

      it('toSnippet returns a string containing the preset ID', () => {
        const settings = adapter.toSettings(presetId);
        const snippet = adapter.toSnippet(presetId, settings);
        expect(snippet).toBeTypeOf('string');
        expect(snippet.length).toBeGreaterThan(20);
        expect(snippet).toContain(`preset="${presetId}"`);
      });

      it('toSettings + toSnippet roundtrip works for all presets', () => {
        const presetIds = {
          aurora: auroraPresetIds,
          'fluid-gradient': fluidPresetIds,
          geometric: geometricPresetIds,
          'particle-galaxy': particleGalaxyPresetIds,
          plasma: plasmaPresetIds,
          starfield: starfieldPresetIds,
          vortex: vortexPresetIds,
          'wave-plane': wavePlanePresetIds,
        }[id];
        for (const pid of presetIds) {
          const settings = adapter.toSettings(pid);
          const snippet = adapter.toSnippet(pid, settings);
          expect(snippet).toContain(`preset="${pid}"`);
          expect(snippet).toContain('Effect');
        }
      });
    });
  }
});
