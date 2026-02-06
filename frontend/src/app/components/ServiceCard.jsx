'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, fadeUpReduced } from './Animations/fadeUp';
import siteConfig from '@/config/siteConfig';

/**
 * Service Card Component
 * Displays service details with hover animation
 * 
 * @param {Object} service - Service data object
 * @param {number} index - Index for staggered animation delay
 */
export default function ServiceCard({ service, index = 0 }) {
    const shouldReduceMotion = useReducedMotion();
    const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

    // Icons mapping (placeholder logic, usually icons would be imported or passed)
    const getIcon = (iconName) => {
        // Return a default icon or map based on service data
        return (
            <span className="text-4xl mb-4 block" role="img" aria-label={service.title}>
                {service.icon || '💼'}
            </span>
        );
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="relative h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-primary-200 group-hover:-translate-y-1">
                    {/* Gradient accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="mb-4 text-primary-500 transition-transform group-hover:scale-110 duration-300 origin-left">
                        {getIcon(service.icon)}
                    </div>

                    <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {service.seo?.description || service.description || siteConfig.description}
                    </p>

                    <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                        <span>Learn More</span>
                        <svg
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
