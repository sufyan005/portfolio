import React from 'react';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { PagePagination } from '../components/PagePagination';

export const SkillsPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SkillsMatrix />
      <PagePagination prevPage="projects" prevLabel="PROJECTS" nextPage="contact" nextLabel="CONTACT" />
    </div>
  );
};
