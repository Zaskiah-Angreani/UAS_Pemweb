import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { activityImages } from './assetsmaps'; 
import './VolunteerTerealisasi.css';

const VolunteerTerealisasi = () => {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompleted = async () => {
            try {
                setLoading(true);
                // Menghubungi endpoint /api/activities
                const response = await axios.get('https://uasbackend-production-ae20.up.railway.app/api/activities');
                
                const allData = response.data;

                // Filter data: pastikan status ada dan isinya adalah 'selesai'
                const filtered = allData.filter(act => 
                    act.status && act.status.toLowerCase() === 'selesai'
                );

                setCompletedActivities(filtered);
            } catch (err) {
                console.error("Gagal memuat data:", err);
                setError("Koneksi ke server gagal. Pastikan Backend di Railway sudah aktif.");
            } finally {
                setLoading(false);
            }
        };
        fetchCompleted();
    }, []);

    if (loading) return <div className="terealisasi-page-container"><p>Memuat kegiatan...</p></div>;
    if (error) return <div className="terealisasi-page-container"><p className="error-message">{error}</p></div>;

    return (
        <div className="terealisasi-page-container">
            <header className="terealisasi-header">
                <h1>Kegiatan Sukarelawan Terealisasi</h1>
                <p>Dampak nyata dari setiap aksi bersama.</p>
            </header>

            <div className="kegiatan-list-grid">
                {completedActivities.length > 0 ? (
                    completedActivities.map((kegiatan) => (
                        <Link key={kegiatan.id} to={`/aktivitas/${kegiatan.id}`} className="kegiatan-card-link">
                            <div className="kegiatan-terealisasi-card">
                                <div className="card-image-wrapper">
                                    <img 
                                        src={activityImages[kegiatan.image_url] || activityImages['placeholder.jpg']} 
                                        alt={kegiatan.title} 
                                        className="card-image"
                                    /> 
                                </div>
                                <div className="card-content">
                                    <h2>{kegiatan.title}</h2>
                                    <p className="card-meta">
                                        <span>📅 {kegiatan.event_day}</span> | <span>📍 {kegiatan.location}</span>
                                    </p>
                                    <p className="card-deskripsi">{kegiatan.description}</p>
                                    <div className="button-wrapper-right">
                                        <button className="detail-button">DETAIL</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="no-data">
                        <p>Belum ada kegiatan yang terealisasi.</p>
                        <p className="hint">Tips: Pastikan di Database Neon, kolom 'status' bernilai 'selesai'.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteerTerealisasi;