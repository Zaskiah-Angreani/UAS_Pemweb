import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

// URL Backend sesuai dengan screenshot Anda
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const VolunteerDetailProgram = () => {
    const { id } = useParams();
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                setLoading(true);
                // Mengambil data spesifik berdasarkan ID
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
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
            <div className="error-container">
                <h2>{error || "Kegiatan Tidak Ditemukan"}</h2>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    // Mapping data sesuai dengan informasi yang Anda inginkan
    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer ? `${kegiatan.target_volunteer} Orang` : "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "-" },
        { label: "Lokasi", value: kegiatan.location || "-" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "07.30 - 11.00" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "3 Jam 30 Menit" },
        { label: "Status Program", value: kegiatan.status || "Selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            {/* Header/Logo dihapus total agar menggunakan Navbar dari App.js */}
            
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <h2 className="tagline">{kegiatan.tagline || "Membangun Masa Depan yang Lebih Baik"}</h2>
              
                <section className="summary-section">
                    <img 
                        src={kegiatan.image_url || 'https://via.placeholder.com/600x400'} 
                        alt={kegiatan.title} 
                        className="summary-image" 
                    />
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