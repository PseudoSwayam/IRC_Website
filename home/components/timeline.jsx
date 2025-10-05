"use client";

import React, { useEffect, useRef, useState } from "react";
import "../styles/timeline.css";

export function Timeline() {
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const timelineSteps = [
    {
      id: 1,
      title: "Registrations Close",
      date: "15th Oct at 11:59 PM",
      description: "Gate Closes - Last chance to join the hacker caravan.",
      icon: "1",
    },
    {
      id: 2,
      title: "Selection",
      date: "1st Week of Oct",
      description: "Selected participants receive confirmation and guidelines.",
      icon: "2",
    },
    {
      id: 3,
      title: "Acceptance",
      date: "1st Week of Nov",
      description: "Teams are formed and projects begin.",
      icon: "3",
    },
    {
      id: 4,
      title: "Development Phase",
      date: "2nd Week of Nov",
      description: "Intensive development and mentorship sessions.",
      icon: "4",
    },
    {
      id: 5,
      title: "Final Showcase",
      date: "3rd Week of Nov",
      description: "Present your innovations to industry experts and judges.",
      icon: "5",
    },
  ];

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = length;
    }

    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        const scrollStart = windowHeight;
        const scrollEnd = -elementHeight + windowHeight * 0.2;

        let progress = 0;
        if (elementTop <= scrollStart && elementTop >= scrollEnd) {
          const totalScrollRange = scrollStart - scrollEnd;
          const currentScroll = scrollStart - elementTop;
          progress = Math.min(Math.max(currentScroll / totalScrollRange, 0), 1);
        } else if (elementTop < scrollEnd) {
          progress = 1;
        }

        setScrollProgress(progress);

        if (pathRef.current && pathLength > 0) {
          const easedProgress =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const drawLength = pathLength * easedProgress;
          pathRef.current.style.strokeDashoffset = pathLength - drawLength;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathLength]);

  return (
    <section
      ref={timelineRef}
      className="timeline-section relative overflow-hidden"
      style={{ minHeight: "500vh" }}
    >
      <div className="timeline-sticky-container">
        {/* Section Header */}
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Event Timeline
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow the journey from registration to final showcase
          </p>
        </div>

        {/* Snake Timeline Container */}
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <div className="relative" style={{ height: "1200px" }}>
            {/* SVG Snake Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 900"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="25%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="75%" stopColor="#0891B2" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Path */}
              <path
                d="M 150 80 Q 500 140 850 140 
                   Q 500 300 150 300 
                   Q 500 460 850 460 
                   Q 500 620 150 620 
                   Q 500 780 850 780"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />

              {/* Animated Path */}
              <path
                ref={pathRef}
                d="M 150 80 Q 500 140 850 140 
                   Q 500 300 150 300 
                   Q 500 460 850 460 
                   Q 500 620 150 620 
                   Q 500 780 850 780"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                filter="url(#glow)"
              />

              {/* Nodes */}
              <circle cx="150" cy="80" r="12" fill="#8B5CF6" />
              <circle cx="850" cy="140" r="12" fill="#A855F7" />
              <circle cx="150" cy="300" r="12" fill="#06B6D4" />
              <circle cx="850" cy="460" r="12" fill="#0891B2" />
              <circle cx="150" cy="620" r="12" fill="#10B981" />
            </svg>

            {/* Step Cards */}
            {timelineSteps.map((step, i) => {
              const nodePositions = [
                { x: 150, y: 80, side: "left" },
                { x: 850, y: 140, side: "right" },
                { x: 150, y: 300, side: "left" },
                { x: 850, y: 460, side: "right" },
                { x: 150, y: 620, side: "left" },
              ];

              const pos = nodePositions[i];
              const isLeft = pos.side === "left";

              return (
                <div
                  key={step.id}
                  className={`absolute transition-all duration-700 ${
                    scrollProgress >= (i + 1) / timelineSteps.length
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${
                          isLeft ? "-translate-x-8" : "translate-x-8"
                        }`
                  }`}
                  style={{
                    left: isLeft ? `${pos.x + 70}px` : `${pos.x - 350}px`,
                    top: `${pos.y}px`,
                    width: "280px",
                  }}
                >
                  <div
                    className={`timeline-card p-4 rounded-xl shadow-lg bg-gray-900 text-white ${
                      isLeft ? "text-left" : "text-right"
                    }`}
                  >
                    <div className="text-purple-400 font-bold mb-2">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.date}</p>
                    <p className="text-sm mt-2">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
