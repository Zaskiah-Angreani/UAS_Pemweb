import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

// Import asset yang terbukti ada di folder Anda
import LogoImage from './assets/logo_satuaksi-removebg-preview.png'; 
import { activityImages } from './assetsmaps'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DetailVolunteer = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                // Mengambil data kegiatan spesifik dari database
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                const data = response.data.data || response.data;
                setKegiatan(data);
            } catch (err) {
                console.error("Gagal memuat detail:", err);
                setError("Detail kegiatan tidak ditemukan.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    if (loading) return <div className="loading">Memuat detail program...</div>;
    if (error || !kegiatan) return <div className="error">{error}</div>;

    const imageSource = activityImages[kegiatan.image_url] || activityImages['placeholder.jpg'];

    return (
        <div className="detail-page-wrapper">
            <header className="main-header">
                <div className="header-logo-wrapper">
                    <img src={LogoImage} alt="Logo" className="header-logo" />
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-item">Beranda</Link>
                    <Link to="/volunteer-terealisasi" className="nav-item">Aktivitas Selesai</Link>
                </nav>
            </header>

            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <h2 className="tagline">{kegiatan.tagline || "Masa Depan yang Lebih Baik"}</h2>
              
                <section className="summary-section">
                    <img src={imageSource} alt={kegiatan.title} className="summary-image" />
                    <p className="description-text">{kegiatan.description}</p>
                </section>

                <section className="detail-list">
                    <div className="detail-row">
                        <span className="detail-label">Lokasi:</span>
                        <span className="detail-value">{kegiatan.location}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Tanggal Selesai:</span>
                        <span className="detail-value">{kegiatan.event_day}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value" style={{color: 'green', fontWeight: 'bold'}}>{kegiatan.status}</span>
                    </div>
                </section>
                
                <div className="button-footer">
                    <Link to="/volunteer-terealisasi" className="back-button">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;