'use client';

import { motion } from 'framer-motion';
import CTAButton from '../CTAButtons';
import AnimatedCounter from '../Animations/AnimatedCounter';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';
import Image from 'next/image';

/**
 * HeroA: Bold Professional Design
 * Features: Parallax background, animated counters, floating particles
 * Professional corporate aesthetic with modern animations
 */
export default function HeroA({
    headline = "Your Trusted Legal Compliance Partner",
    subtext = "Simplify your business journey with our expert legal services. From registration to annual filing, we handle it all.",
    ctaText = "Get Started",
    ctaHref = "/contact-us",
    bgImage = "/images/heroes/homepage.svg"
}) {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50/30">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-400 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent-yellow rounded-full blur-[130px]"
                />

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, i % 2 === 0 ? 20 : -20, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.5,
                        }}
                        className="absolute w-2 h-2 bg-primary-500 rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + i * 10}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 rounded-full text-sm font-semibold shadow-lg"
                        >
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            #1 Legal Platform in India
                        </motion.div>

                        {/* Headline with gradient */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                        >
                            {headline}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
                        >
                            {subtext}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                            <CTAButton href={ctaHref} variant="primary" size="lg">
                                {ctaText}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </CTAButton>
                            <CTAButton href="/services" variant="outline" size="lg">
                                View Services
                            </CTAButton>
                        </motion.div>

                        {/* Animated Statistics */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-200/60"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500/10 rounded-lg blur-xl" />
                                <div className="relative px-4 py-2">
                                    <AnimatedCounter
                                        end={5000}
                                        duration={2.5}
                                        suffix="+"
                                        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block"
                                    />
                                    <p className="text-sm text-gray-600 font-medium mt-1">Happy Clients</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-accent-yellow/20 rounded-lg blur-xl" />
                                <div className="relative px-4 py-2">
                                    <AnimatedCounter
                                        end={98}
                                        duration={2}
                                        suffix="%"
                                        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent block"
                                    />
                                    <p className="text-sm text-gray-600 font-medium mt-1">Success Rate</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500/10 rounded-lg blur-xl" />
                                <div className="relative px-4 py-2">
                                    <AnimatedCounter
                                        end={15}
                                        duration={1.5}
                                        suffix="+"
                                        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block"
                                    />
                                    <p className="text-sm text-gray-600 font-medium mt-1">Years Experience</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual with Advanced Effects */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="relative hidden lg:block h-[600px] rounded-3xl overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-accent-yellow/20 z-10" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-yellow rounded-3xl blur-2xl opacity-20" />

                        {/* Image Container */}
                        <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                            {bgImage ? (
                                <Image
                                    src={bgImage}
                                    alt="Professional Legal Services"
                                    fill
                                    className="object-cover opacity-90"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center p-12">
                                    <div className="text-center">
                                        <motion.div
                                            animate={{ rotateY: [0, 360] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            className="text-8xl mb-6 inline-block"
                                        >
                                            ⚖️
                                        </motion.div>
                                        <h3 className="text-white text-3xl font-bold mb-2">Legal Expertise</h3>
                                        <p className="text-gray-300">Professional Solutions</p>
                                    </div>
                                </div>
                            )}

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Trusted by 5000+</p>
                                        <p className="text-xs text-gray-600">Businesses across India</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
