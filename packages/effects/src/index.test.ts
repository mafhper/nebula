import { describe, expect, it } from 'vitest';

import { auroraPresets, fluidGradientPresets, particleGalaxyPresets, starfieldPresets } from './index';

interface PresetEntry {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  [key: string]: unknown;
}

const presetSets: Record<string, Record<string, PresetEntry>> = {
  aurora: auroraPresets,
  'fluid-gradient': fluidGradientPresets,
  'particle-galaxy': particleGalaxyPresets,
  starfield: starfieldPresets,
};

describe('preset data integrity', () => {
  for (const [effect, presets] of Object.entries(presetSets)) {
    const ids = Object.keys(presets);

    describe(`${effect} presets`, () => {
      it('has at least 3 presets', () => {
        expect(ids.length).toBeGreaterThanOrEqual(3);
      });

      for (const id of ids) {
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
              expect((preset as unknown as { color3: string }).color3).toMatch(/^#[0-9a-f]{6}$/i);
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
