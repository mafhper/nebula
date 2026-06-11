/**
 * Small, dependency-free colour helpers for the playground colour controls.
 * Parses hex / rgb() / hsl() input and converts between them. HSL is the
 * canonical edit/display format; THREE.Color.setStyle accepts the hsl() strings
 * we emit, so stored colours stay shader-compatible.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

/** Parse a hex (#rgb/#rrggbb), rgb()/rgba() or hsl()/hsla() string to RGB. */
export function parseColor(input: string | undefined): RGB | null {
  if (!input) return null;
  const s = input.trim().toLowerCase();

  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    let h = hex[1];
    if (h.length === 3)
      h = h
        .split('')
        .map((c) => c + c)
        .join('');
    const n = Number.parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  const rgb = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*[\d.]+\s*)?\)$/);
  if (rgb) {
    return { r: clampByte(+rgb[1]), g: clampByte(+rgb[2]), b: clampByte(+rgb[3]) };
  }

  const hsl = s.match(
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/,
  );
  if (hsl) {
    return hslToRgb({ h: +hsl[1], s: +hsl[2], l: +hsl[3] });
  }

  return null;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;

  if (sn === 0) {
    const v = clampByte(ln * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  return {
    r: clampByte(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: clampByte(hue2rgb(p, q, hn) * 255),
    b: clampByte(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

export function toHex(rgb: RGB): string {
  const h = (v: number) => clampByte(v).toString(16).padStart(2, '0');
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`;
}

/** Canonical HSL string, e.g. `hsl(210, 64%, 48%)`. */
export function toHslString(rgb: RGB): string {
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/** Normalise any accepted colour string to hex (for <input type="color">). */
export function toHexFrom(input: string | undefined, fallback = '#000000'): string {
  const rgb = parseColor(input);
  return rgb ? toHex(rgb) : fallback;
}

/** Normalise any accepted colour string to an HSL string. */
export function toHslFrom(input: string | undefined, fallback = 'hsl(0, 0%, 0%)'): string {
  const rgb = parseColor(input);
  return rgb ? toHslString(rgb) : fallback;
}
