import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { PagePagination } from '../components/PagePagination';

export const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <ContactSection />
      <PagePagination prevPage="skills" prevLabel="SKILLS MATRIX" nextPage="home" nextLabel="PORTAL HOME" />
    </div>
  );
};
