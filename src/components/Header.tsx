import React from 'react';
import { Terminal, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scrollToSection } from '../utils/scroll';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/15">
      <div className="max-w-6xl mx-auto min-h-[4.5rem] py-3 sm:py-0 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-2">
        {/* Identity & Status */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('top');
              }}
              className="font-['Syne'] text-sm sm:text-lg font-black tracking-tight text-white hover:text-[#F27D26] transition-colors whitespace-nowrap"
              title="Return to top"
            >
              {PERSONAL_INFO.name}
            </a>
            <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] px-1.5 sm:px-2 py-0.5 bg-white/[0.04] text-white/60 border border-white/15 uppercase whitespace-nowrap">
              {PERSONAL_INFO.role}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F27D26] shadow-[0_0_8px_#F27D26]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.18em] text-white/60 uppercase truncate">
              <span className="text-[#F27D26] font-semibold">{PERSONAL_INFO.status}</span>
              <span className="hidden md:inline"> · KARACHI (ONSITE · FT · INTERN) · REMOTE &amp; FREELANCE</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Resume Trigger */}
          <button
            onClick={onOpenResume}
            className="w-8 sm:w-auto h-8 sm:h-9 px-0 sm:px-3 flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/20 text-xs sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all"
            title="View ATS Resume"
            aria-label="View ATS Resume"
          >
            <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">RESUME</span>
          </button>

          {/* GitHub Source Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors"
            aria-label="GitHub Repository"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn Profile */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
