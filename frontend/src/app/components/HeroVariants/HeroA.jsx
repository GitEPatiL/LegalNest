'use client';

import { motion } from 'framer-motion';
import CTAButton from '../CTAButtons';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';

/**
 * HeroA: Bold Design
 * Features: Big bold headline, left-aligned content, accent background block
 * 
 * @param {string} headline - Main hero text
 * @param {string} subtext - Supporting text
 * @param {string} ctaText - Button label
 * @param {string} ctaHref - Button link
 * @param {string} bgImage - Background image URL
 */
export default function HeroA({
    headline = "Your Trusted Legal Compliance Partner",
    subtext = "Simplify your business journey with our expert legal services. From registration to annual filing, we handle it all.",
    ctaText = "Get Started",
    ctaHref = "/contact",
    bgImage
}) {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
            {/* Background Accent Block */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-primary-50 hidden lg:block" />
            <div className="absolute right-20 top-20 w-64 h-64 bg-accent-yellow rounded-full blur-[100px] opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.div variants={fadeUp} className="inline-block mb-4 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                            #1 Legal Platform in India
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl lg:text-7xl font-bold text-dark-900 leading-[1.1] mb-6"
                        >
                            {headline}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
                        >
                            {subtext}
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex gap-4">
                            <CTAButton href={ctaHref} variant="primary">
                                {ctaText}
                            </CTAButton>
                            <CTAButton href="/services" variant="ghost">
                                View Services →
                            </CTAButton>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div variants={fadeUp} className="mt-12 flex items-center gap-8 pt-8 border-t border-gray-100">
                            <div>
                                <p className="text-3xl font-bold text-dark-900">5000+</p>
                                <p className="text-sm text-gray-500">Happy Clients</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-dark-900">98%</p>
                                <p className="text-sm text-gray-500">Success Rate</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual (Placeholder or Image) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {bgImage ? (
                            <img src={bgImage} alt="Hero" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-dark-900 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <span className="text-6xl mb-4 block">⚖️</span>
                                    <h3 className="text-white text-2xl font-bold">Legal Expertise</h3>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
