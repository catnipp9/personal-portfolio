"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaCogs, FaDatabase, FaTools, FaMicrochip } from 'react-icons/fa';

const softwareSkillGroups = [
  {
    groupTitle: "Language", 
    icon: <FaCode className="icon text-blue-500" />, 
    items: ["JavaScript", "C++", "Java", "C#", "HTML"  ]
  },
  {
    groupTitle: "Framework/Library", 
    icon: <FaCogs className="icon text-green-500" />, 
    items: ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap"] 
  },
  {
    groupTitle: "Database", 
    icon: <FaDatabase className="icon text-yellow-500" />, 
    items: ["Appwrite", "MySQL", "Microsoft Azure SQL", "Firebase"] 
  },
  {
    groupTitle: "Tools & Platforms",
    icon: <FaTools className="icon text-red-500" />, 
    items: ["Git & GitHub", "Docker (Basic)", "VS Code", "Visual Studio"]
  }
];

const hardwareSkillsData = {
  categoryTitle: "Hardware & Embedded Systems", 
  icon: <FaMicrochip className="icon text-purple-400" />, 
  items: ["Arduino", "Raspberry Pi", "Circuit Design", "Microcontrollers", "Soldering", "Prototyping", "IoT Concepts", "Sensors", "PCB Design", "Breadboarding"] // Added one more
};

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('software'); 
  
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
      { threshold: 0.05 } 
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []);

  const animationBase = "transition-all duration-700 ease-out";
  const animationInitial = "opacity-0 translate-y-6"; 
  const animationVisible = "opacity-100 translate-y-0";

  return (
    <section 
      className="skills-section-custom skills" 
      id="skills" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4"> 
        <div
          className={`text-center mb-12 md:mb-16 ${animationBase} ${
            isVisible ? animationVisible : animationInitial
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Skills &amp; Proficiencies</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto"> 
            Explore my technical capabilities across software and hardware domains.
          </p>
        </div>

        {/* Tab Buttons Container - Uses CSS class for styling and gap */}
        <div className={`skill-tabs-container mb-16 md:mb-20 ${animationBase} ${isVisible ? `${animationVisible} delay-150` : animationInitial}`}>
          <button
            onClick={() => setActiveTab('software')}
            className={`skill-tab-button ${activeTab === 'software' ? 'skill-tab-active' : 'skill-tab-inactive'}`}
          >
            Software Skills
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`skill-tab-button ${activeTab === 'hardware' ? 'skill-tab-active' : 'skill-tab-inactive'}`}
          >
            Hardware Skills
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[280px] md:min-h-[350px]"> {/* Adjusted min-height */}
          
          {/* Software Skills Content - Card Layout */}
          {activeTab === 'software' && (
            <div>
              {/* Grid for the first row of cards (up to 3) */}
              <div className={`software-skills-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10 ${animationBase} ${isVisible ? `${animationVisible} delay-300` : animationInitial}`}> {/* Adjusted gap and mb */}
                {softwareSkillGroups.slice(0, 3).map((group, groupIndex) => ( 
                  <div 
                    key={group.groupTitle} 
                    className={`software-skill-card 
                                ${animationBase} ${isVisible ? `${animationVisible} delay-[${300 + groupIndex * 100}ms]` : animationInitial}`}
                    style={{ transitionDelay: isVisible ? `${300 + groupIndex * 100}ms` : '0ms' }}
                  >
                    <div className="card-header">
                      {group.icon}
                      <h3>{group.groupTitle}</h3>
                    </div>
                    <hr />
                    <ul className="mt-3 software-skill-list"> 
                      {group.items.map((skill) => (
                        <li key={skill}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Container for the centered "Tools & Platforms" card */}
              {softwareSkillGroups.length > 3 && ( 
                <div className={`flex justify-center mt-8 md:mt-10 ${animationBase} ${isVisible ? `${animationVisible} delay-[${300 + 3 * 100}ms]` : animationInitial}`} // Increased mt for more gap
                     style={{ transitionDelay: isVisible ? `${300 + 3 * 100}ms` : '0ms' }}>
                  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[calc(33.3333%-1.33rem)] xl:w-[calc(33.3333%-1.66rem)]"> {/* Attempt to match grid cell width by accounting for gap, adjust if needed */}
                     <div key={softwareSkillGroups[3].groupTitle} className="software-skill-card">
                        <div className="card-header">
                          {softwareSkillGroups[3].icon}
                          <h3>{softwareSkillGroups[3].groupTitle}</h3>
                        </div>
                        <hr />
                        <ul className="mt-3 software-skill-list">
                          {softwareSkillGroups[3].items.map((skill) => (
                            <li key={skill}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hardware Skills Content - Pill Layout */}
          {activeTab === 'hardware' && (
            <div 
              className={`hardware-skills-container p-6 md:p-8 rounded-xl shadow-lg ${animationBase} ${
                isVisible ? `${animationVisible} delay-300` : animationInitial
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-cyan-300 flex items-center justify-center"> 
                {hardwareSkillsData.icon}
                {hardwareSkillsData.categoryTitle}
              </h3>
              <div className="hardware-skills-grid"> 
                {hardwareSkillsData.items.map((skill) => (
                  <span key={skill} className="skill-pill hardware-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
