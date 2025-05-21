"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Code2, Settings2, Database, Wrench, Cpu, ChevronRight } from 'lucide-react';

const softwareSkillGroups = [
  {
    groupTitle: "Language",
    icon: <Code2 className="icon text-sky-500" size={22} />,
    items: ["JavaScript", "C++", "Java", "C#", "HTML"]
  },
  {
    groupTitle: "Framework/Library",
    icon: <Settings2 className="icon text-emerald-500" size={22} />,
    items: ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap"]
  },
  {
    groupTitle: "Database",
    icon: <Database className="icon text-amber-500" size={22} />,
    items: ["Appwrite", "MySQL", "Microsoft Azure SQL", "Firebase"]
  },
  {
    groupTitle: "Tools & Platforms",
    icon: <Wrench className="icon text-rose-500" size={22} />,
    items: ["Git & GitHub", "Docker (Basic)", "VS Code", "Visual Studio"]
  }
];

const hardwareSkillsData = {
  categoryTitle: "Hardware & Embedded Systems",
  icon: <Cpu className="icon text-purple-400" size={26} />,
  items: ["Arduino", "Raspberry Pi", "Circuit Design", "Microcontrollers", "Soldering", "Prototyping", "IoT Concepts", "Sensors", "PCB Design", "Breadboarding"]
};

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('software');
  const [animationTriggerKey, setAnimationTriggerKey] = useState(0);
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
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setAnimationTriggerKey(prevKey => prevKey + 1);
  };

  const animationBase = "transition-all duration-700 ease-out transform";
  const animationInitial = "opacity-0 translate-y-12 scale-90";
  const animationVisible = "opacity-100 translate-y-0 scale-100";

  const softwareCardClasses = `
    software-skill-card tab-item-fade-in
    hover:scale-105 hover:shadow-xl
    transition-transform transition-shadow duration-300 ease-in-out
    cursor-pointer
  `;

  return (
    <section
      className="skills-section-custom"
      id="skills"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div
          className={`section-title ${animationBase} ${
            isVisible ? animationVisible : animationInitial
          }`}
        >
          <h2>Skills &amp; Proficiencies</h2>
          <p>
            Explore my technical capabilities across software and hardware domains.
          </p>
        </div>

        <div className={`skill-tabs-container mb-12 md:mb-16 ${animationBase} ${isVisible ? `${animationVisible} delay-150` : animationInitial}`}>
          <button
            onClick={() => handleTabChange('software')}
            className={`skill-tab-button ${activeTab === 'software' ? 'skill-tab-active' : 'skill-tab-inactive'}`}
          >
            Software Skills
          </button>
          <button
            onClick={() => handleTabChange('hardware')}
            className={`skill-tab-button ${activeTab === 'hardware' ? 'skill-tab-active' : 'skill-tab-inactive'}`}
          >
            Hardware Skills
          </button>
        </div>

        <div className="min-h-[380px] md:min-h-[420px]">

          {activeTab === 'software' && (
            <div key={`software-content-${animationTriggerKey}`}>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10`}>
                {softwareSkillGroups.slice(0, 3).map((group, groupIndex) => (
                  <div
                    key={group.groupTitle}
                    className={softwareCardClasses.trim()}
                    style={{ animationDelay: `${groupIndex * 100}ms` }}
                  >
                    <div className="card-header">
                      {group.icon}
                      <h3>{group.groupTitle}</h3>
                    </div>
                    <hr />
                    <ul className="mt-3 software-skill-list">
                      {group.items.map((skill) => (
                        <li key={skill}>
                          <ChevronRight className="list-icon" size={18} />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {softwareSkillGroups.length > 3 && (
                <div className={`flex justify-center mt-6 md:mt-8`}>
                  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[calc(33.3333%-1rem)]">
                    <div
                      key={softwareSkillGroups[3].groupTitle}
                      className={softwareCardClasses.trim()} 
                      style={{ animationDelay: `${3 * 100}ms` }}
                    >
                      <div className="card-header">
                        {softwareSkillGroups[3].icon}
                        <h3>{softwareSkillGroups[3].groupTitle}</h3>
                      </div>
                      <hr />
                      <ul className="mt-3 software-skill-list">
                        {softwareSkillGroups[3].items.map((skill) => (
                          <li key={skill}>
                            <ChevronRight className="list-icon" size={18} />
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

          {activeTab === 'hardware' && (
            <div
              key={`hardware-content-${animationTriggerKey}`}
              className={`hardware-skills-container p-6 md:p-8 ${animationBase} ${
                isVisible ? `${animationVisible} delay-200` : animationInitial
              }`}
              style={{ transitionDelay: isVisible ? `200ms` : '0ms' }}
            >
              <div className="hardware-title-container">
                {hardwareSkillsData.icon}
                <h3>{hardwareSkillsData.categoryTitle}</h3>
              </div>
              <div className="hardware-skills-grid">
                {hardwareSkillsData.items.map((skill, index) => (
                  <span
                    key={skill}
                    className={`skill-pill hardware-pill tab-item-fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
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

export default Skills;