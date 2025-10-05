'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, Trash2, Eye, EyeOff } from 'lucide-react';
import './MemberDetailModal.css';
import AssignTaskModal from './AssignTaskModal';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal'; 
import { supabase } from '../../../utils/supabase/client';

const ProgressBar = ({ progress }) => (
    <div className="progress-bar-container"><div className="progress-bar-value" style={{ width: `${progress}%` }}></div></div>
);

export default function MemberDetailModal({ member, onClose, onUserDeleted, onUserUpdated }) {
    
    // All of this state management and logic is preserved exactly as it was.
    const [tasks, setTasks] = useState(Array.isArray(member.tasks) ? member.tasks : []);
    const [isAssigningTask, setIsAssigningTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(member.status);
    const [isStatusUpdating, setIsStatusUpdating] = useState(false);

    const handleTaskAdded = (newTask) => { setTasks(currentTasks => [...currentTasks, newTask]); };
    const handleTaskUpdated = (updatedTask) => { setTasks(currentTasks => currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t)); };
    const handleConfirmDelete = async () => {
        const { error: tasksError } = await supabase.from('tasks').delete().eq('member_id', member.membership_id);
        if (tasksError) { console.error('Error deleting tasks:', tasksError); return; }
        const { error: memberError } = await supabase.from('members').delete().eq('membership_id', member.membership_id);
        if (memberError) { console.error('Error deleting member:', memberError); } 
        else { onUserDeleted(member.membership_id); onClose(); }
    };
    const handleToggleStatus = async () => {
        setIsStatusUpdating(true);
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        const { data, error } = await supabase.from('members').update({ status: newStatus }).eq('membership_id', member.membership_id).select().single();
        if (error) {
            console.error("Failed to update status:", error);
            alert("Could not update user status. Please try again.");
            setIsStatusUpdating(false);
        } else {
            setCurrentStatus(newStatus);
            onUserUpdated(data);
            setIsStatusUpdating(false);
        }
    };

    const handleModalContentClick = (e) => e.stopPropagation();
    const getUniversalImageUrl = (url) => {
        if (typeof url !== 'string' || !url) return null;
        if (url.includes('supabase.co')) return url;
        if (url.includes('drive.google.com/open?id=')) {
            const fileId = url.split('id=')[1];
            if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;
        }
        return null;
    };
    const imageUrl = getUniversalImageUrl(member.photo_url);
    const skills = Array.isArray(member.skills) ? member.skills : [];
    
    return (
        <> 
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={handleModalContentClick} style={{position: 'relative'}}>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                    
                    <header className="modal-header">
                        {imageUrl && ( <Image src={imageUrl} alt={member.full_name || '...'} width={50} height={50} className="modal-avatar"/> )}
                        <div>
                            <h2 className="member-name">{member.full_name || '...'}</h2>
                            <span className="member-role">{member.primary_role || '...'}</span>
                        </div>
                    </header>
                    
                    <main className="modal-body">
                        <aside className="contact-section">
                            <h4>Contact Info</h4>
                            <p>{member.email || 'N/A'}</p>
                            <p>{member.phone_number || 'N/A'}</p>
                            <h4>Club Details</h4>
                            <p><strong>Hierarchy:</strong> {member.hierarchy || 'N/A'}</p>
                            <p><strong>Status:</strong> <span className={`status-badge status-${currentStatus?.toLowerCase()}`}>{currentStatus || 'N/A'}</span></p>
                            <h4>Skills</h4>
                            <div className="skills-tags">
                                {skills.length > 0 ? (skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)) : (<p className="no-data-message">No skills listed.</p>)}
                            </div>
                        </aside>
                        
                        <section className="assignments-section">
                            <h4>Active Assignments ({tasks.length})</h4>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                     <div className="assignment-card clickable" key={task.id} onClick={() => setEditingTask(task)}>
                                        <div className="assignment-header"><span>{task.title}</span><span>{task.progress}%</span></div>
                                        <ProgressBar progress={task.progress} />
                                        <div className="assignment-footer"><span className={`status-chip status-${task.status?.toLowerCase()}`}>{task.status}</span><span className="priority">^ {task.priority}</span></div>
                                    </div>
                                ))
                            ) : ( <p className="no-tasks-message">No active assignments.</p> )}
                            
                            {/* --- THIS IS THE FINAL JSX STRUCTURE --- */}
                            {/* All three buttons are siblings inside the single modal-actions container */}
                            <div className="modal-actions">
                                <button className="action-btn secondary" onClick={handleToggleStatus} disabled={isStatusUpdating}>
                                    {currentStatus === 'Active' ? (
                                        <><EyeOff size={18} /><span>Mark as Inactive</span></>
                                    ) : (
                                        <><Eye size={18} /><span>Mark as Active</span></>
                                    )}
                                </button>
                                <button className="action-btn primary" onClick={() => setIsAssigningTask(true)}>
                                    <PlusCircle size={18} />
                                    <span>Assign Task</span>
                                </button>
                                <button className="action-btn danger" onClick={() => setIsConfirmingDelete(true)}>
                                    <Trash2 size={18} />
                                    <span>Remove User</span>
                                </button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
            
            {isAssigningTask && <AssignTaskModal member={member} onClose={() => setIsAssigningTask(false)} onTaskAdded={handleTaskAdded} />}
            {editingTask && <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} onTaskUpdated={handleTaskUpdated} />}
            {isConfirmingDelete && <ConfirmDeleteModal member={member} onClose={() => setIsConfirmingDelete(false)} onConfirm={handleConfirmDelete} />}
        </>
    );
}