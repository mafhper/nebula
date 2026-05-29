import type { IUniform } from 'three';

export type NebulaUniformValue = number | boolean | string | object;

export type NebulaUniforms<T extends Record<string, NebulaUniformValue>> = {
  [K in keyof T]: IUniform<T[K]>;
};

export function defineUniforms<T extends Record<string, NebulaUniformValue>>(values: T) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, { value }]),
  ) as NebulaUniforms<T>;
}
