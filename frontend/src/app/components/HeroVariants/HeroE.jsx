'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import CTAButton from '../CTAButtons';
import Image from 'next/image';

/**
 * HeroE: Minimal Clean Design (Blog Page)
 * Features: Scroll indicator, search animation, category filters
 */
export default function HeroE({
    headline = "Legal Insights & Updates",
    subtext = "Stay informed with the latest news, guides, and expert opinions on business compliance and legal matters.",
    categories = ['All', 'Tax & Compliance', 'Business', 'Legal Updates', 'Guides'],
    bgImage = "/images/heroes/blog.svg"
}) {
    const [searchFocused, setSearchFocused] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50/20">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Floating Abstract Shapes */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 right-[10%] w-32 h-32 bg-primary-200/30 rounded-[40px] blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 left-[15%] w-48 h-48 bg-accent-yellow/20 rounded-full blur-2xl"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            Our Blog
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        {headline}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        {subtext}
                    </motion.p>

                    {/* Animated Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-10"
                    >
                        <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className={`w-full px-6 py-4 pl-14 pr-32 text-lg border-2 rounded-2xl bg-white shadow-lg transition-all duration-300 focus:outline-none ${searchFocused
                                    ? 'border-primary-500 shadow-primary-500/20'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            />
                            <svg
                                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                                Search
                            </button>
                        </div>
                    </motion.div>

                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-3 justify-center"
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm text-gray-500 font-medium">Scroll to explore</p>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2"
                            >
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
