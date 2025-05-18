"use client";

import React from 'react';
import Image from 'next/image';

const ModalSection = ({ title, children, className = "" }) => (
  <div className={`mb-3 sm:mb-4 ${className}`}> 
      {title && <h3 className="text-md sm:text-lg font-semibold text-cyan-500 mb-2 sm:mb-3">{title}</h3>}
      {children}
  </div>
);

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
      return null;
  }

  const handleModalContentClick = (e) => {
      e.stopPropagation();
  };

  return (
      <div
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 transition-opacity duration-300 ease-in-out"
        onClick={onClose} 
        style={{ opacity: isOpen ? 1 : 0 }} 
        aria-modal="true"
        role="dialog"
      >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full
                    flex flex-col overflow-hidden
                    transform transition-all duration-300 ease-in-out mt-5"
        style={{
        maxHeight: 'calc(100vh - 4rem)', 
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        opacity: isOpen ? 1 : 0, 
        }}
        onClick={handleModalContentClick} 
        aria-labelledby="project-modal-title"
      >
            <div className="flex-shrink-0 pt-4 pb-3 sm:pt-5 sm:pb-4 px-5 sm:px-6 border-b border-gray-700 relative">
                <div className="flex justify-between items-center">
                    <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-slate-100 pr-10">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-4xl leading-none p-1"
                        aria-label="Close modal"
                        >
                        &times; 
                    </button>
                </div>
            </div>

            <div className="flex-grow p-4 sm:p-5 overflow-y-auto">

            {(project.modalImageUrl || project.imageUrl) && (
                <ModalSection className="image-section">
                    <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden shadow-md">
                        <Image
                        src={project.modalImageUrl || project.imageUrl} 
                        alt={`${project.title} screenshot`}
                        layout="fill"
                        objectFit="contain"
                        onError={(e) => { console.error('Modal Image loading error:', e.target.src); }} 
                        />
                    </div>
                </ModalSection>
            )}

                <ModalSection title="Description" className="description-section">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {project.fullDescription || project.description} 
                    </p>
                </ModalSection>

            {project.role && (
                <ModalSection title="My Role" className="role-section">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {project.role}
                    </p>
                </ModalSection>
            )}

                <ModalSection
                    title="Technologies Used"
                    className="technologies-section !mb-1 sm:!mb-2" 
                >
                    <div className="flex flex-wrap gap-2"> 
                    {project.tags && project.tags.map(tag => (
                        <span key={tag} className="project-tag"> 
                        </span>
                    ))}
                    </div>
                </ModalSection>
            </div>

            {(project.projectLink && project.projectLink !== "#" || project.repoLink && project.repoLink !== "#") && (
            <div className="flex-shrink-0 p-4 sm:p-5 border-t border-gray-700 links-section">
                <h3 className="text-md sm:text-lg font-semibold text-cyan-500 mb-2 sm:mb-3 text-center sm:text-left">Links</h3>
                <div className="project-links flex flex-wrap justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-3">

                {project.projectLink && project.projectLink !== "#" && (
                    <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-button-modal"
                    >
                    View Live
                    </a>
                )}

                {project.repoLink && project.repoLink !== "#" && (
                    <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-button-modal" 
                    >
                    View Code
                    </a>
                )}
                
                </div>
            </div>
            )}
        </div>
      </div>
  );
};

export default ProjectDetailModal;
