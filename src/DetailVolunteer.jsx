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
                console.error("Gagal memuat:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetail();
    }, [id]);

    if (loading) return <div className="loading-state">Memuat Detail...</div>;
    if (!kegiatan) return <div className="error-state">Data tidak ditemukan.</div>;

    // Logika pengambilan gambar dari folder public
    const imagePath = kegiatan.image_url ? `/${kegiatan.image_url}` : '/volunteer3.jpg';

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer || "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "-" },
        { label: "Lokasi", value: kegiatan.location || "-" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "08:00 WIB" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "-" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <p className="tagline">Masa Depan yang Lebih Baik</p>
              
                {/* KOTAK DESKRIPSI UTAMA */}
                <div className="summary-card">
                    <div className="image-side">
                        <img 
                            src={imagePath} 
                            alt="Preview" 
                            className="img-fluid"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/500x300?text=Gambar+Tidak+Ditemukan'}
                        />
                    </div>
                    <div className="text-side">
                         <p className="desc-text">{kegiatan.description}</p>
                    </div>
                </div>

                {/* TABEL DETAIL */}
                <div className="detail-container">
                    {detailItems.map((item, index) => (
                        <div key={index} className="detail-item-row">
                            <span className="label-text">{item.label}:</span>
                            <span className={`value-text ${item.value.toLowerCase() === 'selesai' ? 'status-green' : ''}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="action-area">
                    <Link to="/volunteer-terealisasi" className="btn-back-custom">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;