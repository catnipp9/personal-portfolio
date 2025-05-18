"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import placeholder1Asset from '@/app/assets/img/adventurecat.jpeg';
import placeholder2Asset from '@/app/assets/img/bowcat.jpg';
import placeholder3Asset from '@/app/assets/img/questcat.jpg';

export const AboutMe = () => {
  const resumeUrl = '/resume/Hadjirasul - Resume.pdf';
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsLoaded(true);
          }, 100);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, 
      }
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


  const rowAnimationBaseClasses = "transition-all duration-1000 ease-out";
  const rowInitialStateClasses = "opacity-0 translate-y-5";
  const rowLoadedStateClasses = "opacity-100 translate-y-0";

  const delay200 = "delay-200";
  const delay400 = "delay-400";
  const delay450 = "delay-[450ms]";

  const titleAnimationBaseClasses = "transition-all duration-700 ease-out"; 
  const titleInitialStateClasses = "opacity-0 translate-y-4"; 
  const titleLoadedStateClasses = "opacity-100 translate-y-0";


  return (
    <section className="about-me" id="about" ref={sectionRef}>
      <div className="container">
        <h2
          className={`section-title ${titleAnimationBaseClasses} ${
            isLoaded ? titleLoadedStateClasses : titleInitialStateClasses
          }`}
        >
          A Little More About Me
        </h2>

        {/* Row 1: My Journey */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? rowLoadedStateClasses : rowInitialStateClasses}`}>
          <div className="col-md-6 about-image-col order-1 order-md-1">
            <Image
              src={placeholder1Asset}
              alt="A visual representation of my journey or a key starting point"
              width={600}
              height={400}
              className="img-fluid rounded shadow-lg"
              priority
            />
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-2">
            <h3>Level 1: The Adventure Begins!</h3>
            <p>
              My tech quest kicked off with a spark of curiosity for the magic of web development, and I was instantly hooked by its power to solve puzzles and build cool stuff.
              Epic projects since then have leveled up my skills in <span className="creative-text">collaborative boss battles like team coding and problem-solving</span> and forged my resolve to craft <span className="creative-text">legendary solutions</span>.
            </p>
          </div>
        </div>

        {/* Row 2: Core Strengths & Skills */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} ${delay200}` : rowInitialStateClasses}`}>
          <div className="col-md-6 about-image-col order-1 order-md-2">
            <Image
              src={placeholder2Asset}
              alt="An image symbolizing core skills or a project showcasing them"
              width={600}
              height={400}
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-1">
            <h3>My Superpowers &amp; Gadgets</h3>
            <p>
              My utility belt is packed with skills in <span className="creative-text">full-stack wizardry</span>, <span className="creative-text">UI/UX enchantments</span>, and <span className="creative-text">cloud sorcery</span>, and I&apos;m a <span className="creative-text">master of artifacts</span> like React, Node.js, and Git.
              As a team player in any fellowship, I enjoy turning complex challenges into user-friendly, super-charged applications by understanding the <span className="creative-text">ancient &apos;why&apos;</span> of each feature.
            </p>
          </div>
        </div>

        {/* Row 3: Aspirations & Goals */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} ${delay400}` : rowInitialStateClasses}`}>
          <div className="col-md-6 about-image-col order-1 order-md-1">
            <Image
              src={placeholder3Asset}
              alt="An image representing future goals or aspirations"
              width={600}
              height={400}
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-2">
            <h3>The Next Quest Log</h3>
            <p>
              I&apos;m eager to level up my expertise in the <span className="creative-text">ancient arts of AI</span> and building <span className="creative-text">interdimensional scalable systems</span> and join <span className="creative-text">crusades that make a real difference</span>. New challenges that push my limits are always welcome!
              My <span className="creative-text">ultimate legendary quest</span> is to <span className="creative-text">lead a guild of master crafters</span> in software development, all while <span className="creative-text">collecting new powerful technologies</span>.
            </p>
          </div>
        </div>

        {/* Resume Button Row */}
        <div className={`row resume-button-row ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} ${delay450}` : rowInitialStateClasses}`}>
          <div className="col-12 text-center">
            <a href={resumeUrl} className="resume-button" download="Jamel_Hadjirasul_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-download resume-button-icon" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};