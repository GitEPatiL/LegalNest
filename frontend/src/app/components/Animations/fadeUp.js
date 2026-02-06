'use client';

/**
 * Framer Motion variants for Fade Up animation
 * Respects prefers-reduced-motion by disabling translation on reduced motion
 */

export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // Custom ease-out
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.3,
        },
    },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05 * i,
        },
    }),
};

// Reduced motion variant
export const fadeUpReduced = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

/**
 * Helper to select variant based on reduced motion preference
 * Usage: const variants = useReducedMotion() ? fadeUpReduced : fadeUp;
 * Note: useReducedMotion is a framer-motion hook that should be used in the component
 */
