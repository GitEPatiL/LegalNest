'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * CTAButton Component
 * Reusable Call-to-Action button with variants and animations
 * 
 * @param {string} variant - Button style: 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} href - Link destination (uses Next.js Link)
 * @param {function} onClick - Click handler (renders as button)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Button content
 */
export default function CTAButton({
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    children,
    disabled = false,
    fullWidth = false,
    type = 'button',
    ...props
}) {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Size variants
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    // Variant styles with hover glow effects
    const variants = {
        primary: `bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 
              hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 
              active:scale-95 motion-safe:hover:animate-glow`,
        secondary: `bg-dark-900 text-white hover:bg-dark-800 focus:ring-dark-700
                hover:shadow-lg hover:shadow-dark-900/50 hover:scale-105 
                active:scale-95`,
        outline: `border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500
              hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105 
              active:scale-95`,
        ghost: `text-primary-600 hover:bg-primary-50 focus:ring-primary-500
            hover:shadow-md hover:scale-105 active:scale-95`,
    };

    const buttonClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

    // Motion animation with reduced motion support
    const motionProps = {
        whileHover: { scale: disabled ? 1 : 1.05 },
        whileTap: { scale: disabled ? 1 : 0.95 },
        transition: { duration: 0.2 },
    };

    const content = children;

    // Render as Link if href is provided
    if (href && !disabled) {
        return (
            <motion.div {...motionProps} className="inline-block">
                <Link href={href} className={buttonClasses} {...props}>
                    {content}
                </Link>
            </motion.div>
        );
    }

    // Render as button
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
            {...motionProps}
            {...props}
        >
            {content}
        </motion.button>
    );
}
