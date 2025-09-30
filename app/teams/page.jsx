import React from 'react'; 

// Import shared components
import { Navbar2 } from '../../home/components/navbar-02';
import { Footer9 } from '../../home/components/footer-09';

// Import new components we will create for this page
import TeamsHero from '../../components/ui/teams/TeamsHero';
import LegacyTimeline from '../../components/ui/teams/LegacyTimeline';
import TeamGrid from '../../components/ui/teams/TeamGrid';
import JoinTeamCTA from '../../components/ui/teams/JoinTeamCTA';

// Import the CSS for this page
import './teams.css';

// --- Mock Data for the Page ---
// You can later move this to a separate file or fetch from a database

const timelineData = [
  { year: '2025', project: 'Project 1', description: 'A modular robotics platform that won the National Robotics Showcase. Its ability to adapt to multiple terrains set a new standard for versatility.' },
  { year: '2023', project: 'Project 2', description: 'A modular robotics platform that won the National Robotics Showcase. Its ability to adapt to multiple terrains set a new standard for versatility.' },
  { year: '2021', project: 'Project 3', description: 'A modular robotics platform that won the National Robotics Showcase. Its ability to adapt to multiple terrains set a new standard for versatility.' },
];

const teamsData = [
  {
    id: 1,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 2,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 3,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 4,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 5,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 6,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 7,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
  {
    id: 8,
    name: 'Shatrujeet',
    handle: '@shatrujeet',
    avatar: '/teams/placeholder-avatar.png', // Add a placeholder image
    leader: 'Team Leader Name',
    since: 2022,
    totalMembers: 8,
    status: 'Active',
    members: [
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
      { name: 'Prateek', handle: '@prateek' },
    ],
    activeProjects: [ { name: 'War Bots 5', year: '2025' } ],
    completedProjects: [
      { name: 'War Bots 4', year: '2024' },
      { name: 'War Bots 3', year: '2023' },
      { name: 'War Bots 2', year: '2022' },
      { name: 'War Bots 1', year: '2020' },
    ]
  },
];


export default function TeamsPage() {
  // This is now a clean, simple Server Component.
  // No 'use client', no useEffect, no workarounds.
  
  return (
    <main className="dark-bg">
      <Navbar2 />
      <div className="teams-page-container">
        <TeamsHero />
        <LegacyTimeline items={timelineData} />
        {/*
          The TeamGrid section itself has the ID, ready for any future in-page links.
          Since we no longer navigate here with a hash, it won't jump down on its own.
        */}
        <TeamGrid teams={teamsData} /> 
        <JoinTeamCTA />
      </div>
      <Footer9 />
    </main>
  );
}