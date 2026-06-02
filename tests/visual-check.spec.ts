import { expect, type Page, test } from '@playwright/test';

function captureFailures(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  return { consoleErrors, pageErrors };
}

async function readCanvasStats(page: Page) {
  return page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    const canvas =
      canvases.find((candidate) => {
        const rect = candidate.getBoundingClientRect();

        return (
          rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0
        );
      }) ?? canvases[0];

    if (!canvas) {
      return { found: false, width: 0, height: 0, uniqueColors: 0, brightPixels: 0 };
    }

    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');

    if (!gl) {
      return {
        found: true,
        width: canvas.width,
        height: canvas.height,
        uniqueColors: -1,
        brightPixels: -1,
      };
    }

    const blockSize = 64;
    const regions = [
      [canvas.width * 0.2, canvas.height * 0.2],
      [canvas.width * 0.5, canvas.height * 0.5],
      [canvas.width * 0.8, canvas.height * 0.8],
      [canvas.width * 0.2, canvas.height * 0.8],
      [canvas.width * 0.8, canvas.height * 0.2],
    ] as const;
    const unique = new Set<string>();
    let brightPixels = 0;

    for (const [sampleX, sampleY] of regions) {
      const x = Math.max(0, Math.min(canvas.width - blockSize, Math.floor(sampleX)));
      const y = Math.max(0, Math.min(canvas.height - blockSize, Math.floor(sampleY)));
      const pixels = new Uint8Array(blockSize * blockSize * 4);

      gl.readPixels(x, y, blockSize, blockSize, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      for (let i = 0; i < pixels.length; i += 64) {
        const r = pixels[i] ?? 0;
        const g = pixels[i + 1] ?? 0;
        const b = pixels[i + 2] ?? 0;
        unique.add(`${r},${g},${b}`);

        if (r + g + b > 70) {
          brightPixels += 1;
        }
      }
    }

    return {
      found: true,
      width: canvas.width,
      height: canvas.height,
      uniqueColors: unique.size,
      brightPixels,
    };
  });
}

test('nebula canvas renders nonblank pixels', async ({ page }) => {
  test.setTimeout(60_000);
  const failures = captureFailures(page);

  await page.goto('/');
  await page.waitForTimeout(800);

  const canvasStats = await readCanvasStats(page);

  expect(failures.pageErrors).toEqual([]);
  expect(failures.consoleErrors).toEqual([]);
  expect(canvasStats.found).toBe(true);
  expect(canvasStats.width).toBeGreaterThan(0);
  expect(canvasStats.height).toBeGreaterThan(0);
  expect(canvasStats.uniqueColors).toBeGreaterThan(1);
  expect(canvasStats.brightPixels).toBeGreaterThan(0);
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
  await playground.getByRole('button', { name: 'Plasma' }).click();
  await expect(playground.getByLabel('React usage snippet')).toContainText('FluidGradientEffect');

  await playground.getByRole('button', { name: /Stars/ }).click();
  await playground.getByRole('button', { name: 'Warp' }).click();
  await expect(playground.getByLabel('React usage snippet')).toContainText('StarfieldEffect');

  await page.waitForTimeout(500);
  const canvasStats = await readCanvasStats(page);

  expect(failures.pageErrors).toEqual([]);
  expect(failures.consoleErrors).toEqual([]);
  expect(canvasStats.found).toBe(true);
  expect(canvasStats.brightPixels).toBeGreaterThan(0);
});
