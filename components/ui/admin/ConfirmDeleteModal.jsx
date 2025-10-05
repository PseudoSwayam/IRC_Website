'use client';

import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import styles from './AssignTaskModal.module.css'; 

export default function ConfirmDeleteModal({ member, onClose, onConfirm }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        await onConfirm();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{maxWidth: '450px'}}>
                <div className={styles.taskForm} style={{textAlign: 'center', padding: '2.5rem'}}>
                    
                    <div style={{
                        width: '60px', height: '60px', background: 'rgba(229, 62, 62, 0.1)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <AlertTriangle size={32} color="var(--caution-red)" />
                    </div>

                    <h2 className={styles.modalTitle} style={{fontSize: '1.5rem'}}>Remove User</h2>
                    <p className={styles.modalSubtitle} style={{marginBottom: '2rem', lineHeight: '1.6'}}>
                        Are you sure you want to remove <strong>{member.full_name}</strong>? This will permanently delete their record and all associated tasks. This action cannot be undone.
                    </p>

                    <div className={styles.formActions} style={{borderTop: 'none', paddingTop: '0', justifyContent: 'center' /* Center the buttons */ }}>
                        <button type="button" className={styles.btnCancel} onClick={onClose} disabled={isDeleting}>
                            Cancel
                        </button>
                        
                        {/* --- THIS IS THE FIX --- */}
                        {/*
                          We've replaced the blue button from your screenshot with the correctly styled
                          red danger button, ensuring the icon and text are perfectly centered.
                        */}
                        <button type="button" className={styles.dangerBtn} onClick={handleConfirm} disabled={isDeleting}>
                            {isDeleting ? <span className={styles.spinner}></span> : (
                                <>
                                    <Trash2 size={18}/>
                                    <span>Remove User</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}