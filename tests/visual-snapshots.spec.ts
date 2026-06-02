import { expect, test } from '@playwright/test';

import { captureFailures, waitForNonblankCanvas } from './visual-helpers';

const effects = [
  { id: 'aurora', label: 'Aurora Field', preset: 'Dusk' },
  { id: 'fluid-gradient', label: 'Fluid Gradient', preset: 'Ember' },
  { id: 'particle-galaxy', label: 'Particle Galaxy', preset: 'Nebula' },
  { id: 'starfield', label: 'Starfield 3D', preset: 'Cruise' },
  { id: 'vortex', label: 'Spiral Vortex', preset: 'Whirlpool' },
  { id: 'wave-plane', label: 'Wave Plane', preset: 'Ocean' },
  { id: 'plasma', label: 'Plasma Field', preset: 'Nebula' },
  { id: 'geometric', label: 'Geometric Shape', preset: 'Nebula Knot' },
  { id: 'lava-lamp', label: 'Lava Lamp', preset: 'Retro' },
] as const;

test.describe('visual snapshots', () => {
  test('playground layout renders correctly', async ({ page }) => {
    test.setTimeout(60_000);
    const failures = captureFailures(page);

    await page.goto('/');
    await page.waitForTimeout(1500);
    await page.locator('#playground').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(failures.pageErrors).toEqual([]);
    await expect(failures.consoleErrors).toEqual([]);

    const deck = page.locator('.control-deck');
    await deck.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = await deck.boundingBox();
    expect(box).toBeTruthy();
    const screenshot = await page.screenshot({ clip: box! });
    await expect(screenshot).toMatchSnapshot('control-deck.png');
  });

  for (const effect of effects) {
    test(`canvas renders ${effect.id} without errors`, async ({ page }) => {
      test.setTimeout(60_000);
      const failures = captureFailures(page);

      await page.goto('/');
      await page.waitForTimeout(1500);

      const playground = page.locator('#playground');
      await playground.locator('.effect-select').selectOption(effect.id);
      await page.waitForTimeout(effect.id === 'wave-plane' ? 1800 : 600);

      const canvasDone = page.locator('.nebula-canvas').first();
      await expect(canvasDone).toBeAttached({ timeout: 10_000 });

      const canvasStats = await waitForNonblankCanvas(page);

      expect(failures.pageErrors).toEqual([]);
      expect(failures.consoleErrors).toEqual([]);
      expect(canvasStats.found).toBe(true);
      expect(canvasStats.uniqueColors).toBeGreaterThan(1);
      expect(canvasStats.width).toBeGreaterThan(0);
    });
  }
});
