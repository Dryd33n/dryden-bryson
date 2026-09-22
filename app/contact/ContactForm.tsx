'use client'

import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { sendContactEmail } from '@/app/hooks/sendEmail';

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await sendContactEmail(formData);
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert('Message sent successfully!');
        } catch (err) {
            setError('Failed to send message. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const isFormComplete =
        formData.name.trim() &&
        formData.email.trim() &&
        formData.subject.trim() &&
        formData.message.trim();

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 md:mr-[30%]">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-neutral-600 dark:text-[#a3a3a3] text-xs md:text-sm mb-2">Name<span className="text-accent-strong">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Edsger Dijkstra"
                        required
                        className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition"
                    />
                </div>
                <div>
                    <label className="block text-neutral-600 dark:text-[#a3a3a3] text-xs md:text-sm mb-2">Email<span className="text-accent-strong">*</span></label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Dijkstra@example.com"
                        required
                        className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition"
                    />
                </div>
            </div>

            {/* Subject */}
            <div>
                <label className="block text-neutral-600 dark:text-[#a3a3a3] text-xs md:text-sm mb-2">Subject<span className="text-accent-strong">*</span></label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition"
                />
            </div>

            {/* Message */}
            <div>
                <label className="block text-neutral-600 dark:text-[#a3a3a3] text-xs md:text-sm mb-2">Message<span className="text-accent-strong">*</span></label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={8}
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition resize-none"
                />
            </div>

            {error && <p className="text-accent-strong text-sm">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || !isFormComplete}
                className="w-full px-6 py-3 bg-neutral-900 text-white font-semibold rounded hover:bg-neutral-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
                <span><BsSend /></span> {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
