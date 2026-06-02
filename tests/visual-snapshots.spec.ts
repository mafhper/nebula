import { expect, test } from '@playwright/test';

import { captureFailures, readCanvasStats } from './visual-helpers';

const effects = [
  { id: 'aurora', label: 'Aurora', preset: 'Dusk' },
  { id: 'fluid-gradient', label: 'Fluid', preset: 'Ember' },
  { id: 'particle-galaxy', label: 'Galaxy', preset: 'Nebula' },
  { id: 'starfield', label: 'Stars', preset: 'Cruise' },
  { id: 'vortex', label: 'Vortex', preset: 'Whirlpool' },
  { id: 'wave-plane', label: 'Waves', preset: 'Ocean' },
  { id: 'plasma', label: 'Plasma', preset: 'Nebula' },
  { id: 'geometric', label: 'Geo', preset: 'Nebula Knot' },
] as const;

async function waitForNonblankCanvas(page: import('@playwright/test').Page, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const stats = await readCanvasStats(page);
    if (stats.uniqueColors > 1) return stats;
    await page.waitForTimeout(1000);
  }
  return readCanvasStats(page);
}

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
      const tab = playground.getByRole('button', { name: new RegExp(effect.label, 'i') });

      if (await tab.isVisible()) {
        await tab.click();
        await page.waitForTimeout(1500);
      }

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
