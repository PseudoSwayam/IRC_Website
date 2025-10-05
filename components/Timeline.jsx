"use client";

import React, { useRef, useEffect, useCallback } from 'react';

// Timeline events data - IRC Robotics Journey
const timelineEvents = [
  { year: "Phase 1: Registration", text: "Register your team and join the largest student-run hackathon. Get ready to think, build, and disrupt!" },
  { year: "Phase 2: Team Formation", text: "Connect with innovators, form diverse teams, and start brainstorming your game-changing ideas." },
  { year: "Phase 3: Hackathon Weekend", text: "36 hours of intense coding, designing, and building. Transform your vision into reality." },
  { year: "Phase 4: Demo & Awards", text: "Showcase your innovation to industry experts and compete for exciting prizes and recognition." },
  { year: "Phase 5: Community Impact", text: "Join our growing community of 10,000+ innovators and continue building the future together." },
];

const extendedEvents = [
  { year: "Start", text: "" }, 
  ...timelineEvents
];


const drawRoundedRect = (context, x, y, width, height, radius) => {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
};

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '', testLine, metrics, testWidth;
    for (let n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        metrics = context.measureText(testLine);
        testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    return y;
};

const Timeline = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const animationState = useRef({
    scrollProgress: 0,
    smoothedProgress: 0,
    animationFrameId: null,
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
    }
    
    context.clearRect(0, 0, rect.width, rect.height);

    const isMobile = rect.width < 768;
    const isTablet = rect.width < 1024 && rect.width >= 768;
    const centerX = rect.width / 2;
    // Improved responsive offsets to prevent overlaps
    let meanderOffset;
    if (isMobile) {
      meanderOffset = rect.width / 4; // Smaller offset for mobile
    } else if (isTablet) {
      meanderOffset = rect.width / 4.5; // Medium offset for tablet
    } else {
      meanderOffset = rect.width / 5.5; // Larger offset for desktop
    }

    const points = extendedEvents.map((event, index) => {
        const t = index / (extendedEvents.length - 1);
        // Use exponential curve to spread dots more vertically with better spacing
        const curve = Math.pow(t, 0.75); // Improved curve for even better distribution
        let y = lerp(rect.height * 0.12, rect.height * 0.88, curve); // More margin at top/bottom
        
        let x;
        if (index === 0) {
            x = centerX;
        } else {
            x = (index % 2 === 1) ? centerX - meanderOffset : centerX + meanderOffset;
        }
        
        // Place final step (step 5) dot at the horizontal center and comfortably below step 4
        if (index === extendedEvents.length - 1) {
            x = centerX;         // center horizontally
            y = rect.height * 0.70; // move much higher to create maximum room for textbox below
        }
        return { x, y, year: event.year, text: event.text };
    });

    const numSegments = points.length - 1;
    context.lineWidth = 6;
    context.lineCap = 'round';

    for (let i = 0; i < numSegments; i++) {
        const startPoint = points[i];
        const endPoint = points[i+1];
        const segmentStartProgress = i / numSegments;
        const segmentEndProgress = (i + 1) / numSegments;

        if (animationState.current.smoothedProgress > segmentStartProgress) {
            const localProgress = Math.min(1, (animationState.current.smoothedProgress - segmentStartProgress) / (segmentEndProgress - segmentStartProgress));
            const controlPoint1 = { x: startPoint.x, y: lerp(startPoint.y, endPoint.y, 0.5) };
            const controlPoint2 = { x: endPoint.x, y: lerp(startPoint.y, endPoint.y, 0.5) };

            const segmentPath = new Path2D();
            segmentPath.moveTo(startPoint.x, startPoint.y);
            segmentPath.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPoint.x, endPoint.y);
            
            const segmentLength = Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y) * 1.5;
            
            // Original sophisticated gradient: Purple → Cyan → Amber
            const pathGradient = context.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            pathGradient.addColorStop(0, '#A855F7'); // Purple
            pathGradient.addColorStop(0.5, '#06B6D4'); // Cyan
            pathGradient.addColorStop(1, '#F59E0B'); // Amber
            
            context.strokeStyle = pathGradient;
            context.lineWidth = 8; // Slightly thicker for better visibility
            context.shadowBlur = 15;
            context.shadowColor = 'rgba(168, 85, 247, 0.6)';
            context.setLineDash([segmentLength, segmentLength]);
            context.lineDashOffset = segmentLength * (1 - localProgress);
            context.stroke(segmentPath);
            
            // Reset shadow to avoid affecting other elements
            context.shadowBlur = 0;
        }
    }
    
    points.forEach((point, index) => {
        if (index === 0) return;

        // Synchronize step revelation with path progression, ensuring step 5 is reachable
        const eventProgress = (index - 1) / (numSegments - 1) * 0.9; // Steps appear with buffer for step 5
        
        if (animationState.current.smoothedProgress >= eventProgress) {
            // Dot appears exactly when path reaches this point
            const animProgress = Math.min(1, Math.max(0, (animationState.current.smoothedProgress - eventProgress) / 0.04));
            const scale = lerp(0.5, 1, animProgress);
            const opacity = animProgress;

            // Outer ring with glowing gradient
            context.beginPath();
            context.arc(point.x, point.y, 15 * scale, 0, 2 * Math.PI);
            
            // Original sophisticated outer ring - Purple to Cyan
            const outerGradient = context.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, 15 * scale
            );
            outerGradient.addColorStop(0, `rgba(168, 85, 247, ${opacity})`); // Purple center
            outerGradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.8})`); // Cyan edge
            
            context.strokeStyle = outerGradient;
            context.lineWidth = 4;
            context.shadowBlur = 20;
            context.shadowColor = `rgba(168, 85, 247, ${opacity * 0.8})`;
            context.stroke();
            
            // Original dark inner circle with amber glow
            context.beginPath();
            context.arc(point.x, point.y, 10 * scale, 0, 2 * Math.PI);
            
            const innerGradient = context.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, 10 * scale
            );
            innerGradient.addColorStop(0, `rgba(30, 17, 34, ${opacity})`); // Match site background
            innerGradient.addColorStop(0.7, `rgba(20, 10, 25, ${opacity})`); // Site background mid
            innerGradient.addColorStop(1, `rgba(245, 158, 11, ${opacity * 0.3})`); // Subtle amber edge
            
            context.fillStyle = innerGradient;
            context.shadowBlur = 10;
            context.shadowColor = `rgba(245, 158, 11, ${opacity * 0.5})`;
            context.fill();
            
            // Reset shadow
            context.shadowBlur = 0;
            
            // Content box animation with improved timing
            // Content boxes appear only after path visually reaches and dot is formed
            const labelAnimationProgress = Math.min(1, Math.max(0, (animationState.current.smoothedProgress - eventProgress - 0.03) / 0.08));
            
            if (labelAnimationProgress > 0) {
                const isLeftAligned = index % 2 === 0;
                const isFinalStep = index === extendedEvents.length - 1;
                const boxPadding = isMobile ? 16 : 20; // Reduced padding
                let boxWidth, xOffset;
                
                // Responsive sizing based on screen size - smaller boxes
                if (isMobile) {
                  boxWidth = rect.width * 0.32; // Smaller width for mobile
                  xOffset = 40; // Closer to endpoint
                } else if (isTablet) {
                  boxWidth = 260; // Medium width for tablet
                  xOffset = 60; // Closer to endpoint
                } else {
                  boxWidth = 280; // Reduced width for desktop
                  xOffset = 80; // Much closer to endpoint
                }
                
                const textWidth = boxWidth - (boxPadding * 2);
                let boxX;
                if (isFinalStep) {
                  boxX = point.x - boxWidth / 2; // center under the dot
                } else {
                  boxX = isLeftAligned ? point.x + xOffset : point.x - xOffset - boxWidth;
                }
                
                // Prevent boxes from going off-screen with more margin
                const margin = 15;
                if (boxX < margin) boxX = margin;
                if (boxX + boxWidth > rect.width - margin) boxX = rect.width - boxWidth - margin;
                
                const titleLineHeight = 26; // Reduced from 32
                const bodyLineHeight = 20; // Reduced from 24
                
                // Calculate proper box height to auto-adjust to content
                const titleLines = Math.max(1, Math.ceil(point.year.length / 20)); // More accurate estimate
                const bodyLines = Math.max(2, Math.ceil(point.text.length / 35)); // More accurate estimate
                const boxHeight = (titleLines * titleLineHeight) + (bodyLines * bodyLineHeight) + (boxPadding * 2) + 20; // Reduced padding
                
                // Position text boxes: others centered on dot; step 5 placed below the dot
                let boxY;
                if (isFinalStep) {
                  // For step 5: force textbox well below the dot
                  const forceGap = isMobile ? 80 : 120; // Large forced gap
                  boxY = point.y + forceGap;
                  
                  // Only apply bottom clamp if absolutely necessary
                  const bottomLimit = rect.height - 10;
                  if (boxY + boxHeight > bottomLimit) {
                    boxY = bottomLimit - boxHeight;
                  }
                } else {
                  // Other steps: center on dot
                  boxY = point.y - boxHeight / 2;
                  
                  // Bounds checking for non-final steps
                  const verticalMargin = 10;
                  if (boxY < verticalMargin) boxY = verticalMargin;
                  if (boxY + boxHeight > rect.height - verticalMargin) {
                      boxY = rect.height - boxHeight - verticalMargin;
                  }
                }
                
                context.globalAlpha = labelAnimationProgress;
                
                // Original dark glassmorphism background
                const boxGradient = context.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
                boxGradient.addColorStop(0, 'rgba(30, 17, 34, 0.95)'); // Dark purple matching site
                boxGradient.addColorStop(0.5, 'rgba(20, 10, 25, 0.90)'); // Site middle gradient
                boxGradient.addColorStop(1, 'rgba(15, 8, 20, 0.95)'); // Site darker gradient
                
                context.fillStyle = boxGradient;
                drawRoundedRect(context, boxX, boxY, boxWidth, boxHeight, 15);
                context.fill();
                
                // Original sophisticated border - Purple to Cyan to Amber
                context.strokeStyle = 'transparent';
                const borderGradient = context.createLinearGradient(boxX, boxY, boxX + boxWidth, boxY);
                borderGradient.addColorStop(0, 'rgba(168, 85, 247, 0.6)'); // Purple
                borderGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)'); // Cyan
                borderGradient.addColorStop(1, 'rgba(245, 158, 11, 0.6)'); // Amber
                
                context.strokeStyle = borderGradient;
                context.lineWidth = 2;
                context.shadowBlur = 8;
                context.shadowColor = 'rgba(168, 85, 247, 0.4)';
                drawRoundedRect(context, boxX, boxY, boxWidth, boxHeight, 15);
                context.stroke();
                
                // Reset shadow for text
                context.shadowBlur = 0;
                
                const textX = boxX + boxPadding;
                let currentY = boxY + boxPadding + 15;

                // Original sophisticated title gradient - Amber tones
                const titleGradient = context.createLinearGradient(textX, currentY - 15, textX + textWidth, currentY + 5);
                titleGradient.addColorStop(0, '#FBBF24'); // Amber
                titleGradient.addColorStop(0.6, '#F59E0B'); // Darker amber
                titleGradient.addColorStop(1, '#D97706'); // Deep amber
                
                context.fillStyle = titleGradient;
                context.font = 'bold 18px "PP Neue Machina Inktrap", "Unbounded", "SF Pro Display", Arial, sans-serif';
                context.shadowBlur = 6;
                context.shadowColor = 'rgba(251, 191, 36, 0.5)';
                currentY = wrapText(context, point.year, textX, currentY, textWidth, titleLineHeight) + 20;
                
                // Reset shadow for description
                context.shadowBlur = 0;
                
                // Description text with subtle cyan accent
                context.fillStyle = 'rgba(255, 255, 255, 0.95)';
                context.font = '14px "PP Neue Machina Inktrap", "Unbounded", "SF Pro Display", Arial, sans-serif';
                wrapText(context, point.text, textX, currentY, textWidth, bodyLineHeight);
                
                context.globalAlpha = 1.0;
            }
        }
    });
  }, []);

  useEffect(() => {
    const animate = () => {
      const newSmoothedProgress = lerp(
        animationState.current.smoothedProgress,
        animationState.current.scrollProgress, // Follow current scroll position, not max reached
0.3 // Ultra responsive animation for 40% faster timeline
      );
      if (Math.abs(newSmoothedProgress - animationState.current.smoothedProgress) > 0.0001) {
        animationState.current.smoothedProgress = newSmoothedProgress;
        draw();
      }
      animationState.current.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationState.current.animationFrameId);
  }, [draw]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Simplified, more reliable progress calculation
      let progress = Math.max(0, Math.min(1, (windowHeight - top) / (height + windowHeight)));
      
      // Make progress aggressive to ensure step 5 is reachable
      progress = progress * 1.8; // Adjusted for smaller container
      progress = Math.min(1, progress); // Cap at 1
      
      animationState.current.scrollProgress = progress;
      
      // Debug logging including step 5 info
      const step5Progress = (4) / (4) * 0.9; // Calculate step 5 threshold
      console.log('Progress:', progress.toFixed(3), 'Step 5 needs:', step5Progress.toFixed(3), 'Step 5 visible:', progress >= step5Progress);
    };
    const handleResize = () => draw();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [draw]);

  return (
    <section className="py-16 px-4">
      {/* Timeline Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight font-unbounded">
          Timeline
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Follow the journey from registration to demo day
        </p>
      </div>
      
      {/* Timeline Canvas Container */}
      <div ref={containerRef} className="w-full relative" style={{ height: '150vh' }}>
        {/* Debug progress bar */}
        <div className="fixed top-4 right-4 z-50 bg-white/20 p-2 rounded">
          <div className="text-white text-sm mb-1">Timeline Progress</div>
          <div className="w-32 h-2 bg-gray-600 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-100"
              style={{ width: `${(animationState.current.smoothedProgress * 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-300 mt-1">
            {Math.round(animationState.current.smoothedProgress * 100)}%
          </div>
        </div>
        
        <canvas ref={canvasRef} className="sticky top-0 w-full h-screen" />
      </div>
    </section>
  );
};

export default Timeline;
