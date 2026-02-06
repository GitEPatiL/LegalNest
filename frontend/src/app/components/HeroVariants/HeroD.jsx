'use client';

import { motion } from 'framer-motion';
import CTAButton from '../CTAButtons';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';

/**
 * HeroD: Carousel / Cards
 * Features: Static placeholder 3D cards stack representation
 */
export default function HeroD({
    headline = "One Platform, All Legal Needs",
    subtext = "Browse through our extensive catalog of legal services tailored for your business.",
    ctaText = "View All Services",
    ctaHref = "/services"
}) {
    return (
        <section className="relative min-h-[90vh] bg-gradient-to-b from-primary-50 to-white flex items-center overflow-hidden">

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-1/2 z-10"
                    >
                        <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-bold text-dark-900 mb-6 font-display">
                            {headline}
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl text-gray-600 mb-8 max-w-lg">
                            {subtext}
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <CTAButton href={ctaHref} variant="primary">
                                {ctaText}
                            </CTAButton>
                        </motion.div>
                    </motion.div>

                    {/* Cards Stack Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center perspective-1000"
                    >
                        {/* Card 3 (Back) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-10 right-10 w-72 h-96 bg-white rounded-2xl shadow-xl p-6 border-t-8 border-primary-300 opacity-60 scale-90 -rotate-6 z-0"
                        >
                            <div className="h-4 w-12 bg-gray-200 rounded mb-4" />
                            <div className="h-6 w-32 bg-gray-100 rounded mb-8" />
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-gray-50 rounded" />
                                <div className="h-2 w-full bg-gray-50 rounded" />
                            </div>
                        </motion.div>

                        {/* Card 2 (Middle) */}
                        <motion.div
                            animate={{ y: [0, -30, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            className="absolute top-6 right-20 w-72 h-96 bg-white rounded-2xl shadow-2xl p-6 border-t-8 border-primary-400 opacity-80 scale-95 rotate-3 z-10"
                        >
                            <div className="h-4 w-12 bg-primary-100 rounded mb-4" />
                            <div className="h-6 w-40 bg-gray-100 rounded mb-8" />
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-gray-50 rounded" />
                                <div className="h-2 w-4/5 bg-gray-50 rounded" />
                            </div>
                        </motion.div>

                        {/* Card 1 (Front) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute right-32 w-80 h-[420px] bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-primary-500 z-20"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-2xl">
                                    🚀
                                </div>
                                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">POPULAR</span>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-900 mb-2">Startup India</h3>
                            <p className="text-gray-500 text-sm mb-6">Complete registration package for new businesses in India.</p>

                            <div className="space-y-4 mb-8">
                                {['Company Incorporation', 'GST Registration', 'PAN & TAN'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span> {item}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-dark-900 text-white rounded-lg font-medium text-sm">
                                Get Started
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
