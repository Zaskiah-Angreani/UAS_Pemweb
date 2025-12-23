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

    if (loading) return <div style={{padding: '200px', textAlign: 'center'}}>Memuat Detail...</div>;
    if (!kegiatan) return <div style={{padding: '200px', textAlign: 'center'}}>Data tidak ditemukan.</div>;

    // MEMBERSIHKAN NAMA GAMBAR: Menghilangkan spasi atau karakter aneh agar terbaca di public folder
    const cleanImageName = kegiatan.image_url ? kegiatan.image_url.trim() : 'volunteer3.jpg';
    const imagePath = cleanImageName.startsWith('http') ? cleanImageName : `/${cleanImageName}`;

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer || "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "-" },
        { label: "Lokasi", value: kegiatan.location || "-" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "09:00 WIB" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "3 Jam 30 Menit" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" },
    ];

    return (
        <div className="detail-page-wrapper">
            <div className="content-area">
                <h1 className="main-title">{kegiatan.title}</h1>
                <p className="tagline">Masa Depan yang Lebih Baik</p>
              
                {/* KOTAK RINGKASAN: GAMBAR & DESKRIPSI */}
                <div className="final-card-summary">
                    <div className="final-image-box">
                        <img 
                            src={imagePath} 
                            alt="Volunteer Activity" 
                            className="final-img-fluid"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Cek+Folder+Public'; }}
                        />
                    </div>
                    <div className="final-text-box">
                         <p className="final-desc-p">{kegiatan.description}</p>
                    </div>
                </div>

                {/* TABEL INFORMASI */}
                <div className="final-table-box">
                    {detailItems.map((item, index) => (
                        <div key={index} className="final-row-item">
                            <span className="final-label">{item.label}:</span>
                            <span className={`final-value ${item.value.toLowerCase().includes('selesai') ? 'final-status-green' : ''}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="final-button-wrapper">
                    <Link to="/volunteer-terealisasi" className="final-btn-back">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailVolunteer;