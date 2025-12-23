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

    // Cara memanggil gambar dari folder PUBLIC
    const imageSource = kegiatan.image_url ? `/${kegiatan.image_url}` : '/volunteer3.jpg';

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer || "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "-" },
        { label: "Lokasi", value: kegiatan.location || "-" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "08:00 WIB" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "3 Jam 30 Menit" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <p className="tagline">Masa Depan yang Lebih Baik</p>
              
                {/* Bagian Deskripsi: Gambar Kiri, Teks Kanan */}
                <div className="card-summary">
                    <div className="card-image-box">
                        <img 
                            src={imageSource} 
                            alt="Volunteer" 
                            className="card-img"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/500x300?text=Gambar+Kegiatan'}
                        />
                    </div>
                    <div className="card-text-box">
                         <p className="description-p">{kegiatan.description}</p>
                    </div>
                </div>

                {/* Bagian List Detail */}
                <div className="list-container">
                    {detailItems.map((item, index) => (
                        <div key={index} className="list-row">
                            <span className="label-txt">{item.label}:</span>
                            <span className={`value-txt ${item.value.toLowerCase().includes('selesai') ? 'status-active' : ''}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="footer-nav">
                    <Link to="/volunteer-terealisasi" className="back-btn-new">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;