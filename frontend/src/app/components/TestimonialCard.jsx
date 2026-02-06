'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, fadeUpReduced } from './Animations/fadeUp';
import siteConfig from '@/config/siteConfig';

/**
 * Testimonial Card Component
 * Displays customer feedback with rating and user info
 * 
 * @param {Object} testimonial - Testimonial data { name, role, content, rating, image }
 * @param {number} index - Animation delay index
 */
export default function TestimonialCard({ testimonial, index = 0 }) {
    const shouldReduceMotion = useReducedMotion();
    const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col"
        >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < (testimonial.rating || 5) ? 'text-accent-yellow' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Content */}
            <p className="text-gray-700 text-lg mb-6 italic flex-grow">
                "{testimonial.content}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {testimonial.image ? (
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-xl">
                            {testimonial.name?.charAt(0) || 'U'}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-dark-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role || 'Client'}</p>
                </div>
            </div>
        </motion.div>
    );
}
