'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter Component
 * Counts up to a target number when element comes into view
 * 
 * @param {number} end - Target number to count to
 * @param {number} duration - Animation duration in seconds
 * @param {string} suffix - Optional suffix (e.g., '+', '%')
 * @param {string} prefix - Optional prefix (e.g., '$')
 */
export default function AnimatedCounter({
    end = 100,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
    decimals = 0,
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * easeOutCubic(progress)));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, end, duration]);

    // Easing function for smooth animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const formattedCount = decimals > 0
        ? count.toFixed(decimals)
        : count.toLocaleString();

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{formattedCount}{suffix}
        </motion.span>
    );
}
