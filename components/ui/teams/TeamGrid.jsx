'use client'; // This component needs to handle state, so it's a Client Component

import React, { useState } from 'react';
import TeamCard from './TeamCard';
import TeamDetailModal from './TeamDetailModal';
import './TeamGrid.css';

const TeamGrid = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const closeModal = () => {
    setSelectedTeam(null);
  };

  return (
    <>
      <section id="meet-the-teams" className="team-grid-section">
        <h2>Meet The Teams</h2>
        <p>Discover the brilliant minds powering our robotic innovations. Click on a card to learn more about each team.</p>
        <div className="team-grid">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} onClick={() => handleTeamClick(team)} />
          ))}
        </div>
      </section>

      {selectedTeam && (
        <TeamDetailModal team={selectedTeam} onClose={closeModal} />
      )}
    </>
  );
};
export default TeamGrid;