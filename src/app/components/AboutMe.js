import React from 'react';
// Make sure to have placeholder images in your assets folder or use a service like placehold.co
// import aboutImage1 from '../assets/img/about-image-1.jpg';
// import aboutImage2 from '../assets/img/about-image-2.jpg';
// import aboutImage3 from '../assets/img/about-image-3.jpg';

export const AboutMe = () => {
  // Placeholder image URLs - replace with your actual images or imports
  const placeholderImg1 = 'https://placehold.co/600x400/33363D/FFFFFF?text=My+Journey';
  const placeholderImg2 = 'https://placehold.co/600x400/3A3D42/FFFFFF?text=My+Skills';
  const placeholderImg3 = 'https://placehold.co/600x400/42454A/FFFFFF?text=My+Goals';
  

  const resumeUrl = '/resume/Hadjirasul - Resume.pdf';

  return (
    <section className="about-me" id="about">
      <div className="container">
        <h2 className="section-title">A Little More About Me</h2>

        {/* Row 1: Left Picture, Right Text */}
        <div className="row about-row">
          <div className="col-md-6 about-image-col">
            <img src={placeholderImg1} alt="My Journey So Far" />
            {/* <img src={aboutImage1} alt="My Journey So Far" /> */}
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center">
            <h3>My Journey</h3>
            <p>
              From the moment I wrote my first line of "Hello, World!", I was captivated by the power of code. 
              My academic path in Computer Engineering has been a thrilling exploration of both hardware and software, 
              constantly pushing me to learn and adapt.
            </p>
            <p>
              I've tackled various projects, from simple scripts to more complex system designs, each one teaching me
              valuable lessons in perseverance, problem-solving, and the art of debugging at 2 AM.
            </p>
          </div>
        </div>

        {/* Row 2: Left Text, Right Picture */}
        <div className="row about-row">
          <div className="col-md-6 about-text-col order-md-first d-flex flex-column justify-content-center"> {/* order-md-first to ensure text is on left for md and up */}
            <h3>Core Strengths & Skills</h3>
            <p>
              I consider myself a quick learner with a strong analytical mindset. I'm proficient in Java, Javascript, C++
              and have hands-on experience with [mention 1-2 frameworks/tools, e.g., Git, basic web development].
            </p>
            <p>
              Beyond technical skills, I value clear communication, teamwork, and a proactive approach to overcoming obstacles. 
              I believe that the best solutions come from diverse perspectives and collaborative effort.
            </p>
          </div>
          <div className="col-md-6 about-image-col order-md-last">  {/* order-md-last to ensure image is on right for md and up */}
            <img src={placeholderImg2} alt="My Core Skills" />
            {/* <img src={aboutImage2} alt="My Core Skills" /> */}
          </div>
        </div>

        {/* Row 3: Left Picture, Right Text */}
        <div className="row about-row">
          <div className="col-md-6 about-image-col">
            <img src={placeholderImg3} alt="Future Aspirations" />
            {/* <img src={aboutImage3} alt="Future Aspirations" /> */}
          </div>
          <div className="col-md-6 about-text-col d-flex flex-column justify-content-center">
            <h3>Aspirations & Goals</h3>
            <p>
              Looking ahead, I'm excited to contribute to innovative projects that leverage technology to solve real-world problems.
              I'm particularly interested in [mention a field like AI, IoT, Cybersecurity, or Web/Mobile App Development].
            </p>
            <p>
              My goal is to continuously expand my skillset, embrace new challenges, and grow into a well-rounded software developer
              who can make a tangible impact.
            </p>
          </div>
        </div>

        {/* Row 4: Button for Downloading Resume */}
        <div className="row resume-button-row">
          <div className="col-12">
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
