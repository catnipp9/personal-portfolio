"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const contactDetails = {
    email: "hadjirasuljamel80@gmail.com", 
    phone: "+63 993 1468 969",
    location: "Poblacion Ward 2 Minglanilla, Cebu",
    linkedin: "https://www.linkedin.com/in/jamel-hadjirasul-886a3a2a4/",
    github: "https://github.com/catnipp9"
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(''); 

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setStatusMessage(result.status || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatusMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(''), 7000); 
    }
  };

  const animationBase = "transition-all duration-1000 ease-out";
  const animationInitial = "opacity-0 translate-y-10";
  const animationVisible = "opacity-100 translate-y-0";

  return (
    <section
      className="contact-section-custom skills-section-custom bg-gray-900 text-gray-100 font-sans"
      id="connect"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div
          className={`text-center mb-12 md:mb-16 ${animationBase} ${
            isVisible ? animationVisible : animationInitial
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Have a question, a job offer, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div
            className={`space-y-8 ${animationBase} ${
              isVisible ? `${animationVisible} delay-200` : animationInitial
            }`}
          >
            {/* Email Card */}
            <div className="contact-info-card-container p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                <Mail size={24} className="text-sky-400 flex-shrink-0" />
                Email
              </h3>
              <span className="text-gray-300 break-all block">
                {contactDetails.email}
              </span>
            </div>

            {/* Phone Card */}
            <div className="contact-info-card-container p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center  gap-3">
                <Phone size={24} className="text-sky-400 flex-shrink-0" />
                Phone
              </h3>
              <span className="text-gray-300 block">
                {contactDetails.phone}
              </span>
            </div>

            {/* Location Card */}
            <div className="contact-info-card-container p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                <MapPin size={24} className="text-sky-400 flex-shrink-0" />
                Location
              </h3>
              <span className="text-gray-300 block">{contactDetails.location}</span>
            </div>

            {/* Links Card (LinkedIn & GitHub) */}
            <div className="contact-info-card-container p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <Linkedin size={24} className="text-sky-400 flex-shrink-0" />
                Connect
              </h3>
              <ul className="space-y-4">
               <li className="flex items-center gap-x-3">
                  <Github size={20} className="text-sky-400 flex-shrink-0" />
                  <a
                    href={contactDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors no-underline "
                  >
                    GitHub Profile
                  </a>
                </li>
                <li className="flex items-center gap-x-3">
                  <Linkedin size={20} className="text-sky-400 flex-shrink-0" />
                  <a
                    href={contactDetails.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors no-underline hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`${animationBase} ${
              isVisible ? `${animationVisible} delay-400` : animationInitial
            }`}
          >
            <form onSubmit={handleSubmit} className="contact-form-container space-y-6 p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1 text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm bg-gray-700 border-gray-600 rounded-md p-3 text-gray-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm bg-gray-700 border-gray-600 rounded-md p-3 text-gray-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-300">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm bg-gray-700 border-gray-600 rounded-md p-3 text-gray-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm bg-gray-700 border-gray-600 rounded-md p-3 text-gray-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Your message here..."
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors duration-300 disabled:opacity-50"
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {statusMessage && (
                <p className={`mt-3 text-sm text-center ${statusMessage.toLowerCase().includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;