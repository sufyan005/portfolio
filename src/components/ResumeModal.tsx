import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Body scroll control for modal
    const scrollControl = (window as any).PortfolioScrollControl;
    scrollControl?.openModal();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      scrollControl?.closeModal?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080808]/95 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E0E0E] border border-white/20 shadow-2xl flex flex-col overflow-hidden"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Modal Toolbar */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3.5 bg-[#141414] border-b border-white/15 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-[#F27D26] uppercase font-bold tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap">
              <span id="resume-modal-title">CURRICULUM VITAE</span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-white/50 uppercase font-medium whitespace-nowrap hidden xs:inline">
              · ATS RESUME
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-white/50 whitespace-nowrap hidden md:inline">
              [SUFYAN SIDDIQUI]
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/Sufyan_Siddiqui_Resume.pdf"
              download="Sufyan_Siddiqui_Resume.pdf"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#080808] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/20 text-[10px] sm:text-xs font-['JetBrains_Mono'] uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-[#F27D26] hover:bg-white/[0.05] transition-colors shrink-0"
              aria-label="Close resume dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-white/80 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-white/15 pb-6 space-y-2">
            <h1 className="font-['Syne'] text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#F27D26] tracking-wider uppercase font-semibold">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-['JetBrains_Mono'] text-white/50 pt-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-[#F27D26] transition-colors"
                title={`Send email to ${PERSONAL_INFO.email}`}
              >
                {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F27D26]"
              >
                {PERSONAL_INFO.githubDisplay}
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F27D26]"
              >
                {PERSONAL_INFO.linkedinDisplay}
              </a>
              <span>•</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="font-['JetBrains_Mono'] text-xs font-bold text-[#F27D26] uppercase tracking-[0.2em] border-b border-white/15 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="font-bold text-white">{edu.degree}</h3>
                    <p className="text-white/60 text-xs font-light">{edu.institution}</p>
                    <p className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] tracking-wider mt-0.5 uppercase">
                      {edu.statusLabel}: {edu.statusValue}
                    </p>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-white/50 shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Projects */}
          <div className="space-y-4">
            <h2 className="font-['JetBrains_Mono'] text-xs font-bold text-[#F27D26] uppercase tracking-[0.2em] border-b border-white/15 pb-1">
              SYSTEMS &amp; ENGINEERING PROJECTS
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white">{proj.title}</h3>
                      <span className="font-['JetBrains_Mono'] text-[9px] text-[#F27D26] px-1 bg-[#141414] border border-white/15 uppercase">
                        {proj.status}
                      </span>
                      {proj.primaryLink && (
                        <a
                          href={proj.primaryLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] hover:underline"
                        >
                          [{proj.primaryLink.url}]
                        </a>
                      )}
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs text-white/50">
                      {proj.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-white/60 text-xs font-light">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-3">
            <h2 className="font-['JetBrains_Mono'] text-xs font-bold text-[#F27D26] uppercase tracking-[0.2em] border-b border-white/15 pb-1">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-[#141414] p-3 border border-white/15">
                  <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-white block mb-1">
                    {cat.title}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 tracking-wider">
                    {cat.skills.join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
