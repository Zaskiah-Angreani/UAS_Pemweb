import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

// Menggunakan URL Backend Railway Anda
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const VolunteerDetailProgram = () => {
    const { id } = useParams(); // Mengambil ID dari URL secara dinamis
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                setLoading(true);
                // Mengambil data spesifik dari API berdasarkan ID
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                
                // Menangani struktur data dari backend
                const data = response.data.data || response.data;
                setKegiatan(data);
                setError(null);
            } catch (err) {
                console.error("Gagal memuat detail kegiatan:", err);
                setError("Data kegiatan tidak ditemukan atau server bermasalah.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetailData();
    }, [id]);

    if (loading) return <div className="loading-state">Memuat detail kegiatan...</div>;

    if (error || !kegiatan) {
        return (
            <div className="error-container" style={{textAlign: 'center', paddingTop: '100px'}}>
                <h2>{error || "Kegiatan Tidak Ditemukan"}</h2>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    // Mapping data dinamis dari database untuk ditampilkan di list detail
    const detailItems = [
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "Belum ditentukan" },
        { label: "Lokasi", value: kegiatan.location || "Lokasi belum tersedia" },
        { label: "Status Program", value: kegiatan.status || "Selesai" },
        { label: "Target Relawan", value: kegiatan.target_volunteer || "-" },
        { label: "Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa/Warga Lokal" }
    ];

    return (
        <div className="detail-page-wrapper">
            {/* Header dan Logo dihapus agar menggunakan Navbar global dari App.js */}
            
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <h2 className="tagline">{kegiatan.tagline || "Membangun Masa Depan Bersama"}</h2>
              
                <section className="summary-section">
                    <p className="description-text">
                        {kegiatan.description}
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