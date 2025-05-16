"use client"; 

import React, { useState, useEffect } from 'react';
import profilePic from '@/app/assets/img/profile-pic2.png'; // Ensure this path is correct

export const Banner = () => {
  // State to control when animations should be applied
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect to trigger animations after component mounts
  useEffect(() => {
    // Set a short timeout to allow the component to render before starting animations
    // This ensures the transition is visible.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // 100ms delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    // The main section for the banner, with an ID for navigation
    <section className="banner" id="home">
      <div className="container h-100"> 
        {/* Row to align content, ensuring it takes full height */}
        <div className="row align-items-center h-100"> 
          {/* Left column for text content */}
          <div className="col-xs-12 col-md-7 col-xl-7 banner-content-left d-flex flex-column justify-content-center">
            {/* Animated container for text elements */}
            {/*
              - `opacity-0`: Initial state, fully transparent.
              - `transform -translate-y-5`: Initial state, slightly moved up (or down if you prefer).
              - `transition-all duration-1000 ease-out`: Defines the transition properties (all properties, 1s duration, ease-out timing).
              - `${isLoaded ? 'opacity-100 translate-y-0' : ''}`: Target state when loaded, fully opaque and in original position.
            */}
            <div 
              className={`
                transition-all duration-1000 ease-out 
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
              `}
            >
              <h1>
                {`Hi! I'm `}
                {/* Link to the 'about-me' section, styled by global CSS */}
                <a href="#about" className="banner-name-link" onClick={(e) => {
                  e.preventDefault();
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    // Consider navbar offset if you have a fixed navbar
                    const navbarOffset = 75; // Example offset
                    const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY - navbarOffset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}> 
                  Jamel Hadjirasul
                </a>
              </h1>
              {/* Title below the name */}
              <h2 className="banner-title">Software Developer</h2>
              {/* Paragraph describing the person */}
              <p>
                A driven and detail-oriented Computer Engineering student with a knack for turning caffeine and code into cool, 
                creative solutions—whether it's building smart systems or just solving life's little bugs, one line at a time!
              </p>
              {/* Button to scroll to the contact section */}
              <button onClick={() => {
                  console.log('Contact Me button clicked');
                  const contactSection = document.getElementById('connect'); // Assuming 'connect' is the ID of your contact section
                  if (contactSection) {
                    // Consider navbar offset
                    const navbarOffset = 75; // Example offset
                    const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY - navbarOffset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
              >
                Contact Me!
                {/* SVG icon for the button */}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16" style={{ marginLeft: '10px' }}>
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right column for the profile picture */}
          <div 
            className="col-xs-12 col-md-5 col-xl-5 banner-image-right text-center text-md-end"
          >
            {/* Animated image
              - `opacity-0`: Initial state, fully transparent.
              - `transform scale-95`: Initial state, slightly smaller.
              - `transition-all duration-1000 ease-out delay-300`: Defines transition, 1s duration, ease-out timing, with a 300ms delay.
              - `${isLoaded ? 'opacity-100 scale-100' : ''}`: Target state when loaded, fully opaque and original size.
            */}
            <img 
              src={profilePic.src} 
              alt="Jamel P. Hadjirasul - Profile Picture" 
              className={`
                profile-picture-banner 
                transition-all duration-1000 ease-out delay-200 
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
