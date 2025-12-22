import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerTerealisasi.css'; 
import { activityImages } from './assetsmaps'; 

// PERBAIKAN: Pastikan URL mengarah ke endpoint /activities
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_URL = `${API_BASE_URL}/activities`; 

const VolunteerTerealisasi = () => {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedActivities = async () => {
            try {
                setLoading(true);
                // Mengambil data dari backend
                const response = await axios.get(API_URL); 
                
                const allData = Array.isArray(response.data) ? response.data : [];
               
                // PERBAIKAN: Filter lebih kuat (mengatasi huruf kapital & spasi)
                const completedData = allData.filter(activity => 
                    activity.status && activity.status.trim().toLowerCase() === 'selesai'
                );

                setCompletedActivities(completedData);
                setError(null);

            } catch (err) {
                console.error("Gagal mengambil data kegiatan terealisasi:", err);
                setError("Gagal memuat kegiatan terealisasi dari server.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedActivities();
    }, []); 

    if (loading) {
        return <div className="terealisasi-page-container"><p>Memuat kegiatan yang sudah selesai...</p></div>;
    }

    if (error) {
        return <div className="terealisasi-page-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="terealisasi-page-container">
            <header className="terealisasi-header">
                <h1>Kegiatan Sukarelawan Terealisasi</h1>
                <p>Lihat dampak nyata dari setiap aksi yang telah kita lakukan bersama.</p>
            </header>

            <div className="kegiatan-list-grid">
                {completedActivities.length === 0 ? (
                    <div className="no-results-message">
                        <p>Belum ada kegiatan sukarelawan yang terealisasi saat ini.</p>
                        <small>Pastikan status di database sudah diatur ke 'selesai'.</small>
                    </div>
                ) : (
                    completedActivities.map((kegiatan) => {
                        // Memetakan gambar dari assetsmaps
                        const imageSource = activityImages[kegiatan.image_url] || activityImages['placeholder.jpg'];

                        return (
                            <Link 
                                key={kegiatan.id} 
                                to={`/aktivitas/${kegiatan.id}`} 
                                className="kegiatan-card-link"
                            >
                                <div className="kegiatan-terealisasi-card">
                                    <div className="card-image-wrapper">
                                        <img src={imageSource} alt={kegiatan.title} className="card-image"/> 
                                    </div>
                                    
                                    <div className="card-content">
                                        <h2>{kegiatan.title}</h2>
                                        <p className="card-meta">
                                            <span>📅 {kegiatan.event_day || 'Tanggal tidak tersedia'}</span> | 
                                            <span> 📍 {kegiatan.location || 'Lokasi belum ditentukan'}</span>
                                        </p>
                                        <p className="card-deskripsi">
                                            {kegiatan.description ? 
                                                (kegiatan.description.substring(0, 100) + '...') : 
                                                'Deskripsi singkat tidak tersedia.'
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