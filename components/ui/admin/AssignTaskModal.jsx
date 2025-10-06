'use client';

import React, { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
// --- FIX 1: Import the CSS as a 'styles' module ---
import styles from './AssignTaskModal.module.css';

export default function AssignTaskModal({ member, onClose, onTaskAdded }) {
    
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('In Progress');
    const [progress, setProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) { setError('Task title is required.'); return; }
        setIsSubmitting(true);
        setError('');
        const newTask = { member_id: member.membership_id, title, priority, status, progress: Number(progress) };
        const { data, error: insertError } = await supabase.from('tasks').insert([newTask]).select().single();
        if (insertError) {
            setError('Failed to add task. Please try again.');
            setIsSubmitting(false);
        } else {
            onTaskAdded(data);
            setIsSubmitting(false);
            onClose();
        }
    };

    return (
        // --- FIX 2: Use 'styles.className' for every element ---
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitle}>Assign New Task</h2>
                        <span className={styles.modalSubtitle}>To: {member.full_name}</span>
                    </div>
                    <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
                </header>

                <form onSubmit={handleSubmit} className={styles.taskForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Task Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Increase the club's reach and footfall" className={styles.input} />
                    </div>
                    
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.select}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="status">Status</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="progress">Progress: {progress}%</label>
                        <input id="progress" type="range" min="0" max="100" step="5" value={progress}
                            onChange={(e) => setProgress(e.target.value)} className={styles.rangeSlider}
                            // --- UI/UX ENHANCEMENT: This powers the slider's fill effect ---
                            style={{ '--progress': `${progress}%` }} />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.formActions}>
                        <button type="button" className={styles.btnCancel} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}