import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="flex flex-col gap-6 pt-6 sm:pt-10 pb-16 scroll-mt-[4.5rem] sm:scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
          <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            EDUCATION
          </h2>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
            [CHRONOLOGY]
          </span>
        </div>
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-white/50 uppercase">
          3 MILESTONES
        </span>
      </div>

      {/* Milestones List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className="bg-[#0E0E0E] p-4 sm:p-5 border border-white/15 hover:border-white/30 flex flex-col gap-3 transition-colors"
          >
            {/* Tag & Period */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 flex-wrap gap-2">
              <span
                className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] font-semibold ${
                  item.isHighValue ? 'text-[#F27D26]' : 'text-white/50'
                }`}
              >
                {item.tag}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-white/50">
                {item.period}
              </span>
            </div>

            {/* Degree and Institution */}
            <div className="flex flex-col gap-1">
              <h3 className="font-['Syne'] text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                {item.degree}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/60 font-light">
                {item.institution}
              </p>
            </div>

            {/* Metric Status Bar */}
            <div className="flex items-center justify-between bg-[#141414] p-3 border border-white/10 mt-1">
              <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-widest">
                {item.statusLabel}
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider ${
                  item.isHighValue ? 'text-[#F27D26]' : 'text-white'
                }`}
              >
                {item.statusValue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
