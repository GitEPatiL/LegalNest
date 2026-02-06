'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import MegaMenu from './MegaMenu';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md'
                    : 'bg-white'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                            <span className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                {siteConfig.logo.text}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <MegaMenu />
                        <Link
                            href="/about-us"
                            className="text-dark-700 hover:text-primary-600 font-medium transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/blog"
                            className="text-dark-700 hover:text-primary-600 font-medium transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-dark-900 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-dark-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-dark-900 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed inset-x-0 top-16 bg-white border-t border-gray-200 overflow-y-auto"
                    >
                        <nav className="container mx-auto px-4 py-6 space-y-4">
                            <MegaMenu onSelect={() => setIsMobileMenuOpen(false)} />

                            <Link
                                href="/about-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 px-4 rounded-lg text-dark-700 hover:bg-gray-100 font-medium transition-colors"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 px-4 rounded-lg text-dark-700 hover:bg-gray-100 font-medium transition-colors"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/contact-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 px-4 bg-primary-500 text-white rounded-lg font-bold text-center hover:bg-primary-600 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
