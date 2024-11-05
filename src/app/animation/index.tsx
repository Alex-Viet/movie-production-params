export const errorAnimation = {
  initial: { opacity: 0, color: 'rgba(0, 0, 0, 0.19)' },
  animate: {
    opacity: 1,
    color: '#be1f2a',
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    color: 'rgba(0, 0, 0, 0.19)',
    transition: { duration: 0.5 },
  },
};

export const pulseAnimation = {
  initial: { scale: 1.05 },
  animate: { scale: 0.95, transition: { yoyo: Infinity, duration: 0.5 } },
};
