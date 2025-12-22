import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminManageActivity.css';

const API_BASE_URL = 'https://uasbackendpemweb-production-b27f.up.railway.app/api';
const API_URL = API_BASE_URL; 
const API_GET_ACTIVITIES = `${API_BASE_URL}/activities`; 
const API_DELETE_ACTIVITY = `${API_BASE_URL}/admin/activities`; 

const AdminManageActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('userToken');
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    }, []);

    const fetchActivities = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(API_GET_ACTIVITIES, getAuthHeaders()); 
            setActivities(response.data);
        } catch (err) {
            console.error('Error fetching activities:', err.response || err);
            setError('Gagal memuat daftar. Cek koneksi backend atau token admin.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Yakin ingin menghapus Aktivitas ID ${id}? Aksi ini TIDAK DAPAT DIBATALKAN!`)) {
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`${API_DELETE_ACTIVITY}/${id}`, getAuthHeaders());
            
            alert(`✅ Aktivitas ID ${id} berhasil dihapus.`);
            fetchActivities(); 
            
        } catch (err) {
            console.error('Error deleting activity:', err.response || err);
            setError(`Gagal menghapus ID ${id}. Pastikan Anda terautentikasi sebagai Admin.`);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userRole') !== 'admin') {
            alert('Akses Admin Ditolak!');
            navigate('/login');
            return;
        }
        fetchActivities();
    }, [navigate, getAuthHeaders]);


    if (loading) {
        return <div className="admin-manage-activities-container">Memuat Daftar Aktivitas...</div>;
    }

    return (
        <div className="admin-manage-activities-container">
            <h2 style={{marginBottom: '20px'}}>✏️ Kelola Semua Aktivitas Volunteer ({activities.length})</h2>
            <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
                ← Kembali ke Dashboard
            </button>
            <button onClick={() => navigate('/admin/add-activity')} className="action-btn primary" style={{marginLeft: '10px'}}>
                + Tambah Baru
            </button>
            
            {error && <div className="error-message">{error}</div>}

            <div className="activity-list-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Judul</th>
                            <th>Kategori</th>
                            <th>Tanggal Event</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.length === 0 ? (
                            <tr><td colSpan="6" style={{textAlign: 'center'}}>Belum ada aktivitas.</td></tr>
                        ) : (
                            activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.id}</td>
                                    <td>{activity.title}</td>
                                    <td>{activity.category}</td>
                                    <td>{activity.event_day}</td>
                                    <td>
                                        <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => navigate(`/admin/edit-activity/${activity.id}`)}
                                            className="action-edit"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(activity.id)}
                                            className="action-delete"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageActivities;