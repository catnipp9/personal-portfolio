"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; 

import placeholder1Asset from '@/app/assets/img/placeholder1.jpeg'; 
import placeholder2Asset from '@/app/assets/img/placeholder2.jpeg';
import placeholder3Asset from '@/app/assets/img/placeholder3.jpeg';

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
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.1, 
      }
    );

    const currentSectionRef = sectionRef.current; // Capture current value for cleanup
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  const rowAnimationBaseClasses = "transition-all duration-1000 ease-out";
  const rowInitialStateClasses = "opacity-0 translate-y-5";
  const rowLoadedStateClasses = "opacity-100 translate-y-0";

  return (
    <section className="about-me" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">A Little More About Me</h2>

        {/* Row 1: Mobile: Image (top), Text (bottom). Desktop: Image (left), Text (right) */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? rowLoadedStateClasses : rowInitialStateClasses}`}>
          {/* Image Column: order-1 for mobile (top), order-md-1 for desktop (left) */}
          <div className="col-md-6 about-image-col order-1 order-md-1">
            <Image 
              src={placeholder1Asset} 
              alt="My Journey So Far" 
              width={600} 
              height={400} 
              className="img-fluid rounded" 
            />
          </div>
          {/* Text Column: order-2 for mobile (bottom), order-md-2 for desktop (right) */}
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-2">
            <h3>My Journey</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Row 2: Mobile: Image (top), Text (bottom). Desktop: Text (left), Image (right) */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} delay-200` : rowInitialStateClasses}`}>
          {/* Image Column: order-1 for mobile (top), order-md-2 for desktop (right) */}
          <div className="col-md-6 about-image-col order-1 order-md-2">
            <Image 
              src={placeholder2Asset} 
              alt="My Core Skills" 
              width={600} 
              height={400} 
              className="img-fluid rounded"
            />
          </div>
          {/* Text Column: order-2 for mobile (bottom), order-md-1 for desktop (left) */}
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-1"> 
            <h3>Core Strengths &amp; Skills</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Row 3: Mobile: Image (top), Text (bottom). Desktop: Image (left), Text (right) */}
        <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} delay-400` : rowInitialStateClasses}`}>
          {/* Image Column: order-1 for mobile (top), order-md-1 for desktop (left) */}
          <div className="col-md-6 about-image-col order-1 order-md-1">
            <Image 
              src={placeholder3Asset} 
              alt="Future Aspirations" 
              width={600}
              height={400} 
              className="img-fluid rounded"
            />
          </div>
          {/* Text Column: order-2 for mobile (bottom), order-md-2 for desktop (right) */}
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-2">
            <h3>Aspirations &amp; Goals</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className={`row resume-button-row ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} delay-450` : rowInitialStateClasses}`}>
          <div className="col-12 text-center">
            <a href={resumeUrl} className="resume-button" download="Jamel_Hadjirasul_Resume.pdf" target="_blank" rel="noopener noreferrer">
              {/* Icon added before text */}
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

// export default AboutMe;
