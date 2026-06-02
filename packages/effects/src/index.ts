// Preset data and controls are exported from the main barrel.
// Effect components are imported via subpath exports for code-splitting, e.g.:
//   lazy(() => import('@nebula/effects/aurora'))
//
// See the exports map in package.json for available subpaths.

export { auroraControls } from './effect-aurora/controls';
export type { AuroraPresetId } from './effect-aurora/presets';
export { auroraPresets } from './effect-aurora/presets';
export type { AuroraEffectProps, AuroraPreset, AuroraUniforms } from './effect-aurora/types';
export { fluidGradientControls } from './effect-fluid-gradient/controls';
export type { FluidGradientPresetId } from './effect-fluid-gradient/presets';
export { fluidGradientPresets } from './effect-fluid-gradient/presets';
export type {
  FluidGradientEffectProps,
  FluidGradientPreset,
  FluidGradientUniforms,
} from './effect-fluid-gradient/types';
export { geometricControls } from './effect-geometric/controls';
export type { GeometricPresetId } from './effect-geometric/presets';
export { geometricPresets } from './effect-geometric/presets';
export type {
  GeometricEffectProps,
  GeometricPreset,
  GeometricShape,
  GeometricUniforms,
} from './effect-geometric/types';
export { particleGalaxyControls } from './effect-particle-galaxy/controls';
export type { ParticleGalaxyPresetId } from './effect-particle-galaxy/presets';
export { particleGalaxyPresets } from './effect-particle-galaxy/presets';
export type {
  ParticleGalaxyEffectProps,
  ParticleGalaxyPreset,
  ParticleGalaxyUniforms,
} from './effect-particle-galaxy/types';
export { plasmaControls } from './effect-plasma/controls';
export type { PlasmaPresetId } from './effect-plasma/presets';
export { plasmaPresets } from './effect-plasma/presets';
export type { PlasmaEffectProps, PlasmaPreset, PlasmaUniforms } from './effect-plasma/types';
export { starfieldControls } from './effect-starfield/controls';
export type { StarfieldPresetId } from './effect-starfield/presets';
export { starfieldPresets } from './effect-starfield/presets';
export type {
  StarfieldEffectProps,
  StarfieldPreset,
  StarfieldUniforms,
} from './effect-starfield/types';
export { vortexControls } from './effect-vortex/controls';
export type { VortexPresetId } from './effect-vortex/presets';
export { vortexPresets } from './effect-vortex/presets';
export type { VortexEffectProps, VortexPreset, VortexUniforms } from './effect-vortex/types';
export { wavePlaneControls } from './effect-wave-plane/controls';
export type { WavePlanePresetId } from './effect-wave-plane/presets';
export { wavePlanePresets } from './effect-wave-plane/presets';
export type {
  WavePlaneEffectProps,
  WavePlanePreset,
  WavePlaneUniforms,
} from './effect-wave-plane/types';
