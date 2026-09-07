import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Play,
  Bolt,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { useRouter } from '../router';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface HomePageProps {
  onOpenResume: () => void;
  onOpenDetails?: (project: Project) => void;
  onLaunchInteractive?: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenResume,
  onOpenDetails,
  onLaunchInteractive,
}) => {
  const { navigate } = useRouter();

  // Focus on top two flagship engineering projects
  const flagshipProjects = PROJECTS.slice(0, 2);

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Hero Typographic Identity & Architectural Ledger */}
      <Hero onOpenResume={onOpenResume} />

      {/* Flagship Engineering Projects Showcase */}
      <section id="featured-projects" className="flex flex-col gap-6 pt-6 sm:pt-8 border-t border-white/20 scroll-mt-24 pb-4">
        {/* Section Header */}
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
            <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
            <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
              [FLAGSHIP WORK]
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-white/50 uppercase">
            REAL-TIME WEB &amp; APPLIED ML
          </span>
        </div>

        {/* 2-Column Responsive Flagship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {flagshipProjects.map((project) => {
            const isMafia = project.id === 'mafia-game';
            const hasInteractive = project.id === 'movie-recommender' || project.id === 'hangman-game';

            return (
              <article
                key={project.id}
                className="bg-[#0E0E0E] border border-white/15 hover:border-[#F27D26]/60 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Header Metadata */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 bg-white/[0.02] border-b border-white/10">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase tracking-[0.2em] font-semibold">
                        {project.number} · {project.category}
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider uppercase text-white/60 px-2 py-0.5 bg-white/[0.04] border border-white/15">
                      {project.status}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenDetails?.(project)}
                    className="font-['Syne'] text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#F27D26] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Tech stack chips */}
                  <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-white/50 leading-relaxed flex flex-wrap gap-1.5 pt-0.5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="inline-flex items-center">
                        <span className="px-1.5 py-0.5 bg-white/[0.03] border border-white/10 text-white/70">
                          {tech}
                        </span>
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="text-white/40 text-[10px] self-center">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Media preview banner */}
                {project.image && (
                  <div
                    onClick={() => onOpenDetails?.(project)}
                    className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] bg-[#080808] cursor-pointer overflow-hidden border-b border-white/10 group/media"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      className="w-full h-full object-cover object-top opacity-90 group-hover/media:opacity-100 group-hover/media:scale-[1.02] transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Image overlay badges */}
                    <div className="absolute bottom-2.5 left-2.5 bg-[#080808]/95 border border-white/20 px-2.5 py-1">
                      <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] text-[#F27D26] uppercase tracking-[0.18em] font-semibold">
                        {isMafia ? '<100MS SYNC · ZERO LAG' : '5,000+ FILMS · ~5X SPEED'}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-[#0E0E0E]/90 border border-white/20 px-2 py-1 flex items-center gap-1.5 opacity-0 group-hover/media:opacity-100 transition-opacity">
                      <Layers className="w-3 h-3 text-[#F27D26]" />
                      <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest text-white uppercase">
                        INSPECT SPEC
                      </span>
                    </div>
                  </div>
                )}

                {/* Narrative & Metrics */}
                <div className="p-4 sm:p-5 flex flex-col gap-3.5 flex-1 justify-between">
                  <div className="flex flex-col gap-3">
                    {/* Status highlight banner */}
                    <div className="bg-white/[0.03] p-2.5 border border-white/10 flex items-center gap-2">
                      <Bolt className="w-3.5 h-3.5 text-[#F27D26] shrink-0" />
                      <span className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-white/90 uppercase tracking-wider font-medium">
                        {project.statusBadge}
                      </span>
                    </div>

                    {/* Summary text */}
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                      {project.highlight}
                    </p>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex flex-col gap-0.5">
                          <span className="font-['JetBrains_Mono'] text-[8px] sm:text-[9px] uppercase tracking-wider text-white/40">
                            {m.label}
                          </span>
                          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-bold text-white">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenDetails?.(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] transition-all"
                    >
                      <Layers className="w-3 h-3 text-[#F27D26]" />
                      <span>VIEW SYSTEM SPEC</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {hasInteractive && onLaunchInteractive && (
                        <button
                          onClick={() => onLaunchInteractive(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/20 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] transition-all"
                          title="Try in-browser interactive simulator"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>SIMULATOR</span>
                        </button>
                      )}

                      {project.primaryLink && (
                        <a
                          href={project.primaryLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F27D26] hover:bg-[#FF9142] text-[#080808] font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] transition-all"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Catalog Link Banner */}
        <div className="p-4 sm:p-5 bg-[#0E0E0E] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-['Syne'] text-sm sm:text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F27D26] rounded-full"></span>
              ALL 5 PRODUCTION &amp; CORE SYSTEMS CATALOG
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-white/60 font-light">
              Explore the Java 2D Brick Breaker arcade engine, interactive CLI Hangman simulator, and C binary-stream bookstore.
            </span>
          </div>
          <button
            onClick={() => navigate('projects')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F27D26] hover:bg-[#FF9142] text-[#080808] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.16em] transition-all shrink-0 w-full sm:w-auto justify-center"
          >
            <span>EXPLORE ALL PROJECTS (05)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
