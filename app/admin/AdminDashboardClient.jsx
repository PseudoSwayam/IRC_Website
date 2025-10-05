'use client'; // This component handles interactivity (state, modals)

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TeamMemberCard from '../../components/ui/admin/TeamMemberCard';
import MemberDetailModal from '../../components/ui/admin/MemberDetailModal';
import './admin-teams-page.css';

export default function AdminDashboardClient({ initialMembers }) {
    // The component now starts with the real data passed from the server
    const [members, setMembers] = useState(initialMembers);
    const [selectedMember, setSelectedMember] = useState(null);

    const openModal = (member) => setSelectedMember(member);
    const closeModal = () => setSelectedMember(null);

    return (
        <div className="admin-page-container">
            <header className="page-header">
                <div className="header-branding">
                    <Link href="/">
                        <Image src="/irc-logo.png" alt="IRC Logo" width={40} height={40} />
                    </Link>
                    <div>
                      <h1>IRC Admin Dashboard</h1>
                      <p className="subtitle">Manage team members, roles, and assignments.</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="add-user-btn">Add User</button>
                </div>
            </header>
            
            <main className="team-grid">
                {members.map(member => (
                    <TeamMemberCard 
                        key={member.membership_id} // Use the unique ID from the database
                        member={member} 
                        onClick={() => openModal(member)} 
                    />
                ))}
            </main>

            {selectedMember && (
                <MemberDetailModal
                    member={selectedMember}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}