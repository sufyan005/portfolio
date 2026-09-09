import React from 'react';
import { FileText, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useRouter } from '../router';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const { currentPage, navigate } = useRouter();

  return (
    <header className="fixed top-0 w-full z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/15 pt-[env(safe-area-inset-top,0px)] shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-6xl mx-auto h-16 sm:h-20 px-2.5 min-[360px]:px-3 sm:px-8 flex items-center justify-between gap-1.5 min-[360px]:gap-2 sm:gap-4">
        {/* Identity & Status */}
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate('home')}
              className="font-['Syne'] text-xs min-[360px]:text-sm sm:text-base md:text-lg font-black tracking-tight text-white hover:text-[#F27D26] transition-colors whitespace-nowrap text-left"
              title="Return to Home"
            >
              {PERSONAL_INFO.name}
            </button>
            {currentPage !== 'home' ? (
              <span className="font-['JetBrains_Mono'] text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.15em] px-1.5 py-0.5 bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/30 uppercase font-semibold hidden md:inline">
                /{currentPage.toUpperCase()}
              </span>
            ) : (
              <span className="font-['JetBrains_Mono'] text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] px-1 sm:px-2 py-0.5 bg-white/[0.04] text-white/60 border border-white/15 uppercase hidden min-[480px]:inline-block shrink-0">
                {PERSONAL_INFO.role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Resume Trigger */}
          <button
            onClick={onOpenResume}
            className="h-7 sm:h-9 px-1.5 min-[360px]:px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-1.5 bg-white/[0.04] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/20 text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.04em] sm:tracking-[0.2em] transition-all shrink-0"
            title="View Resume"
            aria-label="View Resume"
          >
            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">RESUME</span>
          </button>

          {/* GitHub Source Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors shrink-0"
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
            className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center bg-white/[0.04] border border-white/15 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors shrink-0"
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
