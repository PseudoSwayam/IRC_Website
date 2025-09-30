import React from 'react';
import Image from 'next/image';
import './ProjectCard.css';

const ProjectCard = ({ name, description, imgSrc }) => {
  return (
    <div className="project-card">
      <div className="card-image-container">
        {/*
          Use the "fill" and "objectFit" props to make the image responsive
          within its container, which is much more reliable.
        */}
        <Image src={imgSrc} alt={`${name} project`} layout="fill" objectFit="contain" />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;