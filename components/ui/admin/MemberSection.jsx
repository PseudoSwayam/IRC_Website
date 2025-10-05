import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import './MemberSection.css'; // We will create this CSS file next

export default function MemberSection({ title, members, onCardClick }) {
    // This component is purely for display. It receives a title and a list of members.
    return (
        <section className="member-section">
            <h2 className="section-title">{title} ({members.length})</h2>
            {members.length > 0 ? (
                <div className="team-grid">
                    {members.map(member => (
                        <TeamMemberCard 
                            key={member.membership_id}
                            member={member}
                            // Pass the click handler up to the parent page
                            onClick={() => onCardClick(member)}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-members-message">No members in this category.</p>
            )}
        </section>
    );
}