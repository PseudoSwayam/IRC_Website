import React, { useState } from 'react';
import Image from 'next/image';
import './ProjectCard.css';

const ProjectCard = ({ name, description, imgSrc, category, status, index = 0 }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = () => {
    // Create a modal or navigate to project detail page
    alert(`Viewing details for ${name}\n\nDescription: ${description}\n\nCategory: ${category}\nStatus: ${status}\n\nThis would typically open a detailed project page or modal.`);
  };

  const handleImageView = () => {
    // Open image in full screen or lightbox
    if (!imageError) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head><title>${name} - Project Image</title></head>
          <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; min-height:100vh;">
            <img src="${imgSrc}" alt="${name}" style="max-width:100%; max-height:100vh; object-fit:contain;" onerror="this.style.display='none'; document.body.innerHTML='<div style=\"color:white; text-align:center; font-family:Arial;\"><h2>Image not available</h2><p>Project: ${name}</p></div>';" />
          </body>
        </html>
      `);
    } else {
      alert(`Image for ${name} is not available`);
    }
  };

  const handleNavigateToProject = () => {
    // Navigate to project page or external link
    const projectSlug = name.toLowerCase().replace(/\s+/g, '-');
    // For now, show an alert - in a real app, you'd use Next.js router
    alert(`Navigating to project: ${name}\n\nIn a real application, this would navigate to:\n/projects/${projectSlug}`);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    const action = !isFavorited ? 'added to' : 'removed from';
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--admin-accent-cyan);
      color: var(--admin-bg-dark);
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = `${name} ${action} favorites!`;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} - ITER Robotics Club Project`,
        text: description,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `Check out this amazing project: ${name}\n${description}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: var(--admin-accent-blue);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          z-index: 1000;
        `;
        notification.textContent = 'Project link copied to clipboard!';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 2000);
      }).catch(() => {
        alert(`Share ${name}:\n\n${description}\n\n${window.location.href}`);
      });
    }
  };

  return (
    <div className="project-card">
      <div className="card-image-container" onClick={handleImageView} style={{ cursor: 'pointer' }}>
        <div className="image-overlay">
          <div className="overlay-content">
            <span className="view-project">View Project</span>
            <div className="project-icons">
              <span className="icon" onClick={(e) => { e.stopPropagation(); handleImageView(); }}>👁</span>
              <span className="icon" onClick={(e) => { e.stopPropagation(); handleNavigateToProject(); }}>→</span>
            </div>
          </div>
        </div>
        {!imageError ? (
          <Image 
            src={imgSrc} 
            alt={`${name} project`} 
            fill
            style={{
              objectFit: 'contain'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">🤖</span>
              <span className="placeholder-text">{name}</span>
              <span className="placeholder-category">{category}</span>
            </div>
          </div>
        )}
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="project-title">{name}</h3>
          <div className="project-meta">
            <span className="project-category">{category}</span>
            <span className="project-status" data-status={status?.toLowerCase().replace(' ', '-')}>
              {status}
            </span>
          </div>
        </div>
        <p className="project-description">{description}</p>
        <div className="card-footer">
          <button className="learn-more-btn" onClick={handleViewDetails}>
            <span>View Details</span>
            <span className="btn-arrow">→</span>
          </button>
          <div className="project-actions">
            <button 
              className={`action-btn ${isFavorited ? 'favorited' : ''}`} 
              title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              onClick={handleFavorite}
            >
              <span>{isFavorited ? '♥' : '♡'}</span>
            </button>
            <button className="action-btn" title="Share Project" onClick={handleShare}>
              <span>⤴</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;