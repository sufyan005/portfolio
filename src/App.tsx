/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveHangman } from './components/InteractiveHangman';
import { InteractiveRecommender } from './components/InteractiveRecommender';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { BottomDock } from './components/BottomDock';
import { ResumeModal } from './components/ResumeModal';
import { PROJECTS, PERSONAL_INFO } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showHangmanSim, setShowHangmanSim] = useState(false);
  const [showRecommenderSim, setShowRecommenderSim] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleLaunchInteractive = (project: Project) => {
    if (project.id === 'hangman-game') {
      setShowHangmanSim(true);
    } else if (project.id === 'movie-recommender') {
      setShowRecommenderSim(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col antialiased selection:bg-[#F27D26] selection:text-[#080808]">
      {/* Fixed Architectural Header */}
      <Header onOpenResume={() => setShowResumeModal(true)} />

      {/* Main Portfolio Canvas */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-28 sm:pb-32">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <AboutSection onOpenResume={() => setShowResumeModal(true)} />

        {/* Academic Chronology & Education */}
        <EducationSection />

        {/* Featured Projects Section */}
        <section id="projects" className="flex flex-col gap-6 pt-12 pb-16 border-t border-white/20 scroll-mt-[4.5rem] sm:scroll-mt-20">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
              <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                FEATURED PROJECTS
              </h2>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
                [05 PROJECTS]
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-white/50 uppercase">
              ENGINEERING &amp; ML
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
                onLaunchInteractive={handleLaunchInteractive}
              />
            ))}
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Transmission & Contact Section */}
        <ContactSection />
      </main>

      {/* Floating Ergonomic Bottom Dock */}
      <BottomDock />

      {/* Interactive Project Spec Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onLaunchInteractive={handleLaunchInteractive}
        />
      )}

      {/* Interactive Hangman CLI Simulator */}
      {showHangmanSim && (
        <InteractiveHangman onClose={() => setShowHangmanSim(false)} />
      )}

      {/* Interactive Movie Recommender Simulator */}
      {showRecommenderSim && (
        <InteractiveRecommender onClose={() => setShowRecommenderSim(false)} />
      )}

      {/* ATS Technical Dossier / Resume Modal */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
    </div>
  );
}

