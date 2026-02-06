'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Logo({ className = 'h-12', showText = true, animated = true }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const logoVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.6, 0.05, 0.01, 0.9]
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    const iconVariants = {
        initial: { rotate: 0 },
        hover: {
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const textVariants = {
        initial: { x: -10, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.2
            }
        }
    };

    const LogoContent = () => (
        <motion.div
            variants={animated ? logoVariants : {}}
            initial={animated ? 'initial' : false}
            animate={animated ? 'animate' : false}
            whileHover={animated ? 'hover' : false}
            className="flex items-center space-x-3 group"
        >
            {/* Logo Icon - Geometric Nest with Scale */}
            <motion.div
                variants={animated ? iconVariants : {}}
                className="relative"
            >
                <svg
                    className={`${className} w-auto transition-all duration-300`}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>
                    </defs>

                    {/* Nest Structure - Outer Arc */}
                    <motion.path
                        d="M24 8 C14 8, 8 14, 8 24 C8 34, 14 40, 24 40 C34 40, 40 34, 40 24 C40 14, 34 8, 24 8"
                        stroke="url(#goldGradient)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Nest Layers - Inner Protection */}
                    <motion.path
                        d="M24 14 C18 14, 14 18, 14 24 C14 30, 18 34, 24 34 C30 34, 34 30, 34 24 C34 18, 30 14, 24 14"
                        stroke="url(#goldGradient)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                    />

                    {/* Legal Scale - Balanced Justice */}
                    <g transform="translate(24, 24)">
                        {/* Scale Base */}
                        <motion.line
                            x1="0"
                            y1="-8"
                            x2="0"
                            y2="6"
                            stroke="url(#blueGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />

                        {/* Scale Beam */}
                        <motion.line
                            x1="-10"
                            y1="-6"
                            x2="10"
                            y2="-6"
                            stroke="url(#blueGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        />

                        {/* Left Pan */}
                        <motion.path
                            d="M-10 -6 L-12 -2 L-8 -2 Z"
                            fill="url(#goldGradient)"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        />

                        {/* Right Pan */}
                        <motion.path
                            d="M10 -6 L8 -2 L12 -2 Z"
                            fill="url(#goldGradient)"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        />
                    </g>

                    {/* Accent Dots - Trust Elements */}
                    <motion.circle
                        cx="12"
                        cy="24"
                        r="1.5"
                        fill="url(#goldGradient)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                    />
                    <motion.circle
                        cx="36"
                        cy="24"
                        r="1.5"
                        fill="url(#goldGradient)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                    />
                </svg>
            </motion.div>

            {/* Logo Text */}
            {showText && (
                <motion.div
                    variants={animated ? textVariants : {}}
                    className="flex flex-col"
                >
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:via-primary-500 group-hover:to-primary-600 transition-all duration-500">
                        LegalNest
                    </span>
                    <span className="text-[10px] font-medium text-gray-500 tracking-wider uppercase">
                        Legal Made Simple
                    </span>
                </motion.div>
            )}
        </motion.div>
    );

    return <LogoContent />;
}

// Icon-only variant for compact spaces
export function LogoIcon({ className = 'h-10' }) {
    return <Logo className={className} showText={false} animated={false} />;
}

// Static variant for loading states
export function LogoStatic({ className = 'h-12', showText = true }) {
    return <Logo className={className} showText={showText} animated={false} />;
}
