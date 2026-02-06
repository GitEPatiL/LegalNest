'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';
import CTAButton from './CTAButtons';
import Logo from './Logo';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about-us' },
        { label: 'Blog', href: '/blog' },
    ];

    return (
        <>
            {/* Dual Navbar System */}
            <div className="fixed w-full top-0 z-50">
                {/* Top Bar - Logo, Basic Links, Contact */}
                <motion.div
                    style={{
                        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
                    }}
                    className={`backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex-shrink-0"
                            >
                                <Link href="/" className="flex items-center">
                                    <Logo className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`} />
                                </Link>
                            </motion.div>

                            {/* Desktop - Basic Nav Links */}
                            <nav className="hidden md:flex items-center gap-8">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Desktop - Contact Section */}
                            <motion.div
                                className="hidden md:flex items-center gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all group"
                                >
                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300 transition-all">
                                        <svg
                                            className="w-4 h-4 text-primary-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="hidden xl:flex flex-col">
                                        <span className="text-[10px] text-gray-500 font-medium leading-tight">Call Us</span>
                                        <span className="text-xs font-bold text-gray-900">+91 98765 43210</span>
                                    </span>
                                </a>

                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <CTAButton href="/contact-us" variant="primary" size="sm">
                                        Contact Us
                                    </CTAButton>
                                </motion.div>
                            </motion.div>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                aria-label="Toggle mobile menu"
                                whileTap={{ scale: 0.92 }}
                            >
                                <div className="w-5 h-4 flex flex-col justify-between">
                                    <motion.span
                                        animate={{
                                            rotate: isMobileMenuOpen ? 45 : 0,
                                            y: isMobileMenuOpen ? 7 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
                                    />
                                    <motion.span
                                        animate={{
                                            opacity: isMobileMenuOpen ? 0 : 1,
                                            scaleX: isMobileMenuOpen ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full h-0.5 bg-gray-900 rounded-full"
                                    />
                                    <motion.span
                                        animate={{
                                            rotate: isMobileMenuOpen ? -45 : 0,
                                            y: isMobileMenuOpen ? -7 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Services Navigation Bar - Sticky below top bar */}
                <motion.div
                    className={`hidden md:block bg-white border-t border-gray-100 transition-all duration-300 ${isScrolled ? 'shadow-md border-b border-gray-200' : 'shadow-sm'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center py-3">
                            <MegaMenu />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Spacer to prevent content overlap */}
            <div className={`${isScrolled ? 'h-28' : 'h-32'} transition-all duration-300`} />

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
                                <Logo className="h-8" />
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white active:bg-gray-100 transition-colors shadow-sm"
                                    whileTap={{ scale: 0.92 }}
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-800"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="p-5 space-y-1">
                                {/* Services Section */}
                                <div className="mb-3 pb-4 border-b border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">
                                        Services
                                    </h3>
                                    <MegaMenu onSelect={() => setIsMobileMenuOpen(false)} />
                                </div>

                                {/* Basic Links */}
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.08 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-gray-800 hover:text-primary-600 hover:bg-primary-50/70 rounded-xl transition-all font-semibold text-sm"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Contact Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="pt-4 mt-4 space-y-2 border-t border-gray-100"
                                >
                                    <a
                                        href="tel:+919876543210"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:text-primary-600 hover:bg-primary-50/70 rounded-xl transition-all group"
                                    >
                                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300 shadow-sm transition-all">
                                            <svg
                                                className="w-5 h-5 text-primary-700"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-medium">Call Us</span>
                                            <span className="text-sm font-bold text-gray-900">+91 98765 43210</span>
                                        </div>
                                    </a>

                                    <CTAButton href="/contact-us" variant="primary" fullWidth>
                                        Contact Us
                                    </CTAButton>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
