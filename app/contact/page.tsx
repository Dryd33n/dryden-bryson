'use client'

import { useState } from 'react';
import { BsSend } from "react-icons/bs";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { sendContactEmail } from '@/app/hooks/sendEmail';
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { aboutItems, home, portfolioItems } from '@/lib/menuItems';

export default function Contact() {
    const [formData, setFormData] = useState({
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

    const isFormComplete = formData.name.trim() && formData.email.trim() && formData.subject.trim() && formData.message.trim();

    return (<>

        {/* HEADER */}
        <div className="relative">
            <div className="absolute top-6 left-6 z-10">
                <Navbar menuItemArrays={[home, portfolioItems, aboutItems]} layout="horizontal" />
            </div>
            <PageHeader title="CONTACT" />
        </div>
        
        <div className='py-12 md:py-30 px-4 md:px-10 lg:px-40'>
            <div className="md:mr-[50%]">
                <p className="mt-10 text-sm md:text-base">Have a project in mind or just want to chat? Feel free to reach out. I&apos;m always open to discussing new opportunities, collaborations, or answering questions.</p>

                <p className="!text-xl md:!text-2xl !font-bold !text-white mt-12 md:mt-20">Send a message</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 md:mr-[30%]">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#a3a3a3] text-xs md:text-sm mb-2">Name<span className="text-[#f76855]">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Edsger Dijkstra"
                            required
                            className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#f76855] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[#a3a3a3] text-xs md:text-sm mb-2">Email<span className="text-[#f76855]">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Dijkstra@example.com"
                            required
                            className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#f76855] transition"
                        />
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-[#a3a3a3] text-xs md:text-sm mb-2">Subject<span className="text-[#f76855]">*</span></label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        required
                        className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#f76855] transition"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-[#a3a3a3] text-xs md:text-sm mb-2">Message<span className="text-[#f76855]">*</span></label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        required
                        rows={8}
                        className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#f76855] transition resize-none"
                    />
                </div>

                {error && <p className="text-[#f76855] text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !isFormComplete}
                    className="w-full px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span><BsSend /></span> {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            <p className="!text-xl md:!text-2xl !font-bold !text-white mt-12 md:mt-20">Let&apos;s Connect!</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:mr-[30%] mb-70">
                {/* Contact Information */}
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-8">Contact Information</h3>
                    
                    <div className="mb-6 flex items-start gap-4">
                        <FiMail className="text-[#f76855] text-xl md:text-2xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[#a3a3a3] text-xs md:text-sm font-semibold mb-1">Email</p>
                            <p className="text-white text-sm md:text-lg">drydenbryson@dryd3n.ca</p>
                        </div>
                    </div>

                    <div className="mb-6 flex items-start gap-4">
                        <FiMapPin className="text-[#f76855] text-xl md:text-2xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[#a3a3a3] text-xs md:text-sm font-semibold mb-1">Location</p>
                            <p className="text-white text-sm md:text-lg">Victoria, BC, Canada</p>
                        </div>
                    </div>

                    <div className="border-l-2 border-[#f76855] pl-4 mt-8">
                        <h4 className="text-white font-bold text-base md:text-lg mb-3">Availability</h4>
                        <p className="text-[#a3a3a3] text-xs md:text-sm">I&apos;m currently <span className="text-[#00ff00]">available</span> for freelance projects and full-time opportunities. Expected response time: 24-48 hours.</p>
                    </div>
                </div>

                {/* Connect With Me */}
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-8">Connect With Me</h3>
                    
                    <a href="https://github.com/Dryd33n" target="_blank" rel="noopener noreferrer" className="mb-6 flex items-start gap-4 p-4 border border-gray-600 rounded hover:border-[#f76855] hover:bg-gray-900 transition">
                        <FaGithub className="text-[#f76855] text-xl md:text-2xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[#a3a3a3] text-xs md:text-sm font-semibold mb-1">GitHub</p>
                            <p className="text-white text-sm md:text-lg">@Dryd33n</p>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/drydenbryson/" target="_blank" rel="noopener noreferrer" className="mb-6 flex items-start gap-4 p-4 border border-gray-600 rounded hover:border-[#f76855] hover:bg-gray-900 transition">
                        <FaLinkedin className="text-[#f76855] text-xl md:text-2xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[#a3a3a3] text-xs md:text-sm font-semibold mb-1">LinkedIn</p>
                            <p className="text-white text-sm md:text-lg">Dryden Bryson</p>
                        </div>
                    </a>

                    <a href="https://twitter.com/drydenbryson" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 border border-gray-600 rounded hover:border-[#f76855] hover:bg-gray-900 transition">
                        <FaTwitter className="text-[#f76855] text-xl md:text-2xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-[#a3a3a3] text-xs md:text-sm font-semibold mb-1">Twitter</p>
                            <p className="text-white text-sm md:text-lg">@drydenbryson</p>
                        </div>
                    </a>
                </div>
            </div>

        </div>


    </>)


}