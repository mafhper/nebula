export const NEBULA_FPS_BUDGET = {
  desktop: 60,
  midMobile: 45,
  lowEndMobile: 30,
} as const;

export type FpsBudget = typeof NEBULA_FPS_BUDGET;

export type QualityPreset = 'low' | 'medium' | 'high';

export function getCanvasDpr(devicePixelRatio: number, quality: QualityPreset = 'high') {
  const capByQuality: Record<QualityPreset, number> = {
    low: 1,
    medium: 1.5,
    high: 2,
  };

  return Math.min(devicePixelRatio, capByQuality[quality]);
}
