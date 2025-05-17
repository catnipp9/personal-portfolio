
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import contactImagePlaceholder from '@/app/assets/img/placeholder1.jpeg';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.1 }
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

    // Simulating API call
    console.log("Form Data Submitted: ", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // In a real app, you'd replace this with actual API call logic
    // and handle success/error based on the API response.
    setStatusMessage("Message sent successfully! I'll get back to you soon.");
    setFormData({ fullName: '', email: '', message: '' });
    setIsSubmitting(false);

    setTimeout(() => setStatusMessage(''), 5000);
  };

  const animationBase = "transition-all duration-1000 ease-out";
  const animationInitial = "opacity-0 translate-y-10";
  const animationVisible = "opacity-100 translate-y-0";

  return (
    <section 
      className="contact-section-custom skills-section-custom" 
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div 
            className={`hidden md:block ${animationBase} ${
              isVisible ? `${animationVisible} delay-200` : animationInitial
            }`}
          >
            <Image 
              src={contactImagePlaceholder} 
              alt="Decorative contact graphic" 
              width={500}
              height={450} 
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div 
            className={`${animationBase} ${
              isVisible ? `${animationVisible} delay-400` : animationInitial
            }`}
          >
            <form onSubmit={handleSubmit} className="contact-form-container space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm"
                  placeholder="Your message here..."
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors duration-300 contact-submit-button" 
                >
                  {/* MODIFIED: Changed mr-2 to mr-3 for more space */}
                  <svg 
                    className="submit-button-icon mr-3 h-5 w-5" 
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