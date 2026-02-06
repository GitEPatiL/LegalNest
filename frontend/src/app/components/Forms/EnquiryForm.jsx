'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '@/lib/apiClient';
import CTAButton from '../CTAButtons';
import { fadeUp } from '../Animations/fadeUp';

export default function EnquiryForm({ serviceName = 'General Enquiry' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: serviceName,
        details: '',
        honeypot: ''
    });

    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\s-]{10,}$/; // Basic phone validation
        return emailRegex.test(formData.email) && phoneRegex.test(formData.phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.honeypot) return;

        if (!validateForm()) {
            setErrorMessage('Please provide valid name, email, and phone number.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            // Assuming postEnquiry exists in apiClient, otherwise postContact can be used as fallback
            await apiClient.postContact({
                ...formData,
                subject: `Enquiry for ${serviceName}`
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: serviceName, details: '', honeypot: '' });
        } catch (error) {
            console.error('Enquiry form error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Submission failed. Please try again.');
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
            <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-900">Get Expert Advice</h3>
                <p className="text-sm text-gray-500">Fill details to get a callback for {serviceName}</p>
            </div>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                            📞
                        </div>
                        <h4 className="font-bold text-dark-900 mb-1">Request Received!</h4>
                        <p className="text-sm text-gray-500 mb-4">Our expert will call you shortly.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-sm text-primary-600 font-medium hover:underline"
                        >
                            New Request
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" autoComplete="off" />

                        <div>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="Full Name *"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="Phone *"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="Email *"
                            />
                        </div>

                        <div>
                            <textarea
                                name="details"
                                rows={3}
                                value={formData.details}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="Specific requirements (optional)..."
                            />
                        </div>

                        {status === 'error' && (
                            <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                                Result: {errorMessage}
                            </div>
                        )}

                        <CTAButton
                            type="submit"
                            variant="primary"
                            className="w-full justify-center py-2 text-sm"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Processing...' : 'Request Callback'}
                        </CTAButton>

                        <p className="text-xs text-center text-gray-400 mt-2">
                            Values privacy. No spam guarantee.
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
