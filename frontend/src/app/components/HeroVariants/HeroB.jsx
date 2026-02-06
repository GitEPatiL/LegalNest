'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CTAButton from '../CTAButtons';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';

/**
 * HeroB: Split Design
 * Features: Split screen image + text with parallax background effect
 * 
 * @param {string} headline - Main headline
 * @param {string} subtext - Supporting text
 */
export default function HeroB({
    headline = "Expert Legal Solutions for Your Business",
    subtext = "We handle the complexities of legal compliance so you can focus on growing your business.",
    ctaText = "Consult Now",
    ctaHref = "/contact",
    bgImage
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={ref} className="relative min-h-[90vh] flex overflow-hidden">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex items-center bg-white z-10 relative">
                <div className="container mx-auto px-8 lg:px-16 py-12 lg:py-0">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl"
                    >
                        <motion.span variants={fadeUp} className="text-primary-600 font-bold tracking-wider text-sm uppercase mb-4 block">
                            Professional & Reliable
                        </motion.span>

                        <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold text-dark-900 mb-6 leading-tight">
                            {headline}
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8">
                            {subtext}
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex gap-4">
                            <CTAButton href={ctaHref} variant="primary">
                                {ctaText}
                            </CTAButton>
                            <CTAButton href="/about" variant="outline">
                                Our Story
                            </CTAButton>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative Element */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary-100 rounded-full blur-[80px] -z-10" />
            </div>

            {/* Right Image (Parallax) */}
            <div className="hidden lg:block w-1/2 relative h-screen bg-gray-100 overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    {bgImage ? (
                        <img src={bgImage} alt="Legal Office" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-950 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <span className="text-9xl opacity-20 filter grayscale">🏢</span>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
