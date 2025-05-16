"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; 

import placeholder1Asset from '@/app/assets/img/placeholder1.jpeg'; 
import placeholder2Asset from '@/app/assets/img/placeholder2.jpeg';
import placeholder3Asset from '@/app/assets/img/placeholder3.jpeg';

const projectData = [
  {
    id: 1,
    title: "OptiCare", 
    description: "A centralized web application designed for optometry clinics to simplify patient record management and appointment scheduling.",
    imageUrl: placeholder1Asset, 
    tags: ["Next.js", "Tailwind CSS", "Web App", "JavaScript", "Firebase"],
    projectLink: "#", 
    repoLink: "#" 
  },
  {
    id: 2,
    title: "MentorMatch",
    description: "A mobile app that connects students with mentors, while also allowing qualified individuals to apply and offer mentorship.",
    imageUrl: placeholder2Asset, 
    tags: [".NET MAUI", "C#", "Mobile App", "Microsoft Azure SQL"], 
    projectLink: "#",
    repoLink: "#"
  },
  {
    id: 3,
    title: "Personal Portfolio Website", 
    description: "The very website you are browsing now! Designed to showcase my skills, projects, and journey as a developer.",
    imageUrl: placeholder3Asset, 
    tags: ["Next.js", "Tailwind CSS", "Portfolio", "UI/UX"], 
    projectLink: "#",
    repoLink: "#"
  }
];

const ProjectCard = ({ project, isVisible, delay }) => {
  const animationBase = "transition-all duration-700 ease-out";
  const animationInitial = "opacity-0 translate-y-10 scale-95";
  const animationVisible = "opacity-100 translate-y-0 scale-100";

  const handleCardClick = (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      return;
    }
    console.log(`Card clicked: ${project.title}`);
    if (project.projectLink && project.projectLink !== "#") {
      window.open(project.projectLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`project-card-custom bg-gray-800 rounded-xl shadow-xl overflow-hidden cursor-pointer
                  hover:shadow-2xl hover:-translate-y-1.5 
                  ${animationBase} ${isVisible ? animationVisible : animationInitial}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      onClick={handleCardClick}
    >
      <div className="project-image-container relative w-full h-48 sm:h-56">
        <Image 
          src={project.imageUrl} 
          alt={project.title} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="project-content p-6 flex flex-col flex-grow">
        <h3 className="project-title text-2xl font-semibold mb-2 text-white">{project.title}</h3> 
        <p className="project-description text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="project-tags-container mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links mt-auto flex justify-start space-x-3">
          {project.projectLink && project.projectLink !== "#" && (
            <a 
              href={project.projectLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-button text-sm text-cyan-400 hover:text-cyan-300 font-medium py-1.5 px-3 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200" // Adjusted padding
              onClick={(e) => e.stopPropagation()}
            >
              View Live
            </a>
          )}
          {project.repoLink && project.repoLink !== "#" && (
            <a 
              href={project.repoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-button text-sm text-gray-300 hover:text-white font-medium py-1.5 px-3 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200" // Adjusted padding
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } 
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []);

  const animationBase = "transition-all duration-1000 ease-out";
  const animationInitial = "opacity-0 translate-y-10";
  const animationVisible = "opacity-100 translate-y-0";

  return (
    <section 
      className="projects-section-custom skills-section-custom bg-gray-900 text-white" 
      id="projects" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 md:mb-16 ${animationBase} ${
            isVisible ? animationVisible : animationInitial
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A selection of projects I&apos;ve worked on, showcasing my skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isVisible={isVisible} 
              delay={index * 200} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
