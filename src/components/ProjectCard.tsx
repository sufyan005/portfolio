import React from 'react';
import { ExternalLink, ArrowRight, Bolt, Cpu, Play, Terminal, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  onLaunchInteractive?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onLaunchInteractive,
}) => {
  const hasInteractive = project.id === 'hangman-game' || project.id === 'movie-recommender';

  return (
    <article className="flex flex-col bg-[#0E0E0E] border border-white/15 hover:border-white/35 transition-all overflow-hidden group">
      {/* Ledger Header */}
      <div className="p-4 sm:p-5 flex flex-col gap-2 bg-white/[0.02] border-b border-white/10">
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase tracking-[0.25em] font-semibold">
            {project.number} · {project.category}
          </span>
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider uppercase text-white/50 px-2 py-0.5 bg-white/[0.04] border border-white/10">
            {project.status}
          </span>
        </div>

        <h2 className="font-['Syne'] text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#F27D26] transition-colors">
          {project.title}
        </h2>

        <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-white/50 leading-relaxed flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech, i) => (
            <span key={tech} className="inline-flex items-center">
              <span>{tech}</span>
              {i < project.technologies.length - 1 && (
                <span className="text-white/20 mx-1">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Media Visual Container (If Image Available) */}
      {project.image && (
        <div
          onClick={() => onOpenDetails(project)}
          className="relative w-full aspect-[16/9] bg-[#080808] cursor-pointer overflow-hidden border-b border-white/10 group/media"
        >
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            className="w-full h-full object-cover object-top opacity-95 group-hover/media:opacity-100 group-hover/media:scale-[1.01] transition-all duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-2.5 left-2.5 bg-[#080808]/95 border border-white/20 px-2.5 py-1">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase tracking-[0.2em] font-semibold">
              {project.status}
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5 bg-[#0E0E0E]/90 border border-white/20 px-2 py-1 flex items-center gap-1.5 opacity-0 group-hover/media:opacity-100 transition-opacity">
            <Layers className="w-3 h-3 text-[#F27D26]" />
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest text-white uppercase">
              EXPAND GALLERY
            </span>
          </div>
        </div>
      )}

      {/* Ledger Body Content */}
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        {/* Highlight Feature Bar */}
        <div className="bg-[#141414] p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <Bolt className="w-4 h-4 text-[#F27D26] shrink-0" />
            <span className="font-['JetBrains_Mono'] text-[11px] text-white uppercase tracking-wider font-medium">
              {project.statusBadge}
            </span>
          </div>
        </div>

        {/* Narrative / Engineering Bullets */}
        <ul className="flex flex-col gap-2.5 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/80 font-light">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="font-['JetBrains_Mono'] text-[#F27D26] text-xs mt-0.5 shrink-0">
                ↳
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Key Metrics Sub-Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#141414] px-2.5 py-1.5 border border-white/10 flex flex-col"
            >
              <span className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest">
                {m.label}
              </span>
              <span className="font-['JetBrains_Mono'] text-[12px] font-semibold text-white">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/15">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary External Link / Deployed URL */}
            {project.primaryLink && (
              <a
                href={project.primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#F27D26]/15 hover:bg-[#F27D26] text-white hover:text-[#080808] border border-[#F27D26]/50 transition-all font-semibold"
                title={`Open deployed application at ${project.primaryLink.url}`}
              >
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] uppercase font-bold">
                  {project.primaryLink.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Interactive Simulation Launcher */}
            {hasInteractive && onLaunchInteractive && (
              <button
                onClick={() => onLaunchInteractive(project)}
                className="flex items-center gap-2 px-3 py-2 bg-[#F27D26] text-[#080808] hover:bg-[#FF9142] border border-[#F27D26] transition-all font-bold"
              >
                <Play className="w-3.5 h-3.5" />
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] uppercase font-bold">
                  RUN SIMULATION
                </span>
              </button>
            )}

            {/* Project Details */}
            <button
              onClick={() => onOpenDetails(project)}
              className="flex items-center gap-1.5 px-2.5 py-2 text-white/60 hover:text-white text-[10px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] hover:underline"
            >
              <Terminal className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>PROJECT DETAILS</span>
            </button>
          </div>

          {/* Target Host Note / Link */}
          {project.primaryLink && (
            <a
              href={project.primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['JetBrains_Mono'] text-[10px] text-white/50 hover:text-[#F27D26] tracking-wider truncate max-w-[200px] transition-colors"
              title={project.primaryLink.url}
            >
              {project.primaryLink.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
