'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import ProjectCard from '../../components/ui/projects/ProjectCard'; 
import { Navbar2 } from '../../home/components/navbar-02';
import { Footer9 } from '../../home/components/footer-09';
import './projects.css';

// Enhanced data for the projects with more detailed descriptions
const battlebots = [
  { 
    name: 'Titan', 
    description: 'Our heavyweight battlebot featuring reinforced titanium armor, powerful spinner weapon, and advanced gyroscopic stabilization system.', 
    imgSrc: '/projects/titan.png',
    category: 'Combat Robot',
    status: 'Active'
  },
  { 
    name: 'Vanguard', 
    description: 'High-speed combat robot with dual-motor drive system, carbon fiber chassis, and precision-engineered weapon systems.', 
    imgSrc: '/projects/vanguard.png',
    category: 'Combat Robot',
    status: 'Development'
  },
  { 
    name: 'Maverik', 
    description: 'Compact yet powerful battlebot designed for maximum agility and strategic combat with innovative weapon mechanisms.', 
    imgSrc: '/projects/maverik.png',
    category: 'Combat Robot',
    status: 'Active'
  },
];

const rcBots = [
  { 
    name: 'Rover X', 
    description: 'All-terrain exploration rover with 6-wheel suspension, HD camera system, and autonomous navigation capabilities.', 
    imgSrc: '/projects/rover-x.png',
    category: 'Exploration',
    status: 'Active'
  },
  { 
    name: 'Alpha', 
    description: 'High-performance racing bot with lightweight aluminum frame, precision steering, and real-time telemetry.', 
    imgSrc: '/projects/alpha.png',
    category: 'Racing',
    status: 'Competition Ready'
  },
  { 
    name: 'Explorer', 
    description: 'Multi-purpose reconnaissance robot featuring modular design, environmental sensors, and extended battery life.', 
    imgSrc: '/projects/explorer.png',
    category: 'Research',
    status: 'Testing'
  },
];

const iotProjects = [
  { 
    name: 'Smart Home Hub', 
    description: 'Comprehensive home automation system with voice control, energy monitoring, and advanced security features.', 
    imgSrc: '/projects/smart-home.png',
    category: 'Automation',
    status: 'Deployed'
  },
  { 
    name: 'Fleet E-Monitors', 
    description: 'IoT-based vehicle monitoring system with real-time diagnostics, GPS tracking, and predictive maintenance alerts.', 
    imgSrc: '/projects/fleet-monitors.png',
    category: 'Transportation',
    status: 'Beta Testing'
  },
  { 
    name: 'Smart Greenhouse', 
    description: 'Automated greenhouse management system with climate control, soil monitoring, and crop optimization algorithms.', 
    imgSrc: '/projects/greenhouse.png',
    category: 'Agriculture',
    status: 'Production'
  },
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Combine all projects into one array for filtering
  const allProjects = useMemo(() => [
    ...battlebots.map(project => ({ ...project, type: 'Battlebot' })),
    ...rcBots.map(project => ({ ...project, type: 'RC Bot' })),
    ...iotProjects.map(project => ({ ...project, type: 'IoT Solution' }))
  ], []);

  // Get unique categories and statuses for filters
  const categories = useMemo(() => ['All', ...new Set(allProjects.map(p => p.category))], [allProjects]);
  const statuses = useMemo(() => ['All', ...new Set(allProjects.map(p => p.status))], [allProjects]);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allProjects, searchTerm, selectedCategory, selectedStatus]);

  // Group filtered projects by type for display
  const groupedProjects = useMemo(() => {
    const groups = {
      'Battlebot': filteredProjects.filter(p => p.type === 'Battlebot'),
      'RC Bot': filteredProjects.filter(p => p.type === 'RC Bot'),
      'IoT Solution': filteredProjects.filter(p => p.type === 'IoT Solution')
    };
    return groups;
  }, [filteredProjects]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <main className="projects-main">
      <Navbar2 />
      
      {/* Admin-style Header */}
      <div className="projects-page-container">
        <div className="page-header">
          <div className="header-branding">
            <h1>Our Projects</h1>
            <p className="subtitle">Discover cutting-edge robotics innovations from our engineering teams</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredProjects.length}</span>
              <span className="stat-label">{searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' ? 'Filtered' : 'Total'} Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search projects by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="filter-container">
            <div className="filter-group">
              <label className="filter-label">Category:</label>
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-results">
            <div className="no-results-content">
              <span className="no-results-icon">🔍</span>
              <h3>No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Show All Projects
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Battlebots Section */}
            {groupedProjects['Battlebot'].length > 0 && (
          <section className="project-section">
            <div className="section-header">
              <h2 className="section-title">⚡ Battlebots ({groupedProjects['Battlebot'].length})</h2>
              <p className="section-description">
                Combat robots engineered for competition with advanced materials and weapon systems.
              </p>
            </div>
            <div className="projects-grid">
              {groupedProjects['Battlebot'].map((bot, index) => (
                <ProjectCard key={bot.name} {...bot} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* RC Bots Section */}
        {groupedProjects['RC Bot'].length > 0 && (
          <section className="project-section">
            <div className="section-header">
              <h2 className="section-title">🚀 RC Bots ({groupedProjects['RC Bot'].length})</h2>
              <p className="section-description">
                Remote-controlled vehicles for exploration, racing, and research applications.
              </p>
            </div>
            <div className="projects-grid">
              {groupedProjects['RC Bot'].map((bot, index) => (
                <ProjectCard key={bot.name} {...bot} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* IoT Projects Section */}
        {groupedProjects['IoT Solution'].length > 0 && (
          <section className="project-section">
            <div className="section-header">
              <h2 className="section-title">🌐 IoT Solutions ({groupedProjects['IoT Solution'].length})</h2>
              <p className="section-description">
                Smart systems connecting physical and digital worlds with advanced sensor technology.
              </p>
            </div>
            <div className="projects-grid">
              {groupedProjects['IoT Solution'].map((project, index) => (
                <ProjectCard key={project.name} {...project} index={index} />
              ))}
            </div>
          </section>
        )}
          </>
        )}
      </div>
      
      <Footer9 />
    </main>
  );
};

export default ProjectsPage;