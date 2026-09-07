import React from 'react';
import { ArrowDown, Terminal, FileText, Send } from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';
import { useRouter } from '../router';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { navigate } = useRouter();

  return (
    <section
      id="top"
      className="flex flex-col gap-6 sm:gap-8 pt-0 pb-8 sm:pb-12 scroll-mt-24"
      onWheel={(e) => {
        // Stop scroll events from propagating to prevent interference with modals
        e.stopPropagation();
      }}
    >

      {/* Massive Typographic Centerpiece */}
      <div className="flex flex-col items-start sm:items-center justify-center py-4 sm:py-6 my-1 sm:my-2">
        <div className="text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase text-[#F27D26] font-['JetBrains_Mono'] font-semibold mb-3 sm:mb-4">
          [ SYSTEMS &amp; MACHINE LEARNING ]
        </div>
        <h1 className="font-['Syne'] text-3xl min-[360px]:text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] font-black uppercase tracking-[-0.04em] sm:tracking-[-0.06em] leading-[0.92] sm:leading-[0.82] text-white text-left sm:text-center break-words w-full">
          SUFYAN<br />
          <span className="text-[#F27D26]">SIDDIQUI</span>
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl text-left sm:text-center mt-4 sm:mt-6 font-light leading-relaxed">
          {PERSONAL_INFO.subtitle}
        </p>

        {/* Primary Action Controls */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-7 w-full">
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#F27D26] hover:bg-[#FF9142] text-[#080808] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(242,125,38,0.25)] shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW ATS RESUME</span>
            </button>
          )}
          <button
            onClick={() => {
              const el = document.getElementById('featured-projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('projects');
            }}
            className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 hover:border-white/40 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.16em] transition-all shrink-0"
          >
            <span>FEATURED PROJECTS</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#F27D26]" />
          </button>
          <button
            onClick={() => navigate('contact')}
            className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-transparent hover:bg-white/[0.04] text-white/80 hover:text-white border border-white/15 font-['JetBrains_Mono'] text-xs font-medium uppercase tracking-[0.16em] transition-all shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>CONTACT</span>
          </button>
        </div>
      </div>

      {/* Architectural Summary & Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-t border-white/20 pt-8 gap-8">
        {/* Col 1-5: Profile Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3 font-['JetBrains_Mono']">
              ENGINEERING PROFILE
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg leading-snug font-light text-white/90 pr-0 lg:pr-6">
              {PERSONAL_INFO.bio}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Terminal className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-white/50 uppercase">
              STATUS: OPEN FOR NEW OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Col 6-8: Production Targets & Tooling */}
        <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2 font-['JetBrains_Mono']">
                DEPLOYMENT PLATFORMS
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-sm font-medium">
                {PERSONAL_INFO.deploymentPlatforms.map((target) => (
                  <div key={target} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                    <span className="text-white/90 text-xs sm:text-sm font-['JetBrains_Mono']">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2 font-['JetBrains_Mono']">
                AI TOOLING &amp; WORKFLOW
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-sm font-medium">
                {PERSONAL_INFO.workflowTooling.map((tool) => (
                  <div key={tool} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                    <span className="text-white/90 text-xs sm:text-sm font-['JetBrains_Mono']">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-white/50 uppercase">
            DHA SUFFA UNIVERSITY · BS COMPUTER SCIENCE
          </div>
        </div>

        {/* Col 9-12: Status Indicator & Directive */}
        <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
          <div className="w-12 h-12 rounded-full border border-[#F27D26] flex items-center justify-center mb-3">
            <div className="w-2.5 h-2.5 bg-[#F27D26] rounded-full shadow-[0_0_14px_#F27D26] animate-pulse"></div>
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#F27D26] font-['JetBrains_Mono'] font-bold text-left lg:text-right">
            AVAILABLE FOR ROLES
          </div>
          <div className="mt-1 flex flex-col items-start lg:items-end gap-0.5 text-left lg:text-right font-['JetBrains_Mono'] text-[10px] uppercase">
            <span className="text-white/90 sm:whitespace-nowrap">
              <span className="text-[#F27D26] font-bold">Karachi:</span> Onsite · Full-time · Part-time · Intern
            </span>
            <span className="text-white/60 sm:whitespace-nowrap">
              <span className="text-white/80 font-medium">Remote:</span> Worldwide &amp; Freelance
            </span>
          </div>
        </div>
      </div>

      {/* High-Impact Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-t border-white/20 pt-8">
        {METRICS.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 bg-[#0E0E0E] border border-white/15 hover:border-[#F27D26]/50 transition-colors flex flex-col justify-between group"
          >
            <span
              className={`font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                stat.highlight ? 'text-[#F27D26]' : 'text-white'
              }`}
            >
              {stat.value}
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.2em] mt-3 group-hover:text-white transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Jump to Featured Projects Directive */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            const el = document.getElementById('featured-projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else navigate('projects');
          }}
          className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-white/60 hover:text-[#F27D26] transition-colors uppercase tracking-[0.2em] sm:tracking-[0.25em]"
        >
          <span>EXPLORE FEATURED PROJECTS</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#F27D26] animate-bounce" />
        </button>
        <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase hidden sm:inline">
          DHA SUFFA UNIVERSITY · BS CS
        </span>
      </div>
    </section>
  );
};
