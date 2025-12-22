import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        setUser({ email: userEmail, name: userName });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        alert('👋 Logout berhasil!');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="user-profile">
                    <div className="profile-avatar">👤</div>
                    <div className="profile-info">
                        <h1>Halo, {user.name || 'User'}</h1>
                        <p>{user.email || 'user@example.com'}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Keluar
                </button>
            </div>

            <div className="dashboard-info">
                <div className="info-card">
                    <div className="info-icon">📋</div>
                    <h3>Aktivitas Relawan</h3>
                    <p>0 Aktivitas</p>
                </div>
                <div className="info-card">
                    <div className="info-icon">⭐</div>
                    <h3>Poin Relawan</h3>
                    <p>0 Poin</p>
                </div>
            </div>

            <div className="welcome-section">
                <h2>Selamat Datang!</h2>
                <p>Pilih aktivitas relawan di menu <strong>Aktivitas</strong> untuk mulai berkontribusi.</p>
                <div className="quick-actions">
                    <a href="/aktivitas" className="action-btn primary">Cari Aktivitas</a>
                    <a href="/volunteer-terealisasi" className="action-btn secondary">Lihat Pendaftaran</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
