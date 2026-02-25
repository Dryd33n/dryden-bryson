import { MdArrowOutward } from "react-icons/md";
import TechBadge from '../TechBadge';

export default function MusicMapModal() {
	return (
		<div className="flex flex-col md:flex-row items-start gap-8">
			<div className="w-full md:w-2/5 flex flex-col items-start">
                <div className="w-full aspect-video bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-lg mb-8 flex items-center justify-center border border-white/20">
                    <span className="text-4xl font-bold text-white/50 tracking-[0.2em]">MUSIC MAP</span>
                </div>
                
                <div className="w-full flex flex-col items-start gap-3 mb-8">
                    <a 
                        href="https://github.com/Dryd33n/spotifyDataView" 
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
                            <span className="text-white/80">Python</span>
                            <span className="text-white/60">100%</span>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <div className="w-full md:w-3/5 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-3 cursor-default">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        <TechBadge label="Python" />
                        <TechBadge label="Spotify API" />
                        <TechBadge label="Pandas" />
                        <TechBadge label="Data Viz" />
                    </div>
                </div>
                
                <div className="border-t border-white/20 pt-6 cursor-default">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-4">About</h3>
                    <p className="text-sm leading-relaxed text-white/80">
                        Music Map explores your Spotify listening history and turns it into a clean visual map of artists, genres, and audio features. It pulls data from the Spotify API, normalizes it with Python, and highlights patterns in your taste across time.
                    </p>
                    <p className="text-sm leading-relaxed text-white/80 mt-4">
                        The project focuses on data processing and visualization to surface trends like top artists, energy, and tempo. It is a lightweight pipeline that turns raw listening data into readable, shareable insights.
                    </p>
                </div>
            </div>
		</div>
	);
}
