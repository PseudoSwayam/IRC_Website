'use client';

import React from 'react';
import Image from 'next/image';
import './TeamMemberCard.css';

export default function TeamMemberCard({ member, onClick }) {
    
    // --- THE NEW ROBUST HELPER FUNCTION ---
    const getUniversalImageUrl = (url) => {
        // If the URL is empty or not a string, return null.
        if (typeof url !== 'string' || !url) {
            return null;
        }

        // Case 1: If it's a Supabase URL, it's already perfect. Use it as is.
        if (url.includes('supabase.co')) {
            return url;
        }

        // Case 2: If it's a Google Drive link, convert it.
        if (url.includes('drive.google.com/open?id=')) {
            const fileId = url.split('id=')[1];
            if (fileId) {
                return `https://lh3.googleusercontent.com/d/${fileId}`;
            }
        }
        
        // If neither matches, return null.
        return null;
    };

    const imageUrl = getUniversalImageUrl(member.photo_url);

    const getInitials = (name) => {
        if (typeof name !== 'string' || name.length === 0) return 'NA';
        return name.split(' ').map(n => n[0]).join('');
    };

    return (
        <div className="member-card" onClick={onClick}>
            <div className="member-avatar-container">
                {imageUrl ? 
                    <Image src={imageUrl} alt={member.full_name || 'Member Avatar'} width={60} height={60} className="member-avatar-img" /> :
                    <div className="initials">{getInitials(member.full_name)}</div>
                }
                {member.status && <div className={`status-dot ${member.status.trim() === 'Active' ? 'online' : 'offline'}`}></div>}
            </div>
            
            <div className="member-info">
                <span className="member-name">{member.full_name || 'No Name Provided'}</span>
                <span className="member-role">{member.primary_role || 'No Role Assigned'}</span>
                <div className="member-contact-info">
                    <span>{member.email || 'No Email'}</span>
                </div>
            </div>
        </div>
    );
};