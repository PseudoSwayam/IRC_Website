import React from 'react';
import Image from 'next/image';
import ProjectCard from '../../components/ui/projects/ProjectCard'; 
import { Navbar2 } from '../../home/components/navbar-02'; // <-- IMPORT NAVBAR
import { Footer9 } from '../../home/components/footer-09'; // <-- IMPORT FOOTER
import './projects.css';

// Data for the projects
const battlebots = [
  { name: 'Titan', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/titan.png' },
  { name: 'Vanguard', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/vanguard.png' },
  { name: 'Maverik', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/maverik.png' },
];
const rcBots = [
  { name: 'Rover X', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/rover-x.png' },
  { name: 'Alpha', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/alpha.png' },
  { name: 'Explorer', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/explorer.png' },
];
const iotProjects = [
  { name: 'Smart Home', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/smart-home.png' },
  { name: 'Fleet E-Monitors', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/fleet-monitors.png' },
  { name: 'Greenhouse', description: '60-series rover with advanced navigation capabilities.', imgSrc: '/projects/greenhouse.png' },
];

const ProjectsPage = () => {
  return (
    <main className="dark-bg">
      <Navbar2 /> {/* <-- ADD NAVBAR AT THE TOP */}
      <div className="projects-container">
        <header className="projects-header">
          <h1>Projects</h1>
          <p>
            Explore the innovative projects developed by our Robotics Club members. From competitive battlebots to remote-controlled vehicles and IoT solutions, our work showcases our passion for robotics and engineering.
          </p>
        </header>

        <section className="project-section">
          <h2>Battlebots</h2>
          <p>Explore the innovative projects developed by our Robotics Club members. From competitive battlebots to remote-controlled vehicles and IoT solutions, our work showcases our passion for robotics and engineering.</p>
          <div className="projects-grid">
            {battlebots.map((bot) => <ProjectCard key={bot.name} {...bot} />)}
          </div>
        </section>

        <section className="project-section">
          <h2>RC Bots</h2>
          <p>Explore the innovative projects developed by our Robotics Club members. From competitive battlebots to remote-controlled vehicles and IoT solutions, our work showcases our passion for robotics and engineering.</p>
          <div className="projects-grid">
            {rcBots.map((bot) => <ProjectCard key={bot.name} {...bot} />)}
          </div>
        </section>

        <section className="project-section">
          <h2>IoT Projects</h2>
          <p>Explore the innovative projects developed by our Robotics Club members. From competitive battlebots to remote-controlled vehicles and IoT solutions, our work showcases our passion for robotics and engineering.</p>
          <div className="projects-grid">
            {iotProjects.map((project) => <ProjectCard key={project.name} {...project} />)}
          </div>
        </section>
      </div>
      <Footer9 /> {/* <-- ADD FOOTER AT THE BOTTOM */}
    </main>
  );
};

export default ProjectsPage;