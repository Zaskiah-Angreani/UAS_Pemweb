import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_URL = API_BASE_URL; 

const AdminDashboard = () => {
    const [adminName, setAdminName] = useState('Admin');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAktivitas: 0,
        totalPendaftaran: 0, 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('userToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        setError(null); 
        try {
            const headers = getAuthHeaders();
            
            const response = await axios.get(`${API_BASE_URL}/admin/stats`, headers); 

            const fetchedStats = response.data.stats;
            
            setStats({
                totalUsers: fetchedStats.totalUsers || 0,
                totalAktivitas: fetchedStats.totalAktivitas || 0,
                totalPendaftaran: fetchedStats.totalPendaftaran || 0,
            });

        } catch (error) {
            console.error("Gagal fetch data Admin:", error.response ? error.response.data : error.message);
            
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                alert('Sesi Admin berakhir atau Anda tidak memiliki akses. Silakan login kembali.');
                handleLogout(); 
            } else {
    
                setError('⚠️ Gagal memuat data dashboard. Server mungkin sedang nonaktif. Cek koneksi Anda.');
                setStats({ totalUsers: 0, totalAktivitas: 0, totalPendaftaran: 0 }); 
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        const userRole = localStorage.getItem('userRole');
        const userName = localStorage.getItem('userName') || 'Admin';

        if (!userToken || userRole !== 'admin') {
            alert('❌ Akses Ditolak! Anda harus login sebagai Admin.');
            navigate('/login');
            return;
        }

        setAdminName(userName);
        fetchStats();

    }, [navigate, getAuthHeaders]); 

    
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName'); 
        alert('👋 Logout Admin Berhasil!');
        navigate('/login');
    };
    
    const handleAddActivity = () => {
        navigate('/admin/add-activity');
    }
    
    
    if (loading && stats.totalUsers === 0 && !error) {
        return <div className="admin-dashboard-container" style={{padding: '50px', textAlign: 'center'}}>Memuat Statistik...</div>;
    }

    return (
        <div className="admin-dashboard-container">
            {/* ADMIN HEADER */}
            <header className="admin-header">
                <h2>Selamat Datang, {adminName} (Admin)!</h2>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {/* PESAN ERROR DI SINI */}
            {error && (
                <div style={{ 
                    padding: '15px', 
                    backgroundColor: '#f8d7da', 
                    color: '#721c24', 
                    border: '1px solid #f5c6cb', 
                    borderRadius: '8px', 
                    marginBottom: '20px', 
                    fontWeight: 'bold' 
                }}>
                    {error}
                </div>
            )}

            {/* STATS CARDS */}
            <div className="admin-stats-grid">
                
                {/* 1. Total Users */}
                <div className="admin-stat-card">
                    <div className="stat-icon">👥</div>
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                </div>

                {/* 2. Total Aktivitas */}
                <div className="admin-stat-card">
                    <div className="stat-icon">📋</div>
                    <h3>Total Aktivitas</h3>
                    <p className="stat-number">{stats.totalAktivitas}</p>
                </div>
                
                {/* 3. Total Pendaftaran */}
                <div className="admin-stat-card">
                    <div className="stat-icon">📝</div>
                    <h3>Total Pendaftaran</h3>
                    <p className="stat-number">{stats.totalPendaftaran}</p>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="admin-actions-section">
                <h3>Quick Actions</h3>
                <div className="admin-action-buttons">
                    
                    <button onClick={handleAddActivity} className="action-btn primary">➕ Tambah Aktivitas</button> 
                    
                    <button onClick={() => navigate('/admin/manage-activities')} className="action-btn secondary">✏️ Kelola Aktivitas</button>
                    
                </div>
            </div>

            {/* RECENT ACTIVITIES */}
            <div className="admin-recent-section">
                <h3>Aktivitas Terbaru (Perlu Implementasi Backend)</h3>
                <div className="recent-list">
                    <div className="recent-item">
                        <span className="recent-icon">...</span>
                        <div>
                            <p>Data aktivitas terbaru perlu diambil dari endpoint khusus (belum ada).</p>
                            <span className="recent-time">Saat ini masih dummy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;