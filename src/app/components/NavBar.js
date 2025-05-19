"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import logoAsset from '../assets/img/logo.svg'; 
import navIcon1Asset from '../assets/img/nav-icon1.svg'; 
import navIcon2Asset from '../assets/img/nav-icon2.png'; 
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

            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);

            let currentActiveSection = '';
            const buffer = navbarOffset + 40;
            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= buffer && rect.bottom >= buffer) {
                        currentActiveSection = id;
                        break;
                    }
                    if (rect.top < buffer) currentActiveSection = id;
                }
            }
            if (window.scrollY < navbarOffset || (!currentActiveSection && sectionIds.includes('home'))) {
                currentActiveSection = 'home';
            }
            if (activeLink !== currentActiveSection && currentActiveSection) {
                setActiveLink(currentActiveSection);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLink]);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
        setIsTogglerActive(false); 
        const element = document.getElementById(value);
        if (element) {
            const offset = 70; 
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    };

    const handleTogglerClick = () => setIsTogglerActive(!isTogglerActive);

    useEffect(() => { 
        if (isTogglerActive) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; }; 
    }, [isTogglerActive]);

    const navLinkBaseClasses = "nav-link navbar-link";

    let togglerIconColorClasses = isTogglerActive
        ? 'text-white hover:text-gray-300' 
        : scrolled
            ? 'text-gray-200 hover:text-white' 
            : 'text-white hover:text-gray-300'; 

    let iconColor;
    if (isTogglerActive) {
        iconColor = 'white';
    } else if (scrolled) {
        iconColor = '#E5E7EB';
    } else {
        iconColor = 'white'; 
    }

    return (
        <>
            <nav className={`navbar fixed w-full top-0 z-[9999] transition-all duration-300 ease-in-out ${scrolled ? "scrolled py-2" : "py-[18px]"}`}>
                <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 w-full">
                        <div className="flex-shrink-0">
                            <a href="#home" onClick={(e) => { e.preventDefault(); onUpdateActiveLink('home'); }} className="navbar-brand group" aria-label="Homepage">
                                <Image 
                                    src={logoAsset} 
                                    alt="Logo" 
                                    width={140} 
                                    height={35} 
                                    style={{ height: '3.2rem', width: 'auto' }} 
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-110" 
                                    priority 
                                    onError={(e) => { e.currentTarget.src = `https://placehold.co/140x35/011c27/FFFFFF?text=Logo`; e.currentTarget.onerror = null; }}
                                />
                            </a>
                        </div>
                        <div className="hidden md:flex flex-grow justify-center items-center">
                            <ul className="navbar-nav flex flex-row md:space-x-1 lg:space-x-2 list-none">
                                {sectionIds.map((link) => (
                                    <li key={link} className="nav-item">
                                        <a className={`${navLinkBaseClasses} ${activeLink === link ? 'active' : ''}`} href={`#${link}`} onClick={(e) => { e.preventDefault(); onUpdateActiveLink(link); }} aria-current={activeLink === link ? 'page' : undefined}>
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
                                        <Image src={navIcon1Asset} alt="Facebook" width={17} height={17} onError={(e) => { e.currentTarget.src = `https://placehold.co/17x17/1877F2/FFFFFF?text=F`; e.currentTarget.onerror = null; }}/>
                                    </a>
                                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
                                        <Image src={navIcon2Asset} alt="LinkedIn" width={17} height={17} onError={(e) => { e.currentTarget.src = `https://placehold.co/17x17/0A66C2/FFFFFF?text=Li`; e.currentTarget.onerror = null; }}/>
                                    </a>
                                    <a href={socialLinks.email} aria-label="Email" className="social-gmail">
                                        <Image src={navIcon3Asset} alt="Email" width={17} height={17} onError={(e) => { e.currentTarget.src = `https://placehold.co/17x17/EA4335/FFFFFF?text=E`; e.currentTarget.onerror = null; }}/>
                                    </a>
                                </div>
                            </div>
                            <div className="md:hidden ml-3">
                                <button type="button" className={`navbar-toggler no-focus-ring relative inline-flex items-center justify-center p-2 rounded-md z-[10001] transition-colors duration-300 ease-in-out ${togglerIconColorClasses}`} aria-controls="mobileMenuModal" aria-expanded={isTogglerActive} onClick={handleTogglerClick}>
                                    <span className="sr-only">Open main menu</span>
                                    {isTogglerActive ? <X size={28} className="block" color={iconColor} /> : <Menu size={28} className="block" color={iconColor} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                id="mobileMenuBackdrop"
                className={`md:hidden fixed inset-0 z-[9990] 
                            bg-black/60 backdrop-blur-sm 
                            transition-opacity duration-300 ease-in-out
                            flex items-center justify-center p-4 
                            ${isTogglerActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsTogglerActive(false)} 
            >
                <div
                    id="mobileMenuModal"
                    className={`relative w-full max-w-sm 
                                bg-[#0b222c] bg-opacity-95 backdrop-blur-xl rounded-xl shadow-2xl 
                                flex flex-col max-h-[85vh] 
                                transform transition-all duration-300 ease-out
                                ${isTogglerActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div className="p-6 sm:p-8 w-full overflow-y-auto">
                        <ul className="navbar-nav flex flex-col items-center space-y-5 list-none text-center w-full mb-6">
                            {sectionIds.map((link) => (
                                <li key={link} className="nav-item w-full">
                                    <a
                                        className={`${navLinkBaseClasses} mobile-nav-item ${activeLink === link ? 'active' : ''} block w-full py-3 text-xl rounded-md`}
                                        href={`#${link}`}
                                        onClick={(e) => { e.preventDefault(); onUpdateActiveLink(link); }}
                                        aria-current={activeLink === link ? 'page' : undefined}
                                    >
                                        {link === 'about' ? 'About Me' : link.charAt(0).toUpperCase() + link.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="navbar-text flex justify-center items-center pt-6 border-t border-gray-700 w-full">
                            <div className="social-icon inline-block mobile-social-icons">

                                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-facebook">
                                    <Image src={navIcon1Asset} alt="Facebook" width={26} height={26} onError={(e) => { e.currentTarget.src = `https://placehold.co/26x26/1877F2/FFFFFF?text=F&fontsize=16`; e.currentTarget.onerror = null; }}/>
                                </a>
                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
                                    <Image src={navIcon2Asset} alt="LinkedIn" width={26} height={26} onError={(e) => { e.currentTarget.src = `https://placehold.co/26x26/0A66C2/FFFFFF?text=Li&fontsize=16`; e.currentTarget.onerror = null; }}/>
                                </a>
                                <a href={socialLinks.email} aria-label="Email" className="social-gmail">
                                    <Image src={navIcon3Asset} alt="Email" width={26} height={26} onError={(e) => { e.currentTarget.src = `https://placehold.co/26x26/EA4335/FFFFFF?text=E&fontsize=16`; e.currentTarget.onerror = null; }}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};