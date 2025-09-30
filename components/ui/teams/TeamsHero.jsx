import React from 'react';
import Link from 'next/link';
import HeroModelViewer from './HeroModelViewer'; // Using your 3D model component
import './TeamsHero.css';

const TeamsHero = () => {
  return (
    <section className="teams-hero-section">
      <div className="hero-content">
        <h1>Innovate. Build. Conquer.</h1>
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
      </div>
    </section>
  );
};
export default TeamsHero;