'use client';

import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/config/siteConfig';
import MegaMenu from './MegaMenu';

/**
 * Header Component
 * Renders site header with dynamic logo and mega menu navigation
 */
export default function Header() {
    const handleMenuSelect = (slug) => {
        console.log('Selected menu item:', slug);
        // You can add custom navigation logic here
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {siteConfig.logo.url.endsWith('.svg') ? (
                            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                                <Image
                                    src={siteConfig.logo.url}
                                    alt={siteConfig.logo.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-yellow-dark rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg lg:text-xl">
                                    {siteConfig.logo.text.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-lg lg:text-2xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors">
                                {siteConfig.logo.text}
                            </span>
                            {siteConfig.tagline && (
                                <span className="text-xs text-gray-600 hidden lg:block">
                                    {siteConfig.tagline}
                                </span>
                            )}
                        </div>
                    </Link>

                    {/* Navigation - MegaMenu */}
                    <MegaMenu onSelect={handleMenuSelect} className="flex-1 ml-8" />

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3 ml-4">
                        <Link
                            href={`tel:${siteConfig.contactNumber}`}
                            className="px-4 py-2 text-sm font-medium text-dark-900 hover:text-primary-600 transition-colors"
                        >
                            📞 {siteConfig.contactNumber}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-5 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
