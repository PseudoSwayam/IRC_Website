import React from 'react';
import Link from 'next/link';
import './JoinTeamCTA.css';

const JoinTeamCTA = () => {
  return (
    <section className="join-cta-section">
      <div className="cta-content">
        <h2>Ready To Build The Future?</h2>
        <p>We're always looking for passionate students to join our innovative teams. Whether you're a coder, an engineer, or a designer, there's a place for you here.</p>
        <Link href="/join" className="cta-button">Become A Member</Link>
      </div>
    </section>
  );
};
export default JoinTeamCTA;