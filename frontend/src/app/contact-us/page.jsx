'use client';

import { motion } from 'framer-motion';
import HeroC from '../components/HeroVariants/HeroC';
import ContactForm from '../components/Forms/ContactForm';
import { fadeUp, staggerContainer } from '../components/Animations/fadeUp';
import siteConfig from '@/config/siteConfig';

export default function ContactPage() {
    return (
        <main>
            <HeroC
                headline="Get in Touch"
                subtext="Have questions? We're here to help you with expert legal advice."
                ctaText="Call Now"
                ctaHref={`tel:${siteConfig.contactNumber}`}
            />

            <section className="py-20 bg-gray-50 relative -mt-20 z-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Contact Info Side */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-5 space-y-8"
                        >
                            <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <span className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 text-xl border border-primary-100">
                                            📍
                                        </span>
                                        <div>
                                            <p className="font-bold text-dark-900">Head Office</p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                123 Business Park, Financial District,<br />
                                                Mumbai, Maharashtra, India - 400001
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 text-xl border border-primary-100">
                                            📞
                                        </span>
                                        <div>
                                            <p className="font-bold text-dark-900">Phone</p>
                                            <a href={`tel:${siteConfig.contactNumber}`} className="text-gray-600 text-sm mt-1 hover:text-primary-600 block">
                                                {siteConfig.contactNumber}
                                            </a>
                                            <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9am - 7pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 text-xl border border-primary-100">
                                            ✉️
                                        </span>
                                        <div>
                                            <p className="font-bold text-dark-900">Email</p>
                                            <a href={`mailto:${siteConfig.email}`} className="text-gray-600 text-sm mt-1 hover:text-primary-600 block">
                                                {siteConfig.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="bg-dark-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4">Need Quick Support?</h3>
                                    <p className="text-gray-400 text-sm mb-6">Chat with us on WhatsApp for instant replies.</p>
                                    <a
                                        href={`https://wa.me/${siteConfig.whatsappNumber?.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition-colors"
                                    >
                                        WhatsApp Us 💬
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form Side */}
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
