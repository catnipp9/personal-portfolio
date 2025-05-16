"use client";

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

// Import local images from the assets folder
// Ensure these paths and file extensions are correct.
import placeholder1Asset from '@/app/assets/img/placeholder1.jpeg'; 
import placeholder2Asset from '@/app/assets/img/placeholder2.jpeg';
import placeholder3Asset from '@/app/assets/img/placeholder3.jpeg';

export const AboutMe = () => {
  const resumeUrl = '/resume/Hadjirasul - Resume.pdf'; // Ensure this path is correct in your public folder

  return (
    <section className="about-me" id="about">
      <div className="container">
        <h2 className="section-title">A Little More About Me</h2>

        {/* Row 1: Left Picture, Right Text */}
        <div className="row about-row align-items-center">
          <div className="col-md-6 about-image-col">
            <Image 
              src={placeholder1Asset} // Use imported local asset
              alt="My Journey So Far" 
              width={600} // Adjust to your image's actual width
              height={400} // Adjust to your image's actual height
              className="img-fluid rounded" 
            />
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center">
            <h3>My Journey</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="row about-row align-items-center">
          <div className="col-md-6 about-text-col order-md-first d-flex flex-column justify-content-center"> 
            <h3>Core Strengths &amp; Skills</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="col-md-6 about-image-col order-md-last">
            <Image 
              src={placeholder2Asset} 
              alt="My Core Skills" 
              width={600} 
              height={400} 
              className="img-fluid rounded"
            />
          </div>
        </div>

        <div className="row about-row align-items-center">
          <div className="col-md-6 about-image-col">
            <Image 
              src={placeholder3Asset} 
              alt="Future Aspirations" 
              width={600}
              height={400} 
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center">
            <h3>Aspirations &amp; Goals</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="row resume-button-row">
          <div className="col-12 text-center">
            <a href={resumeUrl} className="resume-button" download="Jamel_Hadjirasul_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download My Resume
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

// export default AboutMe;
