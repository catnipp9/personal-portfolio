"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Assuming these assets are correctly pathed in your Next.js project
import placeholder1Asset from '@/app/assets/img/adventurecat.jpeg';
import placeholder2Asset from '@/app/assets/img/bowcat.jpg';
import placeholder3Asset from '@/app/assets/img/questcat.jpg';

export const AboutMe = () => {
  const resumeUrl = '/resume/Hadjirasul - Resume.pdf'; // Ensure this path is correct
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Start animation when the section is at least 10% visible
          const timer = setTimeout(() => {
            setIsLoaded(true);
          }, 100); // Small delay before starting animation
          observer.unobserve(entry.target); // Stop observing once triggered
          return () => clearTimeout(timer); // Cleanup timer
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      // Cleanup observer on component unmount
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Base classes for row animations
  const rowAnimationBaseClasses = "transition-all duration-1000 ease-out";
  // Initial (hidden) state for rows
  const rowInitialStateClasses = "opacity-0 translate-y-5";
  // Loaded (visible) state for rows
  const rowLoadedStateClasses = "opacity-100 translate-y-0";

  // Tailwind delay classes for staggered animation. Ensure Tailwind is configured to include these.
  // If not, you might need to define custom CSS for these delays.
  const delay200 = "delay-200"; // Corresponds to transition-delay: 200ms;
  const delay400 = "delay-400"; // Corresponds to transition-delay: 400ms;
  const delay450 = "delay-[450ms]"; // Custom delay if not standard

  return (
    <section className="about-me" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">A Little More About Me</h2>

        {/* Row 1: My Journey */}
      <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? rowLoadedStateClasses : rowInitialStateClasses}`}>
        <div className="col-md-6 about-image-col order-1 order-md-1">
          <Image
            src={placeholder1Asset} // Replace with your actual image asset
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
            src={placeholder2Asset} // Replace with your actual image asset
            alt="An image symbolizing core skills or a project showcasing them"
            width={600}
            height={400}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-1">
          <h3>My Superpowers &amp; Gadgets</h3>
          <p>
            My utility belt is packed with skills in <span className="creative-text">full-stack wizardry</span>, <span className="creative-text">UI/UX enchantments</span>, and <span className="creative-text">cloud sorcery</span>, and I'm a <span className="creative-text">master of artifacts</span> like React, Node.js, and Git.
            As a team player in any fellowship, I enjoy turning complex challenges into user-friendly, super-charged applications by understanding the <span className="creative-text">ancient 'why'</span> of each feature.
          </p>
        </div>
      </div>

      {/* Row 3: Aspirations & Goals */}
      <div className={`row about-row align-items-center ${rowAnimationBaseClasses} ${isLoaded ? `${rowLoadedStateClasses} ${delay400}` : rowInitialStateClasses}`}>
        <div className="col-md-6 about-image-col order-1 order-md-1">
          <Image
            src={placeholder3Asset} // Replace with your actual image asset
            alt="An image representing future goals or aspirations"
            width={600}
            height={400}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6 about-text-col d-flex flex-column justify-content-center order-2 order-md-2">
          <h3>The Next Quest Log</h3>
          <p>
            I'm eager to level up my expertise in the <span className="creative-text">ancient arts of AI</span> and building <span className="creative-text">interdimensional scalable systems</span> and join <span className="creative-text">crusades that make a real difference</span>. New challenges that push my limits are always welcome!
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