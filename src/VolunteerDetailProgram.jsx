import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VolunteerDetailProgram.css'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const VolunteerDetailProgram = () => {
    const { id } = useParams();
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Mengambil data spesifik berdasarkan ID dari API Railway
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                setKegiatan(response.data.data || response.data);
            } catch (err) {
                console.error("Gagal memuat data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="loading-state">Memuat informasi kegiatan...</div>;
    if (!kegiatan) return <div className="error-state">Kegiatan tidak ditemukan.</div>;

    return (
        <div className="volunteer-detail-container">
            {/* Navbar dihapus dari sini karena sudah ada di App.jsx */}
            
            <div className="detail-content">
                <h1 className="detail-title">{kegiatan.title}</h1>
                <p className="detail-tagline">{kegiatan.tagline || "Aksi Nyata Untuk Sesama"}</p>

                <div className="info-grid">
                    <div className="info-card">
                        <p><strong>Lokasi:</strong> {kegiatan.location}</p>
                    </div>
                    <div className="info-card">
                        <p><strong>Tanggal Pelaksanaan:</strong> {kegiatan.event_day}</p>
                    </div>
                    <div className="info-card">
                        <p><strong>Status:</strong> <span className="status-badge">{kegiatan.status}</span></p>
                    </div>
                    {/* Menambahkan informasi tambahan dari database */}
                    <div className="info-card">
                        <p><strong>Target Relawan:</strong> {kegiatan.target_volunteer || "-"} Orang</p>
                    </div>
                </div>

                <div className="description-box">
                    <h3>Deskripsi Kegiatan</h3>
                    <p>{kegiatan.description}</p>
                </div>

                <Link to="/volunteer-terealisasi" className="btn-back">
                    Kembali ke Daftar
                </Link>
            </div>
        </div>
    );
};

export default VolunteerDetailProgram;