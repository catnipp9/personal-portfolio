"use client";

import React from 'react';
import Image from 'next/image';
import logoAsset from '@/app/assets/img/logo.svg';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer   
      className="footer-custom" 
      id="footer" 
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between"> 
          <div className="mb-6 md:mb-0">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-block">
              <Image 
                src={logoAsset} 
                alt="Logo" 
                width={150} 
                height={40}  
                style={{ width: 'auto', height: '2.5rem' }} 
              />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-normal text-gray-400 tracking-wider"> 
              {currentYear}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
          <p className="text-gray-400">Designed with passion and coded with coffee.</p>
        </div>
      </div>
    </footer>
  );
};
