import { describe, expect, it } from 'vitest';

import {
  auroraPresets,
  fluidGradientPresets,
  geometricPresets,
  particleGalaxyPresets,
  plasmaPresets,
  starfieldPresets,
  vortexPresets,
  wavePlanePresets,
} from './index';

const presetSets: Record<
  string,
  Record<string, { label: string; concept: string; color1: string; color2: string }>
> = {
  aurora: auroraPresets,
  'fluid-gradient': fluidGradientPresets,
  geometric: geometricPresets,
  'particle-galaxy': particleGalaxyPresets,
  plasma: plasmaPresets,
  starfield: starfieldPresets,
  vortex: vortexPresets,
  'wave-plane': wavePlanePresets,
};

describe('preset data integrity', () => {
  for (const [effect, presets] of Object.entries(presetSets)) {
    const keys = Object.keys(presets);

    describe(`${effect} presets`, () => {
      it('has at least 3 presets', () => {
        expect(keys.length).toBeGreaterThanOrEqual(3);
      });

      for (const id of keys) {
        describe(`${id}`, () => {
          const preset = presets[id];

          it('has a non-empty label', () => {
            expect(preset.label).toBeTruthy();
          });

          it('has a non-empty concept', () => {
            expect(preset.concept).toBeTruthy();
          });

          it('has valid color strings', () => {
            expect(preset.color1).toMatch(/^#[0-9a-f]{6}$/i);
            expect(preset.color2).toMatch(/^#[0-9a-f]{6}$/i);
          });

          if ('color3' in preset) {
            it('has valid color3', () => {
              const p = preset as { color3: string };
              expect(p.color3).toMatch(/^#[0-9a-f]{6}$/i);
            });
          }

          it('has finite numeric properties', () => {
            for (const [, value] of Object.entries(preset)) {
              if (typeof value === 'number') {
                expect(Number.isFinite(value)).toBe(true);
              }
            }
          });
        });
      }
    });
  }
});
