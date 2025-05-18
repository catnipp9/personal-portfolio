"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectDetailModal from './ProjectDetailModal'; 

import opticarelogo from '../assets/img/OptiCareLogo.png';
import mentormatchlogo from '../assets/img/MentorMatchLogo.png';
import portfoliologo from '../assets/img/JamelLogo.png';

import opticareModalAsset from '../assets/img/opticareweb.jpeg';
import mentormatchModalAsset from '../assets/img/mentormatch.jpg';
import portfolioModalAsset from '../assets/img/portfolio.jpeg';


const projectData = [
  {
    id: 1,
    title: "OptiCare",
    description: "A centralized web application designed for optometry clinics to simplify patient record management and appointment scheduling.",
    imageUrl: opticarelogo, 
    modalImageUrl: opticareModalAsset, 
    role: "Full Stack Developer",
    tags: ["Next.js", "Tailwind CSS", "Web App", "JavaScript", "Firebase", "UI/UX"],
    projectLink: "https://danledan.vercel.app/",
    repoLink: "https://github.com/SeesonLau/danledan",
    fullDescription: "OptiCare is a web-based platform built with Next.js and Firebase, designed to help optometry clinics manage patient records, appointments, and treatments efficiently. It features a clean UI using Tailwind CSS and supports role-based access for patients, clinics, and optometrists."
  },
  {
    id: 2,
    title: "MentorMatch",
    description: "A mobile app that connects students with mentors, while also allowing qualified individuals to apply and offer mentorship.",
    imageUrl: mentormatchlogo,
    modalImageUrl: mentormatchModalAsset, 
    role: "Full Stack Developer",
    tags: [".NET MAUI", "C#", "Mobile App", "Microsoft Azure SQL", "XAML"],
    repoLink: "https://github.com/SeesonLau/ProjectMentorMatch",
    fullDescription: "MentorMatch is a mobile app built with .NET MAUI that connects students with mentors. Users can sign up as mentees or apply as mentors, with features for matching, communication, and session tracking. It uses Azure SQL for data management and offers a clean, responsive UI built in XAML."
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "The very website you are browsing now! Designed to showcase my skills, projects, and journey as a developer.",
    imageUrl: portfoliologo, 
    modalImageUrl: portfolioModalAsset, 
    role: "Solo Developer & Designer",
    tags: ["Next.js", "Tailwind CSS", "Portfolio", "UI/UX", "Vercel", "Nodemailer"],
    projectLink: "https://jamelh.vercel.app/", 
    repoLink: "https://github.com/catnipp9/my-personal-portfolio",
    fullDescription: "This portfolio website showcases my work as a software developer. Built with Next.js and Tailwind CSS, it features a responsive design and includes a contact form powered by Nodemailer for direct communication. Deployed on Vercel for smooth performance and easy updates."
  }
];


const ProjectCard = ({ project, isVisible, delay, onCardClick }) => {

  const animationBase = "transition-all duration-700 ease-out";
  const animationInitial = "opacity-0 translate-y-10 scale-95";
  const animationVisible = "opacity-100 translate-y-0 scale-100";

  return (
    <div
      className={`project-card-custom group bg-gray-800 rounded-xl shadow-xl overflow-hidden cursor-pointer
                  hover:shadow-2xl hover:-translate-y-1.5  /* Hover effects */
                  ${animationBase} ${isVisible ? animationVisible : animationInitial} /* Apply animation based on visibility */`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }} 
      onClick={() => onCardClick(project)}
      role="button" 
      tabIndex={0}  
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCardClick(project); }} 
    >
     
      <div className="project-image-container relative w-full h-36 sm:h-44 mt-4">
        <Image
          src={project.imageUrl} 
          alt={`${project.title} project screenshot`}
          layout="fill"
          objectFit="contain" 
          className="transition-transform duration-500 group-hover:scale-105" 
          placeholder="blur" 
        />
      </div>
      
      <div className="project-content p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="project-title-on-card text-xl sm:text-2xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="project-description text-gray-300 text-sm mb-4 flex-grow line-clamp-3 sm:line-clamp-4">
          {project.description}
        </p>
       
        <div className="project-tags-container mt-auto pt-2">
          {project.tags.slice(0, 3).map(tag => ( 
            <span key={tag} className="project-tag"> 
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && ( 
            <span className="project-tag-more">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const sectionRef = useRef(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedProject, setSelectedProject] = useState(null); 

  const handleOpenModal = (project) => {
    if (!project) {
      console.error("handleOpenModal called with null project");
      return;
    }
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseModal = React.useCallback(() => { 
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); 
    document.body.style.overflow = 'auto'; 
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true); 
          if (sectionRef.current) { 
            observer.unobserve(sectionRef.current); 
          }
        }
      },
      { threshold: 0.1 } 
    );

    const currentSectionNode = sectionRef.current; 
    if (currentSectionNode) {
      observer.observe(currentSectionNode);
    }

    return () => {
      if (currentSectionNode) {
        observer.unobserve(currentSectionNode);
      }
      observer.disconnect(); 
    };
  }, []); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) { 
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (isModalOpen && document.body.style.overflow === 'hidden') {
         document.body.style.overflow = 'auto';
      }
    };
  }, [isModalOpen, handleCloseModal]); 

  const sectionTitleAnimationBase = "transition-all duration-1000 ease-out";
  const sectionTitleAnimationInitial = "opacity-0 translate-y-10";
  const sectionTitleAnimationVisible = "opacity-100 translate-y-0";

  return (
    <>
      <section
        className="projects-section-custom skills-section-custom bg-gray-900 text-white py-16 md:py-20" 
        id="projects"
        ref={sectionRef} 
      >
        <div className="container mx-auto px-4">

          <div
            className={`text-center mb-12 md:mb-16 ${sectionTitleAnimationBase} ${
              isVisible ? sectionTitleAnimationVisible : sectionTitleAnimationInitial
            }`}
          >
            <h2 className="project-title">My Projects</h2> 
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-5">
                A selection of projects I&apos;ve worked on, showcasing my skills and interests.
              </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projectData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isVisible={isVisible} 
                delay={index * 150}  
                onCardClick={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedProject && ( 
          <ProjectDetailModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            project={selectedProject}
          />
      )}  
    </>
  );
};
