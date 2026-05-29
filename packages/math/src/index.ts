export function clamp(value: number, min: number, max: number) {
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
) {
  if (inputMin === inputMax) {
    throw new RangeError('input range cannot be zero');
  }

  const normalized = (value - inputMin) / (inputMax - inputMin);
  return lerp(outputMin, outputMax, normalized);
}
