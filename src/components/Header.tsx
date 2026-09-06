import React from 'react';
import { Terminal, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scrollToSection } from '../utils/scroll';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/15 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-6xl mx-auto h-16 sm:h-20 px-3 min-[360px]:px-4 sm:px-8 flex items-center justify-between gap-2">
        {/* Identity & Status */}
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1 pr-1 sm:pr-2 overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('top');
              }}
              className="font-['Syne'] text-[11px] min-[360px]:text-xs min-[400px]:text-sm sm:text-base md:text-lg font-black tracking-tight text-white hover:text-[#F27D26] transition-colors truncate block"
              title="Return to top"
            >
              {PERSONAL_INFO.name}
            </a>
            <span className="font-['JetBrains_Mono'] text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] px-1 sm:px-2 py-0.5 bg-white/[0.04] text-white/60 border border-white/15 uppercase truncate hidden min-[440px]:inline-block shrink-0">
              {PERSONAL_INFO.role}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="relative flex h-1.5 w-1.5 min-[360px]:h-2 min-[360px]:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 min-[360px]:h-2 min-[360px]:w-2 bg-[#F27D26] shadow-[0_0_8px_#F27D26]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.18em] text-white/60 uppercase truncate">
              <span className="text-[#F27D26] font-semibold">{PERSONAL_INFO.status}</span>
              <span className="hidden md:inline"> · KARACHI (ONSITE · FT · INTERN) · REMOTE &amp; FREELANCE</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2.5 shrink-0">
          {/* Resume Trigger */}
          <button
            onClick={onOpenResume}
            className="h-7 min-[360px]:h-8 sm:h-9 px-1.5 min-[360px]:px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 bg-white/[0.04] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/20 text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.06em] sm:tracking-[0.2em] transition-all"
            title="View ATS Resume"
            aria-label="View ATS Resume"
          >
            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden min-[330px]:inline">RESUME</span>
          </button>

          {/* GitHub Source Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors shrink-0"
            aria-label="GitHub Repository"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          {/* LinkedIn Profile */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors shrink-0"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
