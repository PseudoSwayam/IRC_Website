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
    maxReachedProgress: 0,
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
    const centerX = rect.width / 2;
    const meanderOffset = isMobile ? rect.width / 4 : rect.width / 6;

    const points = extendedEvents.map((event, index) => {
        const t = index / (extendedEvents.length - 1);
        const y = lerp(rect.height * 0.1, rect.height * 0.9, t);
        
        let x;
        if (index === 0) {
            x = centerX;
        } else {
            x = (index % 2 === 1) ? centerX - meanderOffset : centerX + meanderOffset;
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
            context.strokeStyle = 'rgba(255, 255, 255, 1)';
            context.setLineDash([segmentLength, segmentLength]);
            context.lineDashOffset = segmentLength * (1 - localProgress);
            context.stroke(segmentPath);
        }
    }
    
    points.forEach((point, index) => {
        if (index === 0) return;

        const eventProgress = index / (numSegments + 0.7);
        
        if (animationState.current.smoothedProgress >= eventProgress) {
            const animProgress = Math.min(1, (animationState.current.smoothedProgress - eventProgress) / 0.05);
            const scale = lerp(0.5, 1, animProgress);
            const opacity = animProgress;

            context.beginPath();
            context.arc(point.x, point.y, 12 * scale, 0, 2 * Math.PI);
            context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            context.lineWidth = 6;
            context.stroke();

            context.beginPath();
            context.arc(point.x, point.y, 9 * scale, 0, 2 * Math.PI);
            context.fillStyle = `rgba(17, 17, 17, ${opacity})`;
            context.fill();
            
            const labelAnimationProgress = Math.min(1, (animationState.current.smoothedProgress - eventProgress - 0.02) / 0.1);
            
            if (labelAnimationProgress > 0) {
                const isLeftAligned = index % 2 === 0;
                const boxPadding = 20;
                const boxWidth = isMobile ? rect.width * 0.45 : 300;
                const textWidth = boxWidth - (boxPadding * 2);

                const xOffset = 50;
                const boxX = isLeftAligned ? point.x + xOffset : point.x - xOffset - boxWidth;
                
                const titleLineHeight = 28;
                const bodyLineHeight = 22;
                const estimatedTextHeight = 110;
                const boxHeight = estimatedTextHeight;
                const boxY = point.y - boxHeight / 2;
                
                context.globalAlpha = labelAnimationProgress;
                context.fillStyle = 'rgba(25, 25, 25, 0.9)';
                drawRoundedRect(context, boxX, boxY, boxWidth, boxHeight, 15);
                context.fill();

                const textX = boxX + boxPadding;
                let currentY = boxY + boxPadding + 15;

                context.fillStyle = 'rgba(255, 255, 255, 1)';
                context.font = 'bold 20px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
                currentY = wrapText(context, point.year, textX, currentY, textWidth, titleLineHeight) + 20;

                context.fillStyle = 'rgba(200, 200, 200, 1)';
                context.font = '16px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
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
        animationState.current.maxReachedProgress,
        0.1
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
      let progress = (windowHeight - top) / (height + windowHeight);
      animationState.current.scrollProgress = Math.max(0, Math.min(1, progress));

      animationState.current.maxReachedProgress = Math.max(
          animationState.current.maxReachedProgress,
          animationState.current.scrollProgress
      );
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
    <div ref={containerRef} className="w-full relative" style={{ height: '400vh' }}>
      <canvas ref={canvasRef} className="sticky top-0 w-full h-screen" />
    </div>
  );
};

export default Timeline;
