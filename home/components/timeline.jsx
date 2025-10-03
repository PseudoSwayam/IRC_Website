"use client";

import React, { useEffect, useRef, useState } from 'react';
import '../styles/timeline.css';

export function Timeline() {
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInTimeline, setIsInTimeline] = useState(false);

  const timelineSteps = [
    {
      id: 1,
      title: "Registrations Close",
      date: "15th Oct at 11:59 PM",
      description: "Gate Closes - Last chance to join the hacker caravan.",
      icon: "1"
    },
    {
      id: 2,
      title: "Duration - 1st Week of Oct",
      date: "The Golden Ticket Arrive - Keep an eye on your inbox.",
      description: "Selected participants receive confirmation and guidelines.",
      icon: "2"
    },
    {
      id: 3,
      title: "Acceptance",
      date: "Duration - 1st Week of Nov",
      description: "The Golden Ticket Arrive - Teams are formed and projects begin.",
      icon: "3"
    },
    {
      id: 4,
      title: "Development Phase",
      date: "Duration - 2nd Week of Nov",
      description: "Intensive development and mentorship sessions.",
      icon: "4"
    },
    {
      id: 5,
      title: "Final Showcase",
      date: "Duration - 3rd Week of Nov",
      description: "Present your innovations to industry experts and judges.",
      icon: "5"
    }
  ];

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = length;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Check if user is in timeline section
        const inTimeline = elementTop <= windowHeight && (elementTop + elementHeight) >= 0;
        setIsInTimeline(inTimeline);
        
        // Much slower scroll progress calculation
        // Timeline should progress through entire viewport height multiple times
        const scrollStart = windowHeight; // Start when timeline enters viewport
        const scrollEnd = -elementHeight + (windowHeight * 0.2); // End when timeline almost exits
        
        let progress = 0;
        if (elementTop <= scrollStart && elementTop >= scrollEnd) {
          // Calculate progress based on position within extended scroll range
          const totalScrollRange = scrollStart - scrollEnd;
          const currentScroll = scrollStart - elementTop;
          progress = Math.min(Math.max(currentScroll / totalScrollRange, 0), 1);
        } else if (elementTop < scrollEnd) {
          progress = 1;
        }
        
        setScrollProgress(progress);
        
        // Animate the path with very smooth easing
        if (pathRef.current && pathLength > 0) {
          // Use cubic easing for very smooth animation
          const easedProgress = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          const drawLength = pathLength * easedProgress;
          pathRef.current.style.strokeDashoffset = pathLength - drawLength;
        }
      }
    };

    // Use RAF for smoother animation
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    
    const onScroll = () => {
      requestTick();
      ticking = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    // Slow down wheel scrolling when in timeline section
    const handleWheel = (e) => {
      if (isInTimeline) {
        e.preventDefault();
        
        // Reduce scroll speed by 90% when in timeline for much slower experience
        const scrollSpeed = 0.1;
        const deltaY = e.deltaY * scrollSpeed;
        
        // Smooth scroll with reduced speed
        window.scrollBy({
          top: deltaY,
          behavior: 'auto'
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [pathLength]);

  return (
    <section ref={timelineRef} className="timeline-section relative overflow-hidden" style={{minHeight: '500vh'}}>
      <div className="timeline-sticky-container">
        {/* Section Header */}
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Event Timeline
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow the journey from registration to final showcase
          </p>
          
          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {Math.round(scrollProgress * 100)}% Complete • {isInTimeline ? '🐌 Slow scroll active - Enjoy each step' : 'Keep scrolling to see all steps'}
          </p>
          {isInTimeline && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-purple-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Timeline scroll is intentionally slower for better storytelling</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Snake Timeline Container */}
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <div className="relative" style={{ height: '1000px' }}>
            
            {/* SVG Snake Zigzag Path */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="25%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="75%" stopColor="#0891B2" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background Smooth S-Curve Path */}
              <path
                d="M 150 100 Q 500 50 850 100 Q 500 150 150 200 Q 500 250 850 300 Q 500 350 150 400 Q 500 450 850 500"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              
              {/* Animated Smooth S-Curve Path */}
              <path
                ref={pathRef}
                d="M 150 100 Q 500 50 850 100 Q 500 150 150 200 Q 500 250 850 300 Q 500 350 150 400 Q 500 450 850 500"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                filter="url(#glow)"
                className="timeline-path"
              />
              
              {/* S-Curve Path Nodes */}
              <circle cx="150" cy="100" r="12" fill="#8B5CF6" className={`timeline-node ${scrollProgress > 0.1 ? 'active' : ''}`} />
              <circle cx="850" cy="100" r="12" fill="#A855F7" className={`timeline-node ${scrollProgress > 0.3 ? 'active' : ''}`} />
              <circle cx="150" cy="200" r="12" fill="#06B6D4" className={`timeline-node ${scrollProgress > 0.5 ? 'active' : ''}`} />
              <circle cx="850" cy="300" r="12" fill="#0891B2" className={`timeline-node ${scrollProgress > 0.7 ? 'active' : ''}`} />
              <circle cx="150" cy="400" r="12" fill="#10B981" className={`timeline-node ${scrollProgress > 0.9 ? 'active' : ''}`} />
            </svg>
            
            {/* Snake Timeline Steps */}
            {timelineSteps.map((step, index) => {
              const stepPositions = [
                { x: 15, y: 10, side: 'left' },   // Step 1: Left side at S-curve start
                { x: 85, y: 10, side: 'right' },  // Step 2: Right side at S-curve peak 
                { x: 15, y: 20, side: 'left' },   // Step 3: Left side at S-curve return
                { x: 85, y: 30, side: 'right' },  // Step 4: Right side at S-curve peak
                { x: 15, y: 40, side: 'left' }    // Step 5: Left side at S-curve end
              ];
              
              const position = stepPositions[index];
              const isLeft = position.side === 'left';
              
              // Step activation points
              const stepActivationPoints = [0.1, 0.3, 0.5, 0.7, 0.9];
              const progress = stepActivationPoints[index];
              
              return (
                <div
                  key={step.id}
                  className={`absolute transition-all duration-1000 ease-out ${
                    scrollProgress >= progress 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'} scale-95`
                  }`}
                  style={{
                    left: isLeft ? '8%' : '68%',
                    top: `${position.y}%`,
                    transform: 'translateY(-50%)',
                    width: '280px',
                    zIndex: 10
                  }}
                >
                  {/* Connection Line to Snake Path */}
                  <div 
                    className={`absolute top-1/2 w-16 h-1 opacity-60`}
                    style={{
                      [isLeft ? 'right' : 'left']: '-64px',
                      transform: 'translateY(-50%)',
                      background: isLeft 
                        ? 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.8))'
                        : 'linear-gradient(to left, transparent, rgba(139, 92, 246, 0.8))'
                    }}
                  />
                  
                  {/* Step Content Card */}
                  <div className={`timeline-card ${isLeft ? 'text-left' : 'text-right'}`}>
                    {/* Step Number */}
                    <div className={`timeline-step-number ${isLeft ? 'mr-auto' : 'ml-auto'} mb-4`}>
                      {step.icon}
                    </div>
                    
                    {/* Step Content */}
                    <div>
                      <h3 className="timeline-step-title">{step.title}</h3>
                      <p className="timeline-step-date">{step.date}</p>
                      <p className="timeline-step-description">{step.description}</p>
                    </div>
                    
                    {/* Decorative Arrow */}
                    <div 
                      className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 ${
                        isLeft ? '-right-1.5' : '-left-1.5'
                      }`}
                    >
                      <div className={`w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 rotate-45`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
}