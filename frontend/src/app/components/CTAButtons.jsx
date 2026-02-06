'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import siteConfig from '@/config/siteConfig';
import { fadeUp, fadeUpReduced } from './Animations/fadeUp';

/**
 * CTA Button Component
 * Renders a primary or ghost style button with animation
 * 
 * @param {string} href - Link destination (optional, renders <button> if missing)
 * @param {string} variant - 'primary' | 'ghost' | 'outline'
 * @param {Function} onClick - Click handler
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional classes
 */
export default function CTAButton({
    href,
    variant = 'primary',
    onClick,
    children,
    className = '',
    ...props
}) {
    const shouldReduceMotion = useReducedMotion();
    const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

    const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        ghost: "bg-transparent text-dark-700 hover:text-primary-600 hover:bg-primary-50",
        outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
    };

    const Component = href ? Link : 'button';
    const elementProps = href ? { href, ...props } : { onClick, ...props };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            className="inline-block"
        >
            <Component
                className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
                {...elementProps}
            >
                {children}
            </Component>
        </motion.div>
    );
}
