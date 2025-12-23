import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DetailVolunteer = () => {
    const { id } = useParams();
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                const data = response.data.data || response.data;
                setKegiatan(data);
            } catch (err) {
                console.error("Gagal memuat detail:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetailData();
    }, [id]);

    // Fungsi untuk menangani jika gambar gagal dimuat
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/800x600?text=Gambar+Kegiatan';
    };

    if (loading) return <div className="loading-state">Memuat detail kegiatan...</div>;
    if (!kegiatan) return <div className="error-state">Data tidak ditemukan.</div>;

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer ? `${kegiatan.target_volunteer} Orang` : "35 Orang" },
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
              
                {/* Bagian Kartu Ringkasan (Gambar Kiri, Deskripsi Kanan) */}
                <section className="summary-card">
                    <div className="image-container">
                        <img 
                            src={kegiatan.image_url} 
                            alt={kegiatan.title} 
                            className="summary-image" 
                            onError={handleImageError}
                        />
                    </div>
                    <div className="description-container">
                         <p className="description-text">{kegiatan.description}</p>
                    </div>
                </section>

                {/* Bagian Tabel Informasi */}
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