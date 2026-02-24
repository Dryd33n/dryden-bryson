import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { aboutItems, contactItems, home, portfolioItems } from '@/lib/menuItems';
import ContactForm from './ContactForm';

export const metadata = {
  title: "Contact",
  description: "Get in touch with Dryden Bryson, a computer science student and programmer based in Canada. Reach out via email or connect on social media to discuss projects, collaborations, or just to say hi.",
};

export default function Contact() {
    return (<>

        {/* HEADER */}
        <div className="relative">
            <div className="absolute top-6 left-6 z-10">
                <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
            </div>
            <PageHeader title="CONTACT" />
        </div>

        <div className='py-12 md:py-30 px-4 md:px-10 lg:px-40'>
            <div className="md:mr-[50%]">
                <p className="mt-10 text-sm md:text-base">Have a project in mind or just want to chat? Feel free to reach out. I&apos;m always open to discussing new opportunities, collaborations, or answering questions.</p>
                <section id="contact-form"></section>
                <p className="!text-xl md:!text-2xl !font-bold !text-white mt-12 md:mt-20">Send a message</p>
            </div>

            <ContactForm />

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
                <section id="social-media"></section>
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