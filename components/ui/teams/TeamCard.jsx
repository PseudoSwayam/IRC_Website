import React from 'react';
import Image from 'next/image';
import './TeamCard.css';

const TeamCard = ({ team, onClick }) => {
  return (
    <div className="team-card" onClick={onClick}>
      <div className="team-avatar-placeholder">
        {/* You can use an Image tag if you have actual avatars */}
        {/* <Image src={team.avatar} alt={team.name} width={60} height={60} /> */}
      </div>
      <span className="team-name">{team.name}</span>
      <span className="team-handle">{team.handle}</span>
    </div>
  );
};
export default TeamCard;