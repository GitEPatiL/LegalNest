'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import EnquiryForm from '../Forms/EnquiryForm';

/**
 * HeroD: Full-Screen Impact (Contact Page)
 * Features: Ken Burns effect, form slide-in, success animations
 */
export default function HeroD({
    headline = "Let's Build Your Business Together",
    subtext = "Get expert legal consultation from our experienced team. We're here to help you navigate compliance with confidence.",
    bgImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920"
}) {
    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Ken Burns Background Effect */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <div className="relative w-full h-full">
                    {bgImage ? (
                        <>
                            <Image
                                src={bgImage}
                                alt="Contact Us"
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                    )}
                </div>
            </motion.div>

            {/* Animated Gradient Overlay */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="text-white"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Available 24/7
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                            {headline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg lg:text-xl text-gray-200 mb-10 leading-relaxed max-w-lg"
                        >
                            {subtext}
                        </motion.p>

                        {/* Contact Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="space-y-4"
                        >
                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all group"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">Call Us</p>
                                    <p className="text-lg font-bold">+91 98765 43210</p>
                                </div>
                            </a>

                            <a
                                href="mailto:info@legalnest.com"
                                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all group"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-accent-yellow to-accent-yellow/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">Email Us</p>
                                    <p className="text-lg font-bold">info@legalnest.com</p>
                                </div>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="relative"
                    >
                        {!formSubmitted ? (
                            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                                    <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
                                </div>
                                <EnquiryForm serviceName="General Enquiry" />
                            </div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-3xl shadow-2xl p-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ type: 'spring', duration: 0.8 }}
                                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
                                <p className="text-gray-600 mb-8">We've received your message and will get back to you shortly.</p>
                                <button
                                    onClick={() => setFormSubmitted(false)}
                                    className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
