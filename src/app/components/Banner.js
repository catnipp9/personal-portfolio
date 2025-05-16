"use client"; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import profilePicAsset from '@/app/assets/img/profile-pic2.png';

export const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <section className="banner" id="home">
      <div className="container h-100"> 
        <div className="row align-items-center h-100"> 
          <div className="col-xs-12 col-md-7 col-xl-7 banner-content-left d-flex flex-column justify-content-center">
            <div 
              className={`
                transition-all duration-1000 ease-out 
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
              `}
            >
              <h1>
                {`Hi!, I'm `} 
                <a href="#about" className="banner-name-link" onClick={(e) => {
                  e.preventDefault();
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    const navbarOffset = 75; 
                    const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY - navbarOffset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}> 
                  Jamel Hadjirasul
                </a>
              </h1>
              <h2 className="banner-title">Software Developer</h2>
              <p>
                A driven and detail-oriented Computer Engineering student with a knack for turning caffeine and code into cool, 
                creative solutions—whether it&apos;s building smart systems or just solving life&apos;s little bugs, one line at a time!
              </p>
              <button onClick={() => {
                  console.log('Contact Me button clicked');
                  const contactSection = document.getElementById('connect'); 
                  if (contactSection) {
                    const navbarOffset = 75; 
                    const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY - navbarOffset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
              >
                Contact Me!
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16" style={{ marginLeft: '10px' }}>
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </div>
          </div>

          <div 
            className="col-xs-12 col-md-5 col-xl-5 banner-image-right text-center text-md-end"
          >
            <Image 
              src={profilePicAsset} 
              alt="Jamel P. Hadjirasul - Profile Picture" 
              className="profile-picture-banner" 
              width={400} 
              height={400} 
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
