import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

// Import gambar manual agar terbaca oleh React
import v3 from './assets/volunteer3.jpg'; 
import v4 from './assets/volunteer4.jpg';
import v5 from './assets/volunteer5.jpg';

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DetailVolunteer = () => {
    const { id } = useParams();
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk memilih gambar berdasarkan data database
    const getImage = (imgName) => {
        if (!imgName) return v3;
        if (imgName.includes('volunteer3')) return v3;
        if (imgName.includes('volunteer4')) return v4;
        if (imgName.includes('volunteer5')) return v5;
        return imgName; // Jika isinya link URL (http)
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                setKegiatan(response.data.data || response.data);
            } catch (err) {
                console.error("Gagal memuat:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetail();
    }, [id]);

    if (loading) return <div className="loading-state">Memuat...</div>;
    if (!kegiatan) return <div className="error-state">Data tidak ditemukan.</div>;

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer || "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "-" },
        { label: "Lokasi", value: kegiatan.location || "-" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "-" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "-" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <p className="tagline">{kegiatan.tagline || "Masa Depan yang Lebih Baik"}</p>
              
                {/* Pastikan class name summary-card ini ada agar CSS bekerja */}
                <section className="summary-card">
                    <div className="image-container">
                        <img 
                            src={getImage(kegiatan.image_url)} 
                            alt="Foto Kegiatan" 
                            className="summary-image" 
                        />
                    </div>
                    <div className="description-container">
                         <p className="description-text">{kegiatan.description}</p>
                    </div>
                </section>

                {/* Pastikan class name info-table ini ada agar kotak putih muncul */}
                <div className="info-table">
                    {detailItems.map((item, index) => (
                        <div key={index} className="info-row">
                            <span className="info-label">{item.label}:</span>
                            <span className={`info-value ${item.value.toLowerCase().includes('selesai') ? 'status-green' : ''}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="footer-action">
                    <Link to="/volunteer-terealisasi" className="btn-back">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;