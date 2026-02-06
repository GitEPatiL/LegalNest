'use client';

import { useState } from 'react';
import Link from 'next/link';
import menuData from '@/data/menu.json';

/**
 * MegaMenu Component
 * Reads menu.json and renders dynamic navigation with expandable categories
 * 
 * @param {Function} onSelect - Callback when a menu item is selected, receives slug
 * @param {string} className - Additional CSS classes
 */
export default function MegaMenu({ onSelect, className = '' }) {
    const [activeParent, setActiveParent] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleParentHover = (parentId) => {
        setActiveParent(parentId);
    };

    const handleParentLeave = () => {
        setActiveParent(null);
    };

    const handleItemClick = (slug) => {
        if (onSelect) {
            onSelect(slug);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`mega-menu ${className}`}>
            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2 text-dark-900 hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isMobileMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {menuData.map((parent) => (
                    <li
                        key={parent.id}
                        className="relative group"
                        onMouseEnter={() => handleParentHover(parent.id)}
                        onMouseLeave={handleParentLeave}
                    >
                        {/* Parent Item */}
                        <Link
                            href={`/services/${parent.slug}`}
                            className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-dark-900 hover:text-primary-600 transition-colors flex items-center gap-1"
                            onClick={() => handleItemClick(parent.slug)}
                        >
                            {parent.label}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </Link>

                        {/* Dropdown Mega Menu */}
                        {activeParent === parent.id && (
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 p-4">
                                {parent.description && (
                                    <p className="text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                                        {parent.description}
                                    </p>
                                )}
                                <ul className="space-y-2">
                                    {parent.children?.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                href={`/services/${child.slug}`}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-dark-800 hover:bg-primary-50 hover:text-primary-700 rounded transition-colors"
                                                onClick={() => handleItemClick(child.slug)}
                                            >
                                                {child.icon && (
                                                    <span className="text-lg">{child.icon}</span>
                                                )}
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white shadow-xl border-t border-gray-200 max-h-[80vh] overflow-y-auto z-50">
                    <ul className="py-2">
                        {menuData.map((parent) => (
                            <li key={parent.id} className="border-b border-gray-100">
                                <details className="group">
                                    <summary className="px-4 py-3 font-medium text-dark-900 cursor-pointer hover:bg-primary-50 flex items-center justify-between">
                                        <span>{parent.label}</span>
                                        <svg
                                            className="w-5 h-5 transition-transform group-open:rotate-180"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>
                                    <ul className="bg-gray-50 py-2">
                                        {parent.children?.map((child) => (
                                            <li key={child.id}>
                                                <Link
                                                    href={`/services/${child.slug}`}
                                                    className="flex items-center gap-2 px-8 py-2 text-sm text-dark-700 hover:bg-primary-50 hover:text-primary-700"
                                                    onClick={() => handleItemClick(child.slug)}
                                                >
                                                    {child.icon && (
                                                        <span className="text-base">{child.icon}</span>
                                                    )}
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
