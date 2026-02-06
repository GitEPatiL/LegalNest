'use client';

import { motion } from 'framer-motion';
import CTAButton from '../CTAButtons';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';

/**
 * HeroC: Centered Focus
 * Features: Centered headline with animated underline and stacked CTAs
 */
export default function HeroC({
    headline = "Simplifying Legal Compliance",
    subtext = "India's most trusted platform for business registration, tax filing, and legal compliance.",
    ctaText = "Start Your Journey",
    ctaHref = "/contact"
}) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center bg-dark-900 text-white overflow-hidden py-20">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={fadeUp} className="mb-6 flex justify-center">
                        <span className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-sm text-gray-300">
                            ✨ Trusted by 10,000+ Startups
                        </span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        {headline}
                        <span className="relative inline-block ml-3 text-primary-500">
                            for Everyone
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.00026 8.00004C52.0003 4.00004 150.001 2.00004 198.001 5.00004" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </motion.svg>
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        {subtext}
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <CTAButton href={ctaHref} variant="primary" className="min-w-[180px]">
                            {ctaText}
                        </CTAButton>
                        <CTAButton href="/services" variant="outline" className="min-w-[180px] border-gray-600 text-white hover:bg-gray-800 hover:text-white">
                            Explore Services
                        </CTAButton>
                    </motion.div>

                    {/* Platform Icons (Static Placeholder) */}
                    <motion.div variants={fadeUp} className="mt-16 pt-8 border-t border-gray-800">
                        <p className="text-sm text-gray-500 mb-4">Integrates with</p>
                        <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="w-8 h-8 bg-gray-600 rounded"></div>
                            <div className="w-8 h-8 bg-gray-600 rounded"></div>
                            <div className="w-8 h-8 bg-gray-600 rounded"></div>
                            <div className="w-8 h-8 bg-gray-600 rounded"></div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
