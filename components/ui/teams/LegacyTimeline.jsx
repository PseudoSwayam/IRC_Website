import React from 'react';
import './LegacyTimeline.css';

const LegacyTimeline = ({ items }) => {
  return (
    <section className="timeline-section">
      <h2>Our Legacy Of Innovation</h2>
      <p>A Timeline Of Our Most Ambitious Projects & Celebrated Victories</p>
      <div className="timeline-container">
        {items.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span>{item.year}</span>
              <h3>{item.project}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default LegacyTimeline;