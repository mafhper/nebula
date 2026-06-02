import { expect, test } from '@playwright/test';

import { captureFailures, readCanvasStats } from './visual-helpers';

test('nebula canvas renders nonblank pixels', async ({ page }) => {
  test.setTimeout(60_000);
  const failures = captureFailures(page);

  await page.goto('/');
  await page.waitForTimeout(1500);

  const canvasStats = await readCanvasStats(page);

  expect(failures.pageErrors).toEqual([]);
  expect(failures.consoleErrors).toEqual([]);
  expect(canvasStats.found).toBe(true);
  expect(canvasStats.width).toBeGreaterThan(0);
  expect(canvasStats.height).toBeGreaterThan(0);
  expect(canvasStats.uniqueColors).toBeGreaterThan(1);
});

test('effect discovery and playground switching work', async ({ page }) => {
  test.setTimeout(120_000);
  const failures = captureFailures(page);

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'WebGL effects for React interfaces.' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore effects' })).toHaveAttribute(
    'href',
    '#effects',
  );

  await page.getByRole('link', { name: 'Open Fluid Gradient' }).click();
  const playground = page.locator('#playground');
  await expect(playground.getByRole('heading', { name: 'Fluid Gradient' })).toBeVisible();

  await playground.locator('.effect-select').selectOption('plasma');
  await expect(playground.getByLabel('React usage snippet')).toContainText('PlasmaEffect');

  await playground.locator('.effect-select').selectOption('starfield');
  const presetGrid = playground.locator('.preset-grid');
  await presetGrid.getByRole('button', { name: 'Cruise' }).click();
  await expect(playground.getByLabel('React usage snippet')).toContainText('StarfieldEffect');

  await page.waitForTimeout(1500);

  const canvasStats = await readCanvasStats(page);

  expect(failures.pageErrors).toEqual([]);
  expect(failures.consoleErrors).toEqual([]);
  expect(canvasStats.found).toBe(true);
  expect(canvasStats.uniqueColors).toBeGreaterThan(1);
});
