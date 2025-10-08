import React from 'react';
import Link from 'next/link';
import HeroModelViewer from './HeroModelViewer'; // Using your 3D model component
import './TeamsHero.css';

const TeamsHero = () => {
  return (
    <section className="teams-hero-section">
      <div className="hero-content">
        <h1>Innovate. Build. Conquer.</h1>
        <p>Join our elite robotics teams and push the boundaries of technology. From battlebot engineering to IoT innovation, we're shaping the future of robotics.</p>
        <div className="hero-buttons">
          <Link href="/teams" className="btn-primary">
            Explore Teams
          </Link>
          
          <Link href="/projects" className="btn-secondary">
            View Projects
          </Link>
        </div>
      </div>
      <div className="hero-3d-model">
        <HeroModelViewer modelPath="/teams/robot-model.glb" />
        {/* Floating sparkle effects */}
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>
    </section>
  );
};
export default TeamsHero;