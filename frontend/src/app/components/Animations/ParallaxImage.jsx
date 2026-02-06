'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

/**
 * ParallaxImage Component
 * Creates parallax scrolling effect on images
 * 
 * @param {string} src - Image source path
 * @param {string} alt - Image alt text
 * @param {number} speed - Parallax speed multiplier (default: 0.5)
 * @param {string} className - Additional CSS classes
 */
export default function ParallaxImage({
    src,
    alt = '',
    speed = 0.5,
    className = '',
    priority = false,
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                style={{ y }}
                className="w-full h-full"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>
        </div>
    );
}
