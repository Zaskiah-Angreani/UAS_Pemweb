import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAddActivity.css'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_URL = API_BASE_URL; 

const API_POST_ACTIVITY = `${API_BASE_URL}/admin/activities`; 

const AdminAddActivity = () => {
    const navigate = useNavigate();
    
    // State untuk form input
    const [formData, setFormData] = useState({
        title: '',
        category: 'Lingkungan', 
        description: '',
        event_day: '', 
        event_time: '',
        location: '', 
        image_url: '', 
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const categories = ['Lingkungan', 'Pendidikan', 'Sosial', 'Kesehatan', 'Lainnya'];
    const defaultData = { 
        status: 'mendatang', 
        price: 'Gratis' 
    }; 

    useEffect(() => {
        if (localStorage.getItem('userRole') !== 'admin') {
            alert('Akses Admin Ditolak!');
            navigate('/login');
        }
    }, [navigate]);

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('userToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
        };
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const requiredFields = ['title', 'category', 'description', 'event_day', 'event_time', 'location', 'image_url'];
        const isFormIncomplete = requiredFields.some(field => !formData[field]);
        
        if (isFormIncomplete) {
            setError('Semua field wajib diisi.');
            setLoading(false);
            return;
        }

        try {
            const finalData = { 
                ...formData, 
                ...defaultData,
                event_day: formData.event_day, 
            };
            await axios.post(
                API_POST_ACTIVITY,
                finalData, 
                getAuthHeaders() 
            );

            alert('✅ Aktivitas baru berhasil ditambahkan!');
            setFormData({ title: '', category: 'Lingkungan', description: '', event_day: '', event_time: '', location: '', image_url: '' });
            navigate('/admin/manage-activities'); 

        } catch (err) {
            console.error('Error adding activity:', err.response || err);
            const errorMessage = err.response?.data?.message || 'Gagal menambahkan. Cek Token/Akses atau pastikan Backend berjalan.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    if (localStorage.getItem('userRole') !== 'admin') {
        return <div className="admin-container">Loading...</div>;
    }

    return (
        <div className="admin-add-activity-container">
            <h2 style={{ marginBottom: '20px' }}>➕ Tambah Aktivitas Volunteer Baru</h2>
            <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
                ← Kembali ke Dashboard
            </button>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="activity-form">
                <div className="input-group">
                    <label htmlFor="title">Judul Aktivitas</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
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
                    <label htmlFor="event_day">Tanggal Event</label>
                    <input type="date" id="event_day" name="event_day" value={formData.event_day} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="event_time">Waktu Event (e.g., 09:00)</label>
                    <input type="time" id="event_time" name="event_time" value={formData.event_time} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label htmlFor="location">Lokasi Kegiatan</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Misal: Lapangan Merdeka" required />
                </div>
                <div className="input-group">
                    <label htmlFor="image_url">Nama File Gambar (Contoh: volunteer1.jpg)</label>
                    <input type="text" id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Nama file (misal: volunteer1.jpg)" required />
                </div>

                <div className="input-group" style={{gridColumn: 'span 2'}}>
                    <label htmlFor="description">Deskripsi</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="submit-btn primary" style={{gridColumn: 'span 2'}}>
                    {loading ? 'Menambahkan...' : 'Simpan Aktivitas Baru'}
                </button>
            </form>
        </div>
    );
};

export default AdminAddActivity;