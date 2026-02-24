import { MdArrowOutward } from "react-icons/md";
import TechBadge from '../TechBadge';

export default function SudokuModal() {
	return (
		<div className="flex flex-col md:flex-row items-start gap-8">
			<div className="w-full md:w-2/5 flex flex-col items-start">
                <div className="w-full aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-8 flex items-center justify-center border border-white/20">
                    <span className="text-6xl font-bold text-white/40">SUDOKU</span>
                </div>
                
                <div className="w-full flex flex-col items-start gap-3 mb-8">
                    <a 
                        href="https://github.com/Dryd33n/sudoku" 
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
                            <span className="text-white/80">Java</span>
                            <span className="text-white/60">82.1%</span>
                        </div>
                        <div className="flex justify-between text-xs tracking-wider">
                            <span className="text-white/80">CSS</span>
                            <span className="text-white/60">17.9%</span>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <div className="w-full md:w-3/5 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-3 cursor-default">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        <TechBadge label="Java" />
                        <TechBadge label="JavaFX" />
                        <TechBadge label="Backtracking" />
                        <TechBadge label="OOP" />
                    </div>
                </div>
                
                <div className="border-t border-white/20 pt-6 cursor-default">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/60 mb-4">About</h3>
                    <p className="text-sm leading-relaxed text-white/80">
                        A classic Sudoku puzzle game built in Java with a graphical user interface using Java Swing. The application features an interactive 9x9 grid where players can fill in numbers following standard Sudoku rules, with real-time validation to ensure moves are legal.
                    </p>
                    <p className="text-sm leading-relaxed text-white/80 mt-4">
                        The game implements a backtracking algorithm to generate valid Sudoku puzzles and provide solver functionality. With a clean, intuitive interface and responsive controls, this project demonstrates object-oriented programming principles, event-driven architecture, and algorithmic problem-solving in Java.
                    </p>
                </div>
            </div>
		</div>
	);
}
