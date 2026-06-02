import { describe, expect, it } from 'vitest';

import { clamp, lerp, mapRange } from './index';

describe('math utilities', () => {
  it('clamps values into a closed range', () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
    expect(clamp(2, 0, 1)).toBe(1);
  });

  it('interpolates linearly', () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it('maps a value from one range to another', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
  });

  it('rejects invalid ranges', () => {
    expect(() => mapRange(1, 1, 1, 0, 10)).toThrow(RangeError);
    expect(() => clamp(1, 2, 0)).toThrow(RangeError);
  });
});
