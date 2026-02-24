import Image from 'next/image';
import { MdArrowOutward } from "react-icons/md";
import TechBadge from '../TechBadge';

export default function SpotimasherModal() {
	return (
		<div className="flex flex-col md:flex-row items-start gap-8">
			<div className="w-full md:w-2/5 flex flex-col items-start">
                <Image 
                    src="/spotimasher_logo.webp" 
                    alt="Spotimasher Logo" 
                    width={741} 
                    height={161} 
                    className="w-full object-contain mb-8 saturate-50 hover:saturate-100 transition-all duration-300" 
                />
                
                <div className="w-full flex flex-col items-start gap-3 mb-8">
                    <a 
                        href="https://spotimasher.web.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center justify-center rounded-sm border border-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                    >
                        View Live Demo <MdArrowOutward className="inline ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a 
                        href="https://github.com/Dryd33n/Spotimasher" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center justify-center rounded-sm border border-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                    >
                        View Code <MdArrowOutward className="inline ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
                
                <div className="w-full border-t border-white/20 pt-6">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-4 cursor-default">Languages</h3>
                    <div className="w-full cursor-default space-y-2">
                        <div className="flex justify-between text-xs tracking-wider">
                            <span className="text-white/80">Javascript</span>
                            <span className="text-white/60">65.0%</span>
                        </div>
                        <div className="flex justify-between text-xs tracking-wider">
                            <span className="text-white/80">HTML</span>
                            <span className="text-white/60">18.2%</span>
                        </div>
                        <div className="flex justify-between text-xs tracking-wider">
                            <span className="text-white/80">CSS</span>
                            <span className="text-white/60">16.8%</span>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <div className="w-full md:w-3/5 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-3 cursor-default">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        <TechBadge label="OAuth" />
                        <TechBadge label="REST API" />
                        <TechBadge label="HTML" />
                        <TechBadge label="CSS" />
                        <TechBadge label="JavaScript" />
                    </div>
                </div>
                
                <div className="border-t border-white/20 pt-6 cursor-default">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-4">About</h3>
                    <p className="text-sm leading-relaxed text-white/80">
                        Spotimasher is a JavaScript web application that intelligently merges two Spotify playlists into a brand-new, personalized mix. Using the Spotify Web API and OAuth 2.0 authentication flow, the app retrieves playlist data, analyzes artist frequency across both lists, and generates recommendations based on the top shared artist seeds.
                    </p>
                    <p className="text-sm leading-relaxed text-white/80 mt-4">
                        The application handles secure user authentication, asynchronous API requests, data parsing, and automated playlist creation directly within the user’s Spotify account. By combining algorithmic logic with a clean, interactive UI, Spotimasher transforms two separate playlists into a cohesive, recommendation-driven listening experience.
                    </p>
                </div>
            </div>
		</div>
	);
}
