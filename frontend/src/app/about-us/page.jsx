'use client';

import { motion } from 'framer-motion';
import HeroB from '../components/HeroVariants/HeroB';
import TestimonialCard from '../components/TestimonialCard';
import { fadeUp, staggerContainer } from '../components/Animations/fadeUp';
import siteConfig from '@/config/siteConfig';

const teamMembers = [
    {
        name: "Rajesh Kumar",
        role: "Senior Legal Advisor",
        image: null,
    },
    {
        name: "Sneha Gupta",
        role: "Chartered Accountant",
        image: null,
    },
    {
        name: "Vikram Singh",
        role: "Compliance Expert",
        image: null,
    }
];

export default function AboutPage() {
    return (
        <main>
            <HeroB
                headline={`About ${siteConfig.companyName}`}
                subtext={siteConfig.description}
                ctaText="Contact Our Team"
                ctaHref="/contact"
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6">Our Mission</motion.h2>
                        <motion.p variants={fadeUp} className="text-xl text-gray-600 leading-relaxed">
                            We are on a mission to simplify legal compliance for millions of Indian businesses. By combining technology with legal expertise, we make starting and running a business seamless, affordable, and transparent.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { title: "Transparency", icon: "🔍", desc: "No hidden fees, clear timelines." },
                            { title: "Expertise", icon: "🎓", desc: "Qualified CAs, CSs, and Lawyers." },
                            { title: "Technology", icon: "💻", desc: "Digital-first process tracking." }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-500">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-12">Meet Our Experts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white border boundary-gray-200 p-6 rounded-xl shadow-sm"
                                >
                                    <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-600">
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-bold">{member.name}</h3>
                                    <p className="text-primary-600 text-sm">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
