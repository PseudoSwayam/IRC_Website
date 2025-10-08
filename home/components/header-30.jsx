"use client";

import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import "../styles/animations.css";

export function Header30() {
  const [beltClass, setBeltClass] = useState('belt-scroll-fade');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Slow fade effect based on scroll position
      if (currentScrollY > 200 && currentScrollY < 500) {
        setBeltClass('belt-scroll-fade belt-fade-partial');
      } else if (currentScrollY >= 500) {
        setBeltClass('belt-scroll-fade belt-fade-out');
      } else {
        setBeltClass('belt-scroll-fade');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative px-[5%] overflow-hidden pt-20 md:pt-24 lg:pt-28 hero-mesh-bg">
      {/* First Diagonal Tape Strip */}
      <div className={`absolute top-[58%] left-[-10%] right-[-10%] z-40 h-4 md:h-6 tape-strip transform -rotate-6 flex items-center overflow-hidden ${beltClass}`}>
        <div className="flex items-center space-x-3 md:space-x-6 text-black font-semibold text-xs md:text-base whitespace-nowrap animate-scroll">
          <span>ROBOTICS</span>
          <span>•</span>
          <span>AI & ML</span>
          <span>•</span>
          <span>AUTOMATION</span>
          <span>•</span>
          <span>COMPETITIONS</span>
          <span>•</span>
          <span>INNOVATION</span>
          <span>•</span>
          <span>TECHNOLOGY</span>
          <span>•</span>
          <span>ENGINEERING</span>
          <span>•</span>
          <span>ROBOTICS</span>
          <span>•</span>
          <span>AI & ML</span>
          <span>•</span>
          <span>AUTOMATION</span>
          <span>•</span>
          <span>COMPETITIONS</span>
          <span>•</span>
          <span>INNOVATION</span>
          <span>•</span>
          <span>TECHNOLOGY</span>
          <span>•</span>
          <span>ENGINEERING</span>
        </div>
      </div>
      
      {/* Second Horizontal Tape Strip - Darker Yellow Cross */}
      <div className={`absolute top-[54%] left-[-10%] right-[-10%] z-41 h-4 md:h-6 tape-strip-dark flex items-center overflow-hidden ${beltClass}`}>
        <div className="flex items-center space-x-3 md:space-x-6 text-black font-semibold text-xs md:text-base whitespace-nowrap animate-scroll-reverse">
          <span>ROBOTICS</span>
          <span>•</span>
          <span>AI & ML</span>
          <span>•</span>
          <span>AUTOMATION</span>
          <span>•</span>
          <span>COMPETITIONS</span>
          <span>•</span>
          <span>INNOVATION</span>
          <span>•</span>
          <span>TECHNOLOGY</span>
          <span>•</span>
          <span>ENGINEERING</span>
          <span>•</span>
          <span>ROBOTICS</span>
          <span>•</span>
          <span>AI & ML</span>
          <span>•</span>
          <span>AUTOMATION</span>
          <span>•</span>
          <span>COMPETITIONS</span>
          <span>•</span>
          <span>INNOVATION</span>
          <span>•</span>
          <span>TECHNOLOGY</span>
          <span>•</span>
          <span>ENGINEERING</span>
        </div>
      </div>
      
      {/* Floating Images */}
      <img 
        src="/robowars.png" 
        alt="RoboWars" 
        className="floating-image floating-image-large floating-card-left floating-above-belts"
      />
      
      <img 
        src="/humanoid.png" 
        alt="Humanoid" 
        className="floating-image floating-image-large floating-card-right floating-above-belts"
      />
      
      <div className="relative z-20 container">
        <div className="flex max-h-[60rem] min-h-[70vh] md:min-h-svh items-center justify-center py-8 md:py-16 lg:py-24 text-center">
          <div className="w-full max-w-lg">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-5 font-bold text-white md:mb-6 relative z-30 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)', textAlign: 'center'}}>
              <div className="block word-iter">
                <span className="letter">I</span>
                <span className="letter">T</span>
                <span className="letter">E</span>
                <span className="letter">R</span>
              </div>
              <div className="block word-robotics">
                <span className="letter">R</span>
                <span className="letter">O</span>
                <span className="letter">B</span>
                <span className="letter">O</span>
                <span className="letter">T</span>
                <span className="letter">I</span>
                <span className="letter">C</span>
                <span className="letter">S</span>
              </div>
              <div className="block word-club">
                <span className="letter">C</span>
                <span className="letter">L</span>
                <span className="letter">U</span>
                <span className="letter">B</span>
              </div>
            </h1>
            <p className="text-medium text-white">
              From autonomous bots to national competitions — we engineer
              solutions that inspire the future.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <Button title="Button">Button</Button>
              <Button title="Button" variant="secondary-alt">
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
