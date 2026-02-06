'use client';

import { motion } from 'framer-motion';
import HeroD from '../components/HeroVariants/HeroD';
import { fadeUp, staggerContainer } from '../components/Animations/fadeUp';
import Link from 'next/link';
import blogData from '@/data/blog.json';

export default function BlogPage() {
    return (
        <main>
            <HeroD
                headline="Legal Insights & Updates"
                subtext="Stay informed with the latest legal news, compliance tips, and business guides."
                ctaText="Subscribe"
                ctaHref="#newsletter"
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {blogData.map((post, i) => (
                            <motion.article
                                key={post.id}
                                variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image Placeholder */}
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-900/5 group-hover:bg-primary-900/0 transition-colors" />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-gray-400 text-xs mb-3">{post.date}</div>
                                    <h2 className="text-xl font-bold mb-3 text-dark-900 group-hover:text-primary-600 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-primary-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform self-start mt-auto"
                                    >
                                        Read Article →
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* Newsletter Box */}
                    <div id="newsletter" className="mt-20 bg-dark-900 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
                            <p className="text-gray-400 mb-8">Get the latest legal updates and business tips delivered directly to your inbox.</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-grow px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button className="px-8 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
