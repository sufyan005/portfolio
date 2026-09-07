import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { PagePagination } from '../components/PagePagination';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsPageProps {
  onOpenDetails: (project: Project) => void;
  onLaunchInteractive: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenDetails,
  onLaunchInteractive,
}) => {
  return (
    <div className="flex flex-col">
      <section id="projects" className="flex flex-col gap-6 pt-6 sm:pt-10 pb-16">
        {/* Section Header */}
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
            <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
              [{PROJECTS.length < 10 ? `0${PROJECTS.length}` : PROJECTS.length} PROJECTS]
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-white/50 uppercase">
            ENGINEERING &amp; ML SYSTEMS
          </span>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
              onLaunchInteractive={onLaunchInteractive}
            />
          ))}
        </div>
      </section>

      <PagePagination prevPage="education" prevLabel="EDUCATION" nextPage="skills" nextLabel="SKILLS" />
    </div>
  );
};
