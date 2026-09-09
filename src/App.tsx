/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveHangman } from './components/InteractiveHangman';
import { InteractiveRecommender } from './components/InteractiveRecommender';
import { ResumeModal } from './components/ResumeModal';
import { RouterProvider, useRouter } from './router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EducationPage } from './pages/EducationPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { Project } from './types';

function PortfolioShell() {
  const { currentPage } = useRouter();
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

  const renderActivePage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onOpenResume={() => setShowResumeModal(true)} />;
      case 'education':
        return <EducationPage />;
      case 'projects':
        return (
          <ProjectsPage
            onOpenDetails={(p) => setSelectedProject(p)}
            onLaunchInteractive={handleLaunchInteractive}
          />
        );
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage
            onOpenResume={() => setShowResumeModal(true)}
            onOpenDetails={(p) => setSelectedProject(p)}
            onLaunchInteractive={handleLaunchInteractive}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col antialiased selection:bg-[#F27D26] selection:text-[#080808]">
      {/* Fixed Architectural Header */}
      <Header onOpenResume={() => setShowResumeModal(true)} />

      {/* Main Multi-Page Canvas with Breathing Room */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive Project Spec Modal (Global) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onLaunchInteractive={handleLaunchInteractive}
        />
      )}

      {/* Interactive Hangman CLI Simulator (Global) */}
      {showHangmanSim && (
        <InteractiveHangman onClose={() => setShowHangmanSim(false)} />
      )}

      {/* Interactive Movie Recommender Simulator (Global) */}
      {showRecommenderSim && (
        <InteractiveRecommender onClose={() => setShowRecommenderSim(false)} />
      )}

      {/* ATS Technical Dossier / Resume Modal (Global) */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <PortfolioShell />
    </RouterProvider>
  );
}

// Add body class control to prevent scrolling when modals are open
if (typeof window !== 'undefined') {
  const originalBodyOverflow = document.body.style.overflow;
  const originalBodyTop = document.body.style.top;
  let lockedScrollY = 0;

  const enableBodyScroll = () => {
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.top = originalBodyTop;
    document.body.classList.remove('modal-open');
    window.scrollTo({ top: lockedScrollY, behavior: 'instant' });
  };

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add('modal-open');
  };

  // Track modal state
  let modalOpenCount = 0;

  const closeAllModals = () => {
    if (modalOpenCount > 0) {
      modalOpenCount = 0;
      enableBodyScroll();
    }
  };

  const closeModal = () => {
    if (modalOpenCount > 0) {
      modalOpenCount--;
      if (modalOpenCount === 0) {
        enableBodyScroll();
      }
    }
  };

  const openModal = () => {
    if (modalOpenCount === 0) {
      lockedScrollY = window.scrollY;
    }
    modalOpenCount++;
    disableBodyScroll();
  };

  const isModalOpen = () => modalOpenCount > 0;

  // Export for use in components
  (window as any).PortfolioScrollControl = {
    enableBodyScroll,
    disableBodyScroll,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
  };

  // Add CSS for modal-open class to prevent scrolling
  const style = document.createElement('style');
  style.textContent = `
    body.modal-open {
      overflow: hidden !important;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  `;
  document.head.appendChild(style);

  // Cleanup on page unload
  window.addEventListener('beforeunload', closeAllModals);
}
