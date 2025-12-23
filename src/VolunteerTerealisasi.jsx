import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerTerealisasi.css'; 
// Pastikan file assetsmaps.js Anda mengekspor activityImages dengan benar
import { activityImages } from './assetsmaps'; 

// Menggunakan base URL yang sesuai dengan Railway Anda
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const VolunteerTerealisasi = () => {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedActivities = async () => {
            try {
                setLoading(true);
                
                // PERBAIKAN: Menambahkan endpoint spesifik '/activities' agar tidak 404
                const response = await axios.get(`${API_BASE_URL}/activities`); 
                
                const allData = response.data;
                
                // Memastikan data adalah array sebelum difilter
                if (Array.isArray(allData)) {
                    // Filter kegiatan yang statusnya 'selesai'
                    const completedData = allData.filter(activity => 
                        activity.status === 'selesai' || activity.status === 'Selesai'
                    );
                    setCompletedActivities(completedData);
                } else {
                    // Jika BE mengirim objek dalam property 'data'
                    const dataArray = allData.data || [];
                    const completedData = dataArray.filter(activity => 
                        activity.status === 'selesai' || activity.status === 'Selesai'
                    );
                    setCompletedActivities(completedData);
                }
                
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data kegiatan terealisasi:", err);
                // Menampilkan pesan error yang lebih spesifik jika server mati atau endpoint salah
                setError("Gagal memuat kegiatan. Pastikan Backend di Railway sudah berjalan dan endpoint /api/activities tersedia.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedActivities();
    }, []); 

    if (loading) {
        return (
            <div className="terealisasi-page-container">
                <div className="loading-state">Memuat kegiatan yang sudah selesai...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="terealisasi-page-container">
                <div className="error-box">
                    <p className="error-message">{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">Coba Lagi</button>
                </div>
            </div>
        );
    }

    return (
        <div className="terealisasi-page-container">
            <header className="terealisasi-header">
                <h1>Kegiatan Sukarelawan Terealisasi</h1>
                <p>Lihat dampak nyata dari setiap aksi yang telah kita lakukan bersama.</p>
            </header>

            <div className="kegiatan-list-grid">
                {completedActivities.length === 0 ? (
                    <p className="no-results-message">Belum ada kegiatan sukarelawan yang terealisasi saat ini.</p>
                ) : (
                    completedActivities.map((kegiatan) => {
                        // Mengambil gambar dari assetsmap atau gunakan placeholder jika tidak ada
                        const imageSource = activityImages[kegiatan.image_url] || activityImages['placeholder.jpg'];

                        return (
                            <Link 
                                key={kegiatan.id} 
                                to={`/aktivitas/${kegiatan.id}`} 
                                className="kegiatan-card-link"
                            >
                                <div className="kegiatan-terealisasi-card">
                                    <div className="card-image-wrapper">
                                        <img 
                                            src={imageSource} 
                                            alt={kegiatan.title} 
                                            className="card-image"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=No+Image'; }}
                                        /> 
                                    </div>
                                    
                                    <div className="card-content">
                                        <h2>{kegiatan.title}</h2>
                                        <div className="card-meta">
                                            <span>📅 {kegiatan.event_day || 'Tanggal tidak tersedia'}</span>
                                            <span> 📍 {kegiatan.location || 'Lokasi belum ditentukan'}</span>
                                        </div>
                                        <p className="card-deskripsi">
                                            {kegiatan.description ? 
                                                (kegiatan.description.length > 120 ? 
                                                    `${kegiatan.description.substring(0, 120)}...` : 
                                                    kegiatan.description) 
                                                : 'Deskripsi singkat tidak tersedia.'
                                            }
                                        </p>
                                        
                                        <div className="button-wrapper-right">
                                            <button className="detail-button">
                                                DETAIL 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default VolunteerTerealisasi;