export const easing = [0.6, -0.05, 0.01, 0.99];

export const hoverScale = { scale: 1.02 };
export const tapScale = { scale: 0.98 };
export const normalScale = { scale: 0.98 };

export const scale = { normal: normalScale, tap: tapScale, hover: hoverScale };

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const delayStaggerInView = {
  animate: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.1,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

export const fadeIn = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInUpStaggerDelayChildren = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUpAvatar = {
  initial: {
    y: '20%',
    opacity: 0.01,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  animate: {
    y: '5%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const popScale = {
  initial: {
    scale: 0,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.6,
      ease: easing,
    },
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.6,
      ease: easing,
    },
  },
};
