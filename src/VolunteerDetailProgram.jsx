import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

// PERBAIKAN: Menggunakan logo yang tersedia di folder assets agar build Vercel tidak gagal
import LogoImage from './assets/logo_satuaksi-removebg-preview.png'; 
import { activityImages } from './assetsmaps'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const VolunteerDetailProgram = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                setLoading(true);
                // PERBAIKAN: Mengambil data nyata dari API berdasarkan ID
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                const data = response.data.data || response.data;
                setKegiatan(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching detail:", err);
                setError("Data kegiatan tidak ditemukan.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetailData();
    }, [id]);

    if (loading) return <div className="loading-screen">Memuat detail...</div>;

    if (error || !kegiatan) {
        return (
            <div className="detail-page-wrapper" style={{textAlign: 'center', paddingTop: '150px'}}>
                <h1>{error || "Kegiatan Tidak Ditemukan"}</h1>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    // Mapping dinamis dari database Neon ke tampilan UI
    const detailItems = [
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "Segera Hadir" },
        { label: "Lokasi", value: kegiatan.location || "Lokasi Belum Tersedia" },
        { label: "Status Program", value: kegiatan.status || "Selesai" },
        { label: "Total Jam Kerja", value: kegiatan.total_hours || "-" },
        { label: "Penerima Manfaat", value: kegiatan.beneficiaries || "-" }
    ];

    const imageSource = activityImages[kegiatan.image_url] || activityImages['placeholder.jpg'];

    return (
        <div className="detail-page-wrapper">
            {/* Menambahkan Header agar navigasi tetap ada */}
            <header className="main-header">
                <div className="header-logo-wrapper">
                    <img src={LogoImage} alt="SatuAksi Logo" className="header-logo" />
                </div>
                <nav className="header-nav">
                    <Link to="/beranda" className="nav-item">Beranda</Link>
                    <Link to="/aktivitas" className="nav-item">Aktivitas</Link>
                    <Link to="/tentang" className="nav-item">Tentang</Link>
                    <Link to="/kontak" className="nav-item">Kontak</Link>
                    <Link to="/login" className="nav-item login">Login</Link>
                </nav>
            </header>

            <div className="content-area">
                <h1 className="main-title">{kegiatan.title || kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline || "Membangun Masa Depan Bersama"}</h2>
              
                <section className="summary-section">
                    <img src={imageSource} alt={kegiatan.title} className="summary-image" />
                    <p className="description-text">
                        {kegiatan.description || kegiatan.deskripsi}
                    </p>
                </section>

                <section className="detail-list">
                    {detailItems.map((item, index) => (
                        <div key={index} className="detail-row">
                            <span className="detail-label">{item.label}:</span>
                            <span className="detail-value">{item.value}</span>
                        </div>
                    ))}
                </section>
                
                <div className="button-footer">
                    <Link to="/volunteer-terealisasi" className="back-button">
                        Kembali
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDetailProgram;