import React from 'react';
import { Code2, Brain, Terminal, FileText, Send } from 'lucide-react';
import { useRouter } from '../router';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const { navigate } = useRouter();
  return (
    <section id="about" className="flex flex-col gap-8 pt-6 sm:pt-10 pb-16 scroll-mt-[4.5rem] sm:scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
          <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            ABOUT ME
          </h2>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
            BACKGROUND &amp; FOCUS
          </span>
        </div>
      </div>

      {/* Main Grid: Narrative & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative Story (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-4 font-['Plus_Jakarta_Sans'] text-white/85 text-base sm:text-lg leading-relaxed font-light">
            <p>
              Hello! I'm <strong className="text-white font-semibold">Sufyan Siddiqui</strong>, a Computer Science undergraduate at{' '}
              <span className="text-[#F27D26] font-medium">DHA Suffa University</span> in Karachi, Pakistan. I am currently in my 7th semester, maintaining a strong academic record with a <span className="text-white font-semibold">3.7 / 4.0 CGPA</span>.
            </p>
            <p>
              My engineering focus lies at the intersection of <strong className="text-white font-semibold">full-stack web systems</strong> and <strong className="text-white font-semibold">applied machine learning</strong>. I enjoy taking foundational computer science concepts—from network protocols and algorithms to data structures and linear algebra—and engineering them into practical, performant software applications.
            </p>
            <p>
              Recently, I engineered a <span className="text-white font-semibold">real-time multiplayer game</span> using TypeScript, WebSockets, and state synchronization, alongside an <span className="text-white font-semibold">applied ML movie recommendation system</span> indexing 5,000+ items with optimized Parquet and NPZ data serializations for ~5x faster load speeds.
            </p>
            <p className="text-sm sm:text-base text-white/70">
              Beyond code, I value strict typing, clean design architecture, intuitive user experiences, and continuous learning. I am actively seeking software engineering and full-stack opportunities where I can contribute to high-impact projects.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F27D26] hover:bg-[#FF9142] text-[#080808] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.18em] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>
            <button
              onClick={() => navigate('contact')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.18em] transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>GET IN TOUCH</span>
            </button>
          </div>
        </div>

        {/* Right Column: Key Details & Core Pillars (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Quick Facts Ledger */}
          <div className="bg-[#0E0E0E] border border-white/15 p-5 space-y-3 font-['JetBrains_Mono'] text-xs">
            <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase pb-2 border-b border-white/10 font-semibold">
              ACADEMIC &amp; PROFESSIONAL LEDGER
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="text-white/50 uppercase">Degree</span>
              <span className="text-white font-medium">BS Computer Science</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="text-white/50 uppercase">Institution</span>
              <span className="text-white font-medium">DHA Suffa University</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="text-white/50 uppercase">Current CGPA</span>
              <span className="text-[#F27D26] font-bold">3.7 / 4.00</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="text-white/50 uppercase">Semester</span>
              <span className="text-white">7th Semester</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <span className="text-white/50 uppercase">Location</span>
              <span className="text-white">Karachi, Pakistan</span>
            </div>
          </div>

          {/* Engineering Pillars */}
          <div className="space-y-2.5">
            <div className="text-[10px] font-['JetBrains_Mono'] tracking-[0.25em] text-white/40 uppercase">
              CORE SPECIALIZATIONS
            </div>

            <div className="p-3.5 bg-[#0E0E0E] border border-white/15 hover:border-[#F27D26]/40 transition-colors flex items-start gap-3">
              <Code2 className="w-4 h-4 text-[#F27D26] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-['Syne'] text-sm font-bold text-white uppercase">Full-Stack Development</h4>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/65 mt-0.5">
                  Building responsive React &amp; TypeScript user interfaces paired with robust Node.js/Express servers and WebSockets.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-[#0E0E0E] border border-white/15 hover:border-[#F27D26]/40 transition-colors flex items-start gap-3">
              <Brain className="w-4 h-4 text-[#F27D26] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-['Syne'] text-sm font-bold text-white uppercase">Applied Machine Learning</h4>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/65 mt-0.5">
                  Vector cosine similarity models, feature engineering, and high-performance Parquet serialization in Python.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-[#0E0E0E] border border-white/15 hover:border-[#F27D26]/40 transition-colors flex items-start gap-3">
              <Terminal className="w-4 h-4 text-[#F27D26] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-['Syne'] text-sm font-bold text-white uppercase">Systems &amp; OOP Foundations</h4>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/65 mt-0.5">
                  Proficiency in Java, C++, C, object-oriented design patterns, memory management, and algorithmic complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
