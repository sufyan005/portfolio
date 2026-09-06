import React, { useState } from 'react';
import { Layers, Search, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchesCategory = !activeCategory || cat.id === activeCategory;
    const filteredSkills = cat.skills.filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      isVisible: matchesCategory && (searchQuery === '' || filteredSkills.length > 0),
      displaySkills: searchQuery === '' ? cat.skills : filteredSkills,
    };
  }).filter((cat) => cat.isVisible);

  return (
    <section id="skills" className="flex flex-col gap-6 pt-12 pb-16 border-t border-white/20 scroll-mt-[4.5rem] sm:scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
          <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            SKILLS MATRIX
          </h2>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
            [CAPABILITIES]
          </span>
        </div>
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-white/50 uppercase">
          6 CATEGORIES
        </span>
      </div>

      {/* Interactive Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER SKILLS (E.G. SOCKET.IO, TF-IDF, PYTHON)..."
            className="w-full pl-9 pr-3 py-2 bg-[#0E0E0E] border border-white/15 text-white text-xs font-['JetBrains_Mono'] focus:border-[#F27D26] focus:outline-none uppercase tracking-wider placeholder:text-white/30"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] border transition-colors shrink-0 ${
              activeCategory === null
                ? 'bg-[#F27D26] text-[#080808] border-[#F27D26] font-bold'
                : 'bg-[#0E0E0E] text-white/60 border-white/15 hover:border-white/30 hover:text-white'
            }`}
          >
            ALL [06]
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] border transition-colors shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#F27D26] text-[#080808] border-[#F27D26] font-bold'
                  : 'bg-[#0E0E0E] text-white/60 border-white/15 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Matrix Rows */}
      <div className="flex flex-col gap-2.5">
        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center bg-[#0E0E0E] border border-white/15 font-['JetBrains_Mono'] text-xs text-white/50 tracking-wider">
            NO RUNTIMES MATCHING "{searchQuery.toUpperCase()}"
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#0E0E0E] p-4 sm:p-5 border border-white/15 hover:border-white/30 flex flex-col gap-3 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase font-semibold tracking-[0.2em]">
                  {cat.index} {cat.title}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-white/50 uppercase">
                  {cat.subtitle}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {cat.displaySkills.map((skill) => (
                  <span
                    key={skill}
                    className="font-['JetBrains_Mono'] text-[11px] bg-[#141414] hover:bg-[#F27D26] hover:text-[#080808] hover:border-[#F27D26] text-white/90 border border-white/10 px-2.5 py-1 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
