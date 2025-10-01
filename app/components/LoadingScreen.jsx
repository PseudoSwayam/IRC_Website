"use client";

import React, { useEffect, useRef, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');
    
    const video = videoRef.current;
    if (!video) {
      console.error('Video ref not found');
      return;
    }

    let hasStartedPlaying = false;

    const handleVideoEnd = () => {
      console.log('Video ended');
      setIsExiting(true);
      setTimeout(() => {
        document.body.classList.remove('loading');
        onLoadingComplete();
      }, 800);
    };

    const handleVideoError = (e) => {
      console.error('Video error:', e);
      setVideoError(true);
      setIsExiting(true);
      setTimeout(() => {
        document.body.classList.remove('loading');
        onLoadingComplete();
      }, 800);
    };

    const handleLoadedData = () => {
      console.log('Video loaded');
      if (!hasStartedPlaying) {
        tryPlayVideo();
      }
    };

    const tryPlayVideo = async () => {
      try {
        video.volume = 0.6;
        video.muted = false;
        await video.play();
        hasStartedPlaying = true;
        console.log('Video playing with sound');
      } catch (error) {
        console.log('Autoplay blocked, trying muted:', error.message);
        try {
          video.muted = true;
          await video.play();
          hasStartedPlaying = true;
          console.log('Video playing muted');
        } catch (mutedError) {
          console.error('Video failed to play:', mutedError);
          setVideoError(true);
        }
      }
    };

    // Add event listeners
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('loadeddata', handleLoadedData);
    
    // Try to play on any user interaction
    const handleUserInteraction = () => {
      if (!hasStartedPlaying) {
        tryPlayVideo();
      }
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    // Initial play attempt after a short delay
    const initialPlayTimer = setTimeout(() => {
      tryPlayVideo();
    }, 500);
    
    // Fallback timer - proceed to main site if video doesn't play within 10 seconds
    const fallbackTimer = setTimeout(() => {
      if (!hasStartedPlaying) {
        console.log('Video timeout - proceeding to main site');
        setIsExiting(true);
        setTimeout(() => {
          document.body.classList.remove('loading');
          onLoadingComplete();
        }, 800);
      }
    }, 10000);

    return () => {
      clearTimeout(initialPlayTimer);
      clearTimeout(fallbackTimer);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.body.classList.remove('loading');
    };
  }, [onLoadingComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      document.body.classList.remove('loading');
      onLoadingComplete();
    }, 800);
  };


  return (
    <div className={`loading-screen ${isExiting ? 'fade-out' : ''}`}>
      {!videoError ? (
        <video
          ref={videoRef}
          className="loading-video"
          preload="auto"
          playsInline
          onClick={() => videoRef.current?.play()}
        >
          <source src="/loading.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="fallback-loading">
          <div className="loading-animation"></div>
        </div>
      )}
      
      
      {/* Click instruction - only show if video hasn't started */}
      {!videoError && (
        <div className="click-instruction">
          Click anywhere to start
        </div>
      )}
      
      {/* Optional: Add a skip button for user convenience */}
      <button 
        className="skip-button"
        onClick={handleSkip}
        aria-label="Skip loading animation"
      >
        Skip
      </button>
      
      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.8s ease-out;
        }
        
        .loading-screen.fade-out {
          opacity: 0;
        }
        
        .loading-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .skip-button {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .skip-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .skip-button:focus {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }
        
        .fallback-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .loading-animation {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #ffffff;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;