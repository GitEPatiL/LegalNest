'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CTAButton from '../CTAButtons';
import { fadeUp, staggerContainer } from '../Animations/fadeUp';

const TYPING_STRINGS = ['Tax Filing', 'GST Registration', 'Trademark', 'Legal Advice'];

/**
 * HeroE: Minimal Layout
 * Features: Clean, minimalist design with typed text effect
 */
export default function HeroE({
    headline = "We help you with",
    ctaText = "Quick Enquiry",
    ctaHref = "/enquiry"
}) {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentString = TYPING_STRINGS[textIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === currentString) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
            } else {
                setDisplayText(currentString.substring(0, displayText.length + (isDeleting ? -1 : 1)));
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, textIndex]);

    return (
        <section className="relative h-[70vh] flex items-center justify-center bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-dark-900 mb-6">
                        {headline} <br />
                        <span className="text-primary-500 underline decoration-4 decoration-primary-200 underline-offset-8">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl text-gray-500 max-w-xl mx-auto mb-10">
                        Minimal friction. Maximum compliance. The modern way to handle legalities in India.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex justify-center gap-6">
                        <div className="w-full max-w-md bg-white shadow-xl rounded-full p-2 pl-6 flex items-center border border-gray-100">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="flex-grow outline-none text-dark-900 bg-transparent"
                            />
                            <CTAButton onClick={() => { }} className="!py-2 !px-6 !rounded-full shrink-0">
                                Search
                            </CTAButton>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-8 flex gap-4 justify-center text-sm text-gray-400">
                        <span>Popular:</span>
                        <button className="hover:text-primary-500 underline">Private Ltd</button>
                        <button className="hover:text-primary-500 underline">GST</button>
                        <button className="hover:text-primary-500 underline">Trademark</button>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
