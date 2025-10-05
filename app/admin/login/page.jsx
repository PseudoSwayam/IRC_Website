'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
    // State and logic remain unchanged.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push('/admin?authed=true');
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.logoContainer}>
                    
                    {/* --- THE LOGO SIZE FIX --- */}
                    {/* The width and height are increased from 56 to 64 */}
                    <Image src="/irc-logo.png" alt="IRC Logo" width={64} height={64} />

                </div>
                
                <h1 className={styles.title}>Admin Panel Access</h1>
                <p className={styles.subtitle}>Enter your credentials to manage the dashboard.</p>
                
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={18} className={styles.inputIcon} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="admin@irc.in"
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={18} className={styles.inputIcon} />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? <span className={styles.spinner}></span> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}