import React from 'react';
import { FileText, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ROUTE_LIST, useRouter } from '../router';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const { currentPage, navigate } = useRouter();

  return (
    <header className="fixed top-0 w-full z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-[#B8662A]/25 pt-[env(safe-area-inset-top,0px)] shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-6xl mx-auto h-14 sm:h-16 px-3 sm:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Identity & Status */}
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate('home')}
              className="font-['Syne'] text-xs min-[360px]:text-sm sm:text-base md:text-lg font-black tracking-tight text-white hover:text-[#F27D26] transition-colors whitespace-nowrap text-left shrink-0"
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
            className="group/resume relative h-9 w-7 sm:w-auto sm:px-1 flex items-center justify-center gap-1.5 text-white/70 hover:text-[#F27D26] text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.04em] sm:tracking-[0.2em] transition-colors shrink-0"
            title="View Resume"
            aria-label="View Resume"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover/resume:-translate-y-0.5" />
            <span className="hidden min-[480px]:inline">RESUME</span>
            <span className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-[#F27D26] transition-transform duration-300 group-hover/resume:scale-x-100" />
          </button>

          {/* GitHub Source Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-9 flex items-center gap-1.5 px-1 text-white/55 hover:text-[#F27D26] transition-colors shrink-0"
            aria-label="GitHub Repository"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden min-[480px]:inline font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.12em] uppercase">GitHub</span>
            <span className="absolute bottom-0 left-1 right-1 h-px origin-left scale-x-0 bg-[#F27D26] transition-transform duration-300 group-hover:scale-x-100" />
          </a>

          {/* LinkedIn Profile */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-9 flex items-center gap-1.5 px-1 text-white/55 hover:text-[#F27D26] transition-colors shrink-0"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden min-[480px]:inline font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.12em] uppercase">LinkedIn</span>
            <span className="absolute bottom-0 left-1 right-1 h-px origin-left scale-x-0 bg-[#F27D26] transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
      </div>

      <nav aria-label="Portfolio primary navigation" className="border-t border-[#B8662A]/25">
        <div className="max-w-6xl mx-auto h-11 px-2 sm:px-8 flex items-center justify-center gap-0.5 sm:gap-3">
          {ROUTE_LIST.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`h-8 flex flex-1 min-w-0 px-0 sm:flex-none sm:px-3 items-center justify-center gap-0.5 sm:gap-1.5 rounded-sm whitespace-nowrap font-['JetBrains_Mono'] text-[7px] min-[360px]:text-[8px] sm:text-[10px] uppercase tracking-normal sm:tracking-[0.12em] transition-colors ${
                  isActive
                    ? 'bg-white/[0.1] text-white'
                    : 'text-[#A1A1AA] hover:bg-white/[0.05] hover:text-[#F27D26]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] shadow-[0_0_8px_#F27D26]" />}
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
