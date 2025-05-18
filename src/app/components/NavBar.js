"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Import Lucide icons

import logoAsset from '../assets/img/logo.svg'; // Ensure this path is correct
import navIcon1Asset from '../assets/img/nav-icon1.svg'; // Ensure this path is correct
import navIcon2Asset from '../assets/img/nav-icon2.png'; // Ensure this path is correct
import navIcon3Asset from '../assets/img/nav-icon3.svg'; // Ensure this path is correct

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
            let currentActiveSection = 'home'; // Default to home

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    // Check if the top of the section is within a range from the top of the viewport
                    // or if the section is significantly visible
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= navbarOffset + 20 && rect.bottom >= navbarOffset + 20) {
                        currentActiveSection = id;
                        break; // Found the active section
                    }
                    // Fallback for sections that are at the very top or bottom
                    if (element.offsetTop <= scrollPositionWithOffset) {
                        currentActiveSection = id;
                    }
                }
            }
             // If near the top of the page, explicitly set to 'home'
            if (window.scrollY < navbarOffset + 50 && sectionIds.includes('home')) {
                 currentActiveSection = 'home';
            }


            if (activeLink !== currentActiveSection) {
                setActiveLink(currentActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLink]); // Re-run if activeLink changes to avoid potential stale closures

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
        setIsTogglerActive(false); // Close mobile menu on link click
        const element = document.getElementById(value);
        if (element) {
            const offset = 70; // Adjusted Navbar height for smooth scroll
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

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isTogglerActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on component unmount
        };
    }, [isTogglerActive]);

    const navLinkBaseClasses = "nav-link navbar-link"; // Base classes for nav links

    return (
        <>
            <nav className={`navbar fixed w-full top-0 z-[9999] transition-all duration-300 ease-in-out ${scrolled ? "scrolled py-2" : "py-[18px]"}`}>
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 w-full">
                        <div className="flex-shrink-0">
                            <a
                                href="#home"
                                onClick={(e) => { e.preventDefault(); onUpdateActiveLink('home'); }}
                                className="navbar-brand group"
                                aria-label="Homepage"
                            >
                                <Image
                                    src={logoAsset}
                                    alt="Logo"
                                    width={140} // Adjusted size
                                    height={35} // Adjusted size
                                    style={{ height: '3.2rem', width: 'auto' }}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                            </a>
                        </div>
                        <div className="hidden md:flex flex-grow justify-center items-center">
                            <ul className="navbar-nav flex flex-row md:space-x-1 lg:space-x-2 list-none">
                                {sectionIds.map((link) => (
                                    <li key={link} className="nav-item">
                                        <a
                                            className={`${navLinkBaseClasses} ${activeLink === link ? 'active' : ''}`}
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
                            <div className="hidden md:flex navbar-text items-center">
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
                            {/* Mobile Menu Toggler (Lucide Icons) */}
                            <div className="md:hidden ml-3">
                                <button
                                    type="button"
                                    className={`navbar-toggler relative inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-[10001] transition-colors duration-300 ease-in-out ${scrolled || isTogglerActive ? 'text-gray-200 hover:text-white' : 'text-white hover:text-gray-300'}`}
                                    aria-controls="mobileMenu"
                                    aria-expanded={isTogglerActive}
                                    onClick={handleTogglerClick}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isTogglerActive ? (
                                        <X size={28} className="block" />
                                    ) : (
                                        <Menu size={28} className="block" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Full-Screen Mobile Menu Overlay */}
            <div
                id="mobileMenu"
                className={`md:hidden fixed inset-0 z-[10000] bg-[#0b222c] bg-opacity-[0.97] backdrop-blur-sm transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 ${isTogglerActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <ul className="navbar-nav flex flex-col items-center space-y-5 list-none text-center">
                    {sectionIds.map((link) => (
                        <li key={link} className="nav-item w-full">
                            <a
                                // Add a specific class for mobile links if more distinct styling is needed
                                className={`${navLinkBaseClasses} mobile-nav-item ${activeLink === link ? 'active' : ''} block w-full py-3 text-2xl`}
                                href={`#${link}`}
                                onClick={(e) => { e.preventDefault(); onUpdateActiveLink(link); }}
                                aria-current={activeLink === link ? 'page' : undefined}
                            >
                                {link === 'about' ? 'About Me' : link.charAt(0).toUpperCase() + link.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="navbar-text flex justify-center items-center mt-6 pt-6 border-t border-gray-700 w-4/5 max-w-xs">
                    <div className="social-icon inline-block mobile-social-icons"> {/* Added class for mobile specific social icon styling */}
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-facebook">
                            <Image src={navIcon1Asset} alt="Facebook" width={22} height={22} />
                        </a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
                            <Image src={navIcon2Asset} alt="LinkedIn" width={22} height={22} />
                        </a>
                        <a href={socialLinks.email} aria-label="Email" className="social-gmail">
                            <Image src={navIcon3Asset} alt="Email" width={22} height={22} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};