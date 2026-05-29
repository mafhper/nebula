// Placeholder chunk for the shared shader library.
// Aurora currently keeps its noise inline to make the first effect self-contained.
float nebulaHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
