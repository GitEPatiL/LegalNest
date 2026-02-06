'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import menuData from '@/data/menu.json';
import { fadeUp } from './Animations/fadeUp';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-900 text-white pt-16 pb-8 border-t border-dark-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {siteConfig.logo.text.charAt(0)}
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-white">
                                {siteConfig.companyName}
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {siteConfig.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {Object.entries(siteConfig.social).map(([platform, handle]) => (
                                <Link
                                    key={platform}
                                    href={`https://${platform}.com/${handle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                                    aria-label={`Follow us on ${platform}`}
                                >
                                    {/* Simple generic social icon placeholder */}
                                    <span className="capitalize text-xs">{platform.slice(0, 2)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-primary-500 inline-block pb-1">
                            Primary
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-primary-500 transition-colors">Services</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-primary-500 transition-colors">Blog</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services Links (Dynamic from menu.json) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-primary-500 inline-block pb-1">
                            Top Services
                        </h3>
                        <ul className="space-y-3">
                            {menuData[0]?.children?.slice(0, 6).map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/services/${item.slug}`}
                                        className="text-gray-400 hover:text-primary-500 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-primary-500 inline-block pb-1">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-primary-500 text-xl mt-1">📍</span>
                                <span className="text-gray-400">
                                    123 Business Park, Financial District,<br />
                                    Mumbai, Maharashtra - 400001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 text-xl">📞</span>
                                <a href={`tel:${siteConfig.contactNumber}`} className="text-gray-400 hover:text-primary-500">
                                    {siteConfig.contactNumber}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 text-xl">✉️</span>
                                <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-primary-500">
                                    {siteConfig.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} {siteConfig.companyName}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-primary-500">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-primary-500">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
