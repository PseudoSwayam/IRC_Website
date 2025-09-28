"use client";

import { Button } from "../../components/ui/button";
import React from "react";
import "../styles/animations.css";

export function Header30() {
  return (
    <section className="relative px-[5%] overflow-hidden pt-24">
      {/* Diagonal Tape Strip */}
      <div className="absolute top-[48%] left-[-10%] right-[-10%] z-40 h-10 tape-strip transform -rotate-12 flex items-center overflow-hidden">
        <div className="flex items-center space-x-6 text-black font-semibold text-base whitespace-nowrap animate-scroll">
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
      
      <div className="relative z-20 container">
        <div className="flex max-h-[60rem] min-h-svh items-center justify-center py-16 text-center md:py-24 lg:py-28">
          <div className="w-full max-w-lg">
            <h1 className="heading-h1 mb-5 font-bold text-white md:mb-6 relative z-30 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              <div className="block">ITER ROBOTICS</div>
              <div className="block mt-2">CLUB</div>
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
