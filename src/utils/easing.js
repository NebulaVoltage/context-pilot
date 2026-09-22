export const SPRING_SMOOTH = { type: 'spring', stiffness: 100, damping: 20 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 300, damping: 30 };
export const SPRING_GENTLE = { type: 'spring', stiffness: 50, damping: 15 };
export const SPRING_CAMERA = { type: 'spring', stiffness: 40, damping: 25 };
export const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
export const easeInOutCubic = (x) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const easeOutBack = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
export const DURATION_FAST = 0.2;
export const DURATION_NORMAL = 0.4;
export const DURATION_SLOW = 0.8;
export const DURATION_CINEMATIC = 1.5;
export const stagger = (count, delay = 0.05) => {
    return Array.from({ length: count }, (_, i) => i * delay);
};
