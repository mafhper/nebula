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

test.describe('visual snapshots', () => {
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
        await page.waitForTimeout(1000);
      }

      const canvasDone = page.locator('.nebula-canvas').first();
      await expect(canvasDone).toBeAttached({ timeout: 10_000 });

      const canvasStats = await readCanvasStats(page);

      expect(failures.pageErrors).toEqual([]);
      expect(failures.consoleErrors).toEqual([]);
      expect(canvasStats.found).toBe(true);
      expect(canvasStats.uniqueColors).toBeGreaterThan(1);
      expect(canvasStats.width).toBeGreaterThan(0);
    });
  }
});
