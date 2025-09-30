import React from 'react';
import Image from 'next/image';
import './TeamDetailModal.css';

const TeamDetailModal = ({ team, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="modal-main-content">
          <div className="modal-left">
            <div className="main-avatar">
              <Image src={team.avatar} alt={team.name} width={100} height={100} />
            </div>
            <h3>{team.name}</h3>
            
            <div className="team-details-list">
              <p><strong>Team Leader:</strong> {team.leader}</p>
              <p><strong>Member Since:</strong> {team.since}</p>
              <p><strong>Total Members:</strong> {team.totalMembers}</p>
              <p><strong>Status:</strong> {team.status}</p>
            </div>
            
            <h4>Members:</h4>
            <div className="members-list">
              {team.members.map((member, index) => (
                <div className="member-item" key={index}>
                  <div className="member-avatar-small"></div>
                  <span>{member.name}<br/><em>{member.handle}</em></span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-right">
            <h4>Active Projects:</h4>
            <div className="projects-list active">
              {team.activeProjects.map((proj, i) => <div className="project-item" key={i}><span>{proj.name}</span><span>{proj.year}</span></div>)}
            </div>
            
            <h4>Completed Projects:</h4>
            <div className="projects-list completed">
               {team.completedProjects.map((proj, i) => <div className="project-item" key={i}><span>{proj.name}</span><span>{proj.year}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamDetailModal;