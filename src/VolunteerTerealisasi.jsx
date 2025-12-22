import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerTerealisasi.css'; 
import { activityImages } from './assetsmaps'; 

// PERBAIKAN: Gunakan endpoint /activities sesuai app.js
const API_URL = 'https://uasbackend-production-ae20.up.railway.app/api/activities';

const VolunteerTerealisasi = () => {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL); 
                
                // Filter data yang statusnya 'selesai' dari tabel volunteers
                const completedData = response.data.filter(activity => activity.status === 'selesai');

                setCompletedActivities(completedData);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Gagal memuat kegiatan terealisasi. Pastikan rute /api/activities tersedia.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedActivities();
    }, []); 

    if (loading) return <div className="terealisasi-page-container"><p>Memuat data...</p></div>;
    if (error) return <div className="terealisasi-page-container"><p className="error-message">{error}</p></div>;

    return (
        <div className="terealisasi-page-container">
            <header className="terealisasi-header">
                <h1>Kegiatan Sukarelawan Terealisasi</h1>
                <p>Dampak nyata dari setiap aksi bersama.</p>
            </header>

            <div className="kegiatan-list-grid">
                {completedActivities.length === 0 ? (
                    <p className="no-results-message">Belum ada kegiatan yang selesai.</p>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default VolunteerTerealisasi;