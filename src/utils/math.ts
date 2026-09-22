export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
};

export const dampedSpring = (current: number, target: number, velocity: number, stiffness: number, damping: number, dt: number): { position: number, velocity: number } => {
  const f = -stiffness * (current - target) - damping * velocity;
  const newVelocity = velocity + f * dt;
  const newPosition = current + newVelocity * dt;
  return { position: newPosition, velocity: newVelocity };
};

export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const pointOnBezierCurve = (t: number, p0: {x: number, y: number, z: number}, p1: {x: number, y: number, z: number}, p2: {x: number, y: number, z: number}, p3: {x: number, y: number, z: number}): {x: number, y: number, z: number} => {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const p = { x: 0, y: 0, z: 0 };

  p.x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  p.y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
  p.z = uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z;

  return p;
};
