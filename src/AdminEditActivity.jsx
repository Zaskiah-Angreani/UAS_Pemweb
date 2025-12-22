import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://uasbackendpemweb-production-b27f.up.railway.app/api';
const API_URL = API_BASE_URL; 
const API_GET_ACTIVITY = `${API_BASE_URL}/activities`; 

const API_PUT_ACTIVITY = `${API_BASE_URL}/admin/activities`; 


const AdminEditActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        event_day: '', 
        event_time: '',
        location: '', 
        status: '', 
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const categories = ['Lingkungan', 'Pendidikan', 'Sosial', 'Kesehatan', 'Lainnya'];
    const statuses = ['mendatang', 'selesai', 'dibatalkan'];

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('userToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }, []);

    useEffect(() => {
        const fetchActivityDetail = async () => {
            if (localStorage.getItem('userRole') !== 'admin') {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(`${API_GET_ACTIVITY}/${id}`, getAuthHeaders());
                const data = response.data;
                
                setFormData({
                    title: data.title,
                    category: data.category,
                    description: data.description,
                
                    event_day: data.event_day ? data.event_day.split('T')[0] : '', 
                    event_time: data.event_time, 
                    location: data.location || '', 
                    status: data.status,
                });

            } catch (err) {
                console.error('Error fetching activity detail:', err);
                setError('Gagal memuat detail. ID mungkin tidak valid atau token kadaluarsa.');
            } finally {
                setLoading(false);
            }
        };
        fetchActivityDetail();
    }, [id, navigate, getAuthHeaders]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const requiredFields = ['title', 'category', 'description', 'event_day', 'event_time', 'location', 'status'];
        const isFormIncomplete = requiredFields.some(field => !formData[field]);

        if (isFormIncomplete) {
            setError('Semua field wajib diisi.');
            setLoading(false);
            return;
        }

        try {
           
            await axios.put(
                `${API_PUT_ACTIVITY}/${id}`,
                formData,
                getAuthHeaders() 
            );

            alert(`✅ Aktivitas ID ${id} berhasil diupdate!`);
            navigate('/admin/manage-activities'); 

        } catch (err) {
            console.error('Error updating activity:', err.response || err);
            const errorMessage = err.response?.data?.message || 'Gagal mengupdate. Cek token atau input.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="admin-container">Memuat detail untuk ID: {id}...</div>;
    }
    
    return (
        <div className="admin-edit-activity-container">
            <h2 style={{ marginBottom: '20px' }}>✏️ Edit Aktivitas Volunteer ID: {id}</h2>
            <button onClick={() => navigate('/admin/manage-activities')} className="back-btn">
                ← Kembali ke Kelola
            </button>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="activity-form">
                <div className="input-group">
                    <label htmlFor="title">Judul Aktivitas</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label htmlFor="status">Status Aktivitas</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                        {statuses.map(s => (
                            <option key={s} value={s}>{s.toUpperCase()}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="category">Kategori</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="location">Lokasi Kegiatan</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label htmlFor="event_day">Tanggal Event</label>
                    <input type="date" id="event_day" name="event_day" value={formData.event_day} onChange={handleChange} required />
                </div>
                
                <div className="input-group">
                    <label htmlFor="event_time">Waktu Event (e.g., 09:00)</label>
                    <input type="time" id="event_time" name="event_time" value={formData.event_time} onChange={handleChange} required />
                </div>
                
                <div className="input-group" style={{gridColumn: 'span 2'}}>
                    <label htmlFor="description">Deskripsi</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="submit-btn primary">
                    {loading ? 'Mengupdate...' : 'Update Aktivitas'}
                </button>
            </form>
        </div>
    );
};

export default AdminEditActivity;