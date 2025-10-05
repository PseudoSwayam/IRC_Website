'use client';

import React, { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
// We will reuse the same CSS module as the AssignTaskModal for consistency
import styles from './AssignTaskModal.module.css'; 

export default function EditTaskModal({ task, onClose, onTaskUpdated }) {
    
    // Initialize state with the existing task's data
    const [status, setStatus] = useState(task.status);
    const [progress, setProgress] = useState(task.progress);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const updatedFields = {
            status,
            progress: Number(progress),
        };

        // Send the UPDATE request to Supabase, targeting the specific task by its ID
        const { data, error: updateError } = await supabase
            .from('tasks')
            .update(updatedFields)
            .eq('id', task.id) // The crucial part: specifies WHICH task to update
            .select()
            .single();

        if (updateError) {
            console.error('Error updating task:', updateError);
            setError('Failed to update task. Please try again.');
            setIsSubmitting(false);
        } else {
            onTaskUpdated(data); // Send the updated task back to the parent component
            setIsSubmitting(false);
            onClose(); // Close the modal
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitle}>Edit Task</h2>
                        {/* Display the task title as a non-editable field */}
                        <span className={styles.modalSubtitle}>{task.title}</span>
                    </div>
                    <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
                </header>

                <form onSubmit={handleSubmit} className={styles.taskForm}>
                    {/* Non-editable details for context */}
                    <div className={styles.formGroup}>
                        <label>Priority</label>
                        <p className={styles.readOnlyField}>{task.priority}</p>
                    </div>

                    {/* Editable fields */}
                    <div className={styles.formGroup}>
                        <label htmlFor="status">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="progress">Progress: {progress}%</label>
                        <input
                            id="progress"
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            className={styles.rangeSlider}
                            style={{ '--progress': `${progress}%` }}
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.formActions}>
                        <button type="button" className={styles.btnCancel} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}