'use client';

import { motion } from 'framer-motion';
import HeroA from './components/HeroVariants/HeroA';
import ServiceCard from './components/ServiceCard';
import TestimonialCard from './components/TestimonialCard';
import CTAButton from './components/CTAButtons';
import { fadeUp, staggerContainer } from './components/Animations/fadeUp';
import servicesData from '@/data/services.json';
import siteConfig from '@/config/siteConfig';

// Sample Process Steps
const processSteps = [
    {
        id: 1,
        title: 'Choose Service',
        description: 'Select the legal service that matches your business needs.',
        icon: '📝',
    },
    {
        id: 2,
        title: 'Upload Documents',
        description: 'Submit required documents securely through our portal.',
        icon: '📤',
    },
    {
        id: 3,
        title: 'Expert Processing',
        description: 'Our legal experts handle filing and compliance checks.',
        icon: '⚙️',
    },
    {
        id: 4,
        title: 'Get Delivered',
        description: 'Receive your registration or license digitally.',
        icon: '✅',
    },
];

// Sample Testimonials (Ideally from a CMS or DB)
const testimonials = [
    {
        id: 1,
        name: 'Rahul Sharma',
        role: 'Founder, TechStart',
        content: 'LegalNest made our company registration incredibly smooth. The team guided us at every step.',
        rating: 5,
        image: null,
    },
    {
        id: 2,
        name: 'Priya Patel',
        role: 'CEO, Creative Studio',
        content: 'Excellent service for trademark registration. Professional, timely, and very transparent.',
        rating: 5,
        image: null,
    },
    {
        id: 3,
        name: 'Amit Verma',
        role: 'Director, FoodChain',
        content: 'Got our FSSAI license within days. Highly recommend LegalNest for compliance services.',
        rating: 4,
        image: null,
    },
];

export default function Home() {
    return (
        <main className="overflow-hidden">
            {/* 1. Hero Section */}
            <HeroA
                headline="Simplifying Legal Compliance for Indian Businesses"
                subtext="From company registration to trademark protection, we provide end-to-end legal solutions tailored for startups and SMEs."
                ctaText="Get Started"
                ctaHref="/services"
            />

            {/* 2. Popular Services Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.span variants={fadeUp} className="text-primary-600 font-semibold tracking-wide uppercase text-sm">
                            Our Expertise
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-dark-900 mt-2 mb-4">
                            Everything Your Business Needs
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
                            We offer comprehensive legal services to help you start, protect, and grow your business.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {servicesData.slice(0, 8).map((service, index) => (
                            <ServiceCard key={service.id} service={service} index={index} />
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <CTAButton href="/services" variant="outline">
                            View All Services
                        </CTAButton>
                    </div>
                </div>
            </section>

            {/* 3. How It Works (Process) */}
            <section className="py-20 bg-dark-900 text-white relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold mb-4">
                            How It Works
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto">
                            We've simplified the legal process into 4 easy steps. No complex jargon, just results.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-dark-800 border border-dark-700 text-3xl shadow-lg group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Connector Line (Desktop) */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-dark-800 -ml-8 -z-10" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
                            Trusted by 5000+ Businesses
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our clients have to say about our services.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-10 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden"
                    >
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                                Ready to Start Your Business?
                            </h2>
                            <p className="text-primary-100 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
                                Get free consultation from our legal experts. We're here to help you navigate the complexities of business compliance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <CTAButton
                                    href="/contact"
                                    className="bg-white text-primary-600 hover:bg-gray-100 hover:text-primary-700 shadow-xl"
                                >
                                    Get Free Consultation
                                </CTAButton>
                                <CTAButton
                                    href={`tel:${siteConfig.contactNumber}`}
                                    className="bg-primary-700/30 backdrop-blur-sm border border-white/20 hover:bg-primary-700/50"
                                >
                                    Call {siteConfig.contactNumber}
                                </CTAButton>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
