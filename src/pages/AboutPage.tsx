import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { PagePagination } from '../components/PagePagination';

interface AboutPageProps {
  onOpenResume: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResume }) => {
  return (
    <div className="flex flex-col">
      <AboutSection onOpenResume={onOpenResume} />
      <PagePagination prevPage="home" prevLabel="HOME" nextPage="education" nextLabel="EDUCATION" />
    </div>
  );
};
