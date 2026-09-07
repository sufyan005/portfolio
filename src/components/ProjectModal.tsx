import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Bolt, Terminal, Cpu, Database, ChevronRight, Layers, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchInteractive?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onLaunchInteractive,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'architecture'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080808]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E0E0E] border border-white/20 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#141414] border-b border-white/15 flex items-center justify-between">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase tracking-[0.25em] font-semibold">
                {project.number} · {project.category}
              </span>
              <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-white/50 px-2 py-0.5 bg-white/[0.04] border border-white/10">
                {project.status}
              </span>
            </div>
            <h2 className="font-['Syne'] text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#080808] border border-white/20 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/15 bg-white/[0.02] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 sm:px-4 py-2.5 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors border-r border-white/15 flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#0E0E0E] text-[#F27D26] border-t-2 border-t-[#F27D26] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>OVERVIEW</span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 sm:px-4 py-2.5 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors border-r border-white/15 flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-[#0E0E0E] text-[#F27D26] border-t-2 border-t-[#F27D26] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>INTERFACE &amp; ROLES</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 sm:px-4 py-2.5 font-['JetBrains_Mono'] text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors border-r border-white/15 flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-[#0E0E0E] text-[#F27D26] border-t-2 border-t-[#F27D26] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>SYSTEM ARCHITECTURE</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="space-y-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                  PROJECT OVERVIEW
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-white/90 font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Status Banner */}
              <div className="bg-[#141414] p-3.5 border border-white/15 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Bolt className="w-4 h-4 text-[#F27D26]" />
                  <span className="font-['JetBrains_Mono'] text-xs text-white uppercase font-medium">
                    {project.statusBadge}
                  </span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase px-2 py-0.5 bg-[#080808] border border-white/20">
                  {project.status}
                </span>
              </div>

              {/* Technologies Stack */}
              <div className="space-y-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                  STACK &amp; RUNTIMES
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#141414] border border-white/15 text-[11px] font-['JetBrains_Mono'] text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance / System Metrics */}
              <div className="space-y-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                  MEASURED PERFORMANCE
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#141414] border border-white/15 flex flex-col"
                    >
                      <span className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest">
                        {metric.label}
                      </span>
                      <span className="font-['Syne'] text-lg font-black text-[#F27D26]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-3">
                <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                  CORE DELIVERABLES
                </span>
                <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/80 font-light">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#141414] p-2.5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: GALLERY & ROLES */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {project.image && (
                <div className="space-y-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                    PRIMARY PRODUCTION CAPTURE
                  </span>
                  <div className="relative border border-white/20 bg-[#080808] overflow-hidden rounded-md flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto max-h-[600px] object-contain rounded-md"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-3">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                    SYSTEM ROLES &amp; INTERACTIVE PHASES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.gallery.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#141414] border border-white/15 p-4 flex flex-col justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase font-semibold">
                              {item.badge}
                            </span>
                            {item.role && (
                              <span className="font-['JetBrains_Mono'] text-[10px] text-white/60 px-1.5 py-0.5 bg-[#080808] border border-white/20">
                                {item.role}
                              </span>
                            )}
                          </div>
                          <h4 className="font-['Syne'] text-sm font-bold text-white uppercase">
                            {item.title}
                          </h4>
                          <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70 font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 uppercase tracking-[0.25em]">
                  DATA FLOW &amp; ARCHITECTURAL PATTERNS
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-white/70 font-light">
                  Engineered with strict separation of concerns, defensive validation, and optimized throughput:
                </p>
              </div>

              {project.architectureHighlights ? (
                <div className="space-y-3">
                  {project.architectureHighlights.map((arch, idx) => (
                    <div
                      key={idx}
                      className="bg-[#141414] p-4 border border-white/15 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-[#F27D26]" />
                        <h4 className="font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {arch.title}
                        </h4>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        {arch.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#141414] p-4 border border-white/15 text-xs font-['JetBrains_Mono'] text-white/50">
                  Standard architecture specifications aligned with system level guidelines.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#141414] border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {project.primaryLink && (
              <a
                href={project.primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#F27D26] text-[#080808] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#FF9142] transition-colors"
              >
                <span>OPEN {project.primaryLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {(project.id === 'hangman-game' || project.id === 'movie-recommender') && onLaunchInteractive && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchInteractive(project);
                }}
                className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-[#F27D26]/60 text-[#F27D26] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#F27D26] hover:text-[#080808] transition-colors"
              >
                <span>TRY IN-BROWSER SIMULATOR</span>
              </button>
            )}

            {project.primaryLink && (
              <a
                href={project.primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['JetBrains_Mono'] text-xs text-[#F27D26] hover:underline flex items-center gap-1.5"
              >
                <span>{project.primaryLink.url}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-['JetBrains_Mono'] text-white/50 hover:text-white uppercase tracking-wider"
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
