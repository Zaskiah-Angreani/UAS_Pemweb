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
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/activities/${id}`);
                const data = response.data.data || response.data;
                setKegiatan(data);
            } catch (err) {
                console.error("Gagal load:", err);
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
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "09:00 WIB" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "-" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <p className="tagline">Masa Depan yang Lebih Baik</p>
              
                {/* CARD UTAMA UNTUK GAMBAR & DESKRIPSI */}
                <div className="summary-card-container">
                    <div className="image-side">
                        <img 
                            src={`/${kegiatan.image_url}`} 
                            alt="Preview" 
                            className="img-main"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/500x300?text=Gambar+Kegiatan'}
                        />
                    </div>
                    <div className="text-side">
                         <p className="description-text-p">{kegiatan.description}</p>
                    </div>
                </div>

                {/* TABEL INFORMASI DALAM KOTAK PUTIH */}
                <div className="info-table-container">
                    {detailItems.map((item, index) => (
                        <div key={index} className="info-row-item">
                            <span className="info-label-txt">{item.label}:</span>
                            <span className={`info-value-txt ${item.value.toLowerCase().includes('selesai') ? 'status-green-txt' : ''}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="footer-button-container">
                    <Link to="/volunteer-terealisasi" className="btn-kembali-final">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;