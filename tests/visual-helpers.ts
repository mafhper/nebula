import type { Page } from '@playwright/test';

export function captureFailures(page: Page) {
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

export async function readCanvasStats(page: Page) {
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

      for (let i = 0; i < pixels.length; i += 4) {
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

export async function waitForNonblankCanvas(page: Page, retries = 8, delay = 1200) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const stats = await readCanvasStats(page);
    if (stats.uniqueColors > 1) return stats;
    await page.waitForTimeout(delay);
  }

  return readCanvasStats(page);
}
