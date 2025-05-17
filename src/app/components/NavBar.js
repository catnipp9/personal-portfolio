"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';

import logoAsset from '../assets/img/logo.svg';
import navIcon1Asset from '../assets/img/nav-icon1.svg';
import navIcon2Asset from '../assets/img/nav-icon2.png'; // Assuming this is the correct path
import navIcon3Asset from '../assets/img/nav-icon3.svg';

const sectionIds = ['home', 'about', 'skills', 'projects'];

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isTogglerActive, setIsTogglerActive] = useState(false);

    const socialLinks = {
        facebook: "https://www.facebook.com/jamel.hadjirasul80",
        linkedin: "https://www.linkedin.com/in/jamel-hadjirasul-886a3a2a4/",
        email: "mailto:hadjirasuljamel80@gmail.com"
    };

    useEffect(() => {
        const navbarOffset = 75;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            const scrollPositionWithOffset = window.scrollY + navbarOffset + 20;

            let currentActiveSection = '';

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    if (element.offsetTop <= scrollPositionWithOffset) {
                        currentActiveSection = id;
                    }
                }
            }

            if (!currentActiveSection && sectionIds.length > 0) {
                const firstElement = document.getElementById(sectionIds[0]);
                if (firstElement && firstElement.getBoundingClientRect().top <= navbarOffset + 20) {
                    currentActiveSection = sectionIds[0];
                } else if (window.scrollY < navbarOffset) {
                    currentActiveSection = sectionIds[0];
                }
            }

            if (currentActiveSection && activeLink !== currentActiveSection) {
                setActiveLink(currentActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call on mount to set initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLink]); // Added activeLink to dependencies as it's used in the effect

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
        setIsTogglerActive(false); // Close mobile menu on link click
        const element = document.getElementById(value);
        if (element) {
            const offset = 75; // Navbar height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleTogglerClick = () => {
        setIsTogglerActive(!isTogglerActive);
    };

    const navLinkClasses = "nav-link navbar-link"; // Common classes for nav links

    return (
        <nav className={`navbar fixed w-full top-0 z-[9999] transition-all duration-300 ease-in-out ${scrolled ? "scrolled py-2" : "py-[18px]"}`}>
            <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 w-full">
                    <div className="flex-shrink-0">
                        {/* MODIFIED HERE: Added group class for hover effect */}
                        <a
                            href="#home"
                            onClick={(e) => { e.preventDefault(); onUpdateActiveLink('home'); }}
                            className="navbar-brand group"
                            aria-label="Homepage"
                        >
                            <Image
                                src={logoAsset}
                                alt="Logo"
                                width={150}
                                height={40}
                                style={{ height: '4rem', width: 'auto' }}
                                // MODIFIED HERE: Added transition and hover scale classes
                                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </a>
                    </div>
                    <div className="hidden md:flex flex-grow justify-center items-center"> {/* Centered navigation links */}
                        <ul className="navbar-nav flex flex-row md:space-x-2 list-none"> {/* Adjusted spacing for larger screens */}
                            {sectionIds.map((link) => (
                                <li key={link} className="nav-item">
                                    <a
                                        className={`${navLinkClasses} ${activeLink === link ? 'active' : ''}`}
                                        href={`#${link}`}
                                        onClick={(e) => { e.preventDefault(); onUpdateActiveLink(link); }}
                                        aria-current={activeLink === link ? 'page' : undefined}
                                    >
                                        {link === 'about' ? 'About Me' : link.charAt(0).toUpperCase() + link.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <div className="hidden md:flex navbar-text items-center"> {/* Social icons for desktop */}
                            <div className="social-icon inline-block"> {/* Ensure icons are in a line */}
                                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-facebook">
                                    <Image src={navIcon1Asset} alt="Facebook" width={17} height={17} />
                                </a>
                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
                                    <Image src={navIcon2Asset} alt="LinkedIn" width={17} height={17} />
                                </a>
                                <a href={socialLinks.email} aria-label="Email" className="social-gmail">
                                    <Image src={navIcon3Asset} alt="Email" width={17} height={17} />
                                </a>
                            </div>
                        </div>
                        <div className="md:hidden ml-3"> {/* Hamburger menu for mobile */}
                            <button
                                type="button"
                                className="navbar-toggler relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="navbarSupportedContent"
                                aria-expanded={isTogglerActive}
                                onClick={handleTogglerClick}
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className="space-y-1.5"> {/* Adjusted spacing for thicker lines if needed */}
                                    <span className={`block h-[2px] w-6 bg-white transform transition-all duration-300 ease-in-out ${isTogglerActive ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                                    <span className={`block h-[2px] w-6 bg-white transform transition-all duration-300 ease-in-out ${isTogglerActive ? 'opacity-0' : ''}`}></span>
                                    <span className={`block h-[2px] w-6 bg-white transform transition-all duration-300 ease-in-out ${isTogglerActive ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isTogglerActive ? 'block' : 'hidden'} w-full pt-4 pb-3 border-t border-gray-700 bg-[#505773]`} // Ensure background color is applied
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav flex flex-col items-center space-y-1 px-2 list-none"> {/* Center items in mobile menu */}
                        {sectionIds.map((link) => (
                            <li key={link} className="nav-item w-full">
                                <a
                                    className={`${navLinkClasses} ${activeLink === link ? 'active' : ''} block text-center w-full py-2`} // Ensure full width and centered text
                                    href={`#${link}`}
                                    onClick={(e) => { e.preventDefault(); onUpdateActiveLink(link); }}
                                    aria-current={activeLink === link ? 'page' : undefined}
                                >
                                    {link === 'about' ? 'About Me' : link.charAt(0).toUpperCase() + link.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="navbar-text flex justify-center items-center mt-3 pt-3 border-t border-gray-600"> {/* Social icons in mobile menu */}
                        <div className="social-icon inline-block">
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-facebook">
                                <Image src={navIcon1Asset} alt="Facebook" width={17} height={17} />
                            </a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
                                <Image src={navIcon2Asset} alt="LinkedIn" width={17} height={17} />
                            </a>
                            <a href={socialLinks.email} aria-label="Email" className="social-gmail">
                                <Image src={navIcon3Asset} alt="Email" width={17} height={17} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};