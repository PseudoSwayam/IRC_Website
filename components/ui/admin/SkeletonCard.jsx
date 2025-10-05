import React from 'react';
import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.avatar}></div>
            <div className={styles.textBlock}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </div>
        </div>
    );
}