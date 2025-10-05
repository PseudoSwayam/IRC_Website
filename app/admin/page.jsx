'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../utils/supabase/client';
import MemberDetailModal from '../../components/ui/admin/MemberDetailModal';
import MemberSection from '../../components/ui/admin/MemberSection';
import SkeletonCard from '../../components/ui/admin/SkeletonCard';
import { Search, UserPlus } from 'lucide-react';
import './admin-teams-page.css';

export default function AdminDashboardPage() {
    
    // Your existing state management is preserved
    const [allMembers, setAllMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');    
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);

    // Your existing data fetching is preserved
    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('members').select('*, tasks(*)');
            if (error) { console.error('Error fetching members:', error); } 
            else { setAllMembers(data); }
            setLoading(false);
        };
        fetchMembers();
    }, []);

    const openModal = (member) => setSelectedMember(member);
    const closeModal = () => setSelectedMember(null);

    // Your existing user deletion handler is preserved
    const handleUserDeleted = (deletedMemberId) => {
        setAllMembers(currentMembers => 
            currentMembers.filter(member => member.membership_id !== deletedMemberId)
        );
    };
    
    // --- NEW: A callback function to update a member's data in the main list ---
    // This ensures the status dot on the TeamMemberCard updates instantly.
    const handleUserUpdated = (updatedMember) => {
        setAllMembers(currentMembers =>
            currentMembers.map(member => 
                member.membership_id === updatedMember.membership_id ? updatedMember : member
            )
        );
    };

    // All your existing filtering and display logic is preserved
    const filteredMembers = allMembers.filter(member => 
        (member.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (member.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (member.primary_role?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    const leads = filteredMembers.filter(m => m.hierarchy === 'Lead');
    const coreMembers = filteredMembers.filter(m => m.hierarchy === 'Core Member');
    const members = filteredMembers.filter(m => m.hierarchy !== 'Lead' && m.hierarchy !== 'Core Member');
    const logoUrl = `/irc-logo.png`; 

    return (
        <div className="admin-page-container">
            <header className="page-header">
                <div className="header-branding">
                    <Link href="/"><Image src={logoUrl} alt="IRC Logo" width={40} height={40} /></Link>
                    <div><h1>IRC Admin Dashboard</h1><p className="subtitle">Manage team members, roles, and assignments.</p></div>
                </div>
                <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input type="text" placeholder="Search by name, email, or role..."
                           className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="header-actions">
                     {/* The Add User button was previously removed and stays removed. */}
                </div>
            </header>
            
            <main>
                {loading ? (
                    <div className="team-grid">{Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)}</div>
                ) : (
                    <>
                        <MemberSection title="Leads" members={leads} onCardClick={openModal} />
                        <MemberSection title="Core Members" members={coreMembers} onCardClick={openModal} />
                        <MemberSection title="Members" members={members} onCardClick={openModal} />
                        {filteredMembers.length === 0 && searchTerm && (
                            <p className="no-results-message">No members found matching "{searchTerm}"</p>
                        )}
                    </>
                )}
            </main>

            {/* We now pass the new onUserUpdated callback down to the modal */}
            {selectedMember && (
                <MemberDetailModal 
                    member={selectedMember} 
                    onClose={closeModal}
                    onUserDeleted={handleUserDeleted}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </div>
    );
}