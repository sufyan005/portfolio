import React from 'react';
import { EducationSection } from '../components/EducationSection';
import { PagePagination } from '../components/PagePagination';

export const EducationPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <EducationSection />
      <PagePagination prevPage="about" prevLabel="ABOUT ME" nextPage="projects" nextLabel="PROJECTS" />
    </div>
  );
};
