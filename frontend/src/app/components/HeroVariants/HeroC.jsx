'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CTAButton from '../CTAButtons';
import Image from 'next/image';

/**
 * HeroC: Centered Elegant Design (About Page)
 * Features: Text reveal animation, team photo with zoom fade, professional aesthetic
 */
export default function HeroC({
    headline = "Excellence in Legal Services",
    subheadline = "About LegalNest",
    subtext = "We are a team of experienced legal professionals dedicated to simplifying compliance for businesses across India.",
    ctaText = "Contact Us",
    ctaHref = "/contact-us",
    teamImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Stagger animation for text reveal
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: custom * 0.2,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        }),
    };

    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 left-20 w-96 h-96 bg-accent-yellow/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
                <div className="max-w-6xl mx-auto">
                    {/* Centered Content */}
                    <div className="text-center mb-16">
                        {/* Badge */}
                        <motion.div
                            custom={0}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="inline-block mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-bold">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {subheadline}
                            </span>
                        </motion.div>

                        {/* Headline with Character-by-Character Reveal */}
                        <motion.h1
                            custom={1}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            {headline.split(' ').map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    className="inline-block mr-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1 + idx * 0.1,
                                        ease: [0.6, 0.05, 0.01, 0.9],
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            custom={2}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                        >
                            {subtext}
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <CTAButton href={ctaHref} variant="primary" size="lg">
                                {ctaText}
                            </CTAButton>
                            <CTAButton href="/services" variant="outline" size="lg">
                                Our Services
                            </CTAButton>
                        </motion.div>
                    </div>

                    {/* Team Image with Zoom Fade */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10" />

                        {/* Image */}
                        <div className="relative h-full w-full bg-gradient-to-br from-gray-100 to-gray-200">
                            {teamImage ? (
                                <Image
                                    src={teamImage}
                                    alt="Our Professional Team"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-12">
                                        <div className="text-8xl mb-4">👥</div>
                                        <h3 className="text-gray-700 text-2xl font-bold">Our Expert Team</h3>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Floating Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-xs"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">15+</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">Years of Experience</p>
                                    <p className="text-sm text-gray-600">Serving businesses nationwide</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 1.4 }}
                            className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 border-2 border-white"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">50+ Experts</p>
                                    <p className="text-sm text-gray-600">Certified Professionals</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
