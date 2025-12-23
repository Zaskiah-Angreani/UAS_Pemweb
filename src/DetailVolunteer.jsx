import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

// FUNGSI MAPPING GAMBAR BERDASARKAN ID
const getImagePath = (kegiatan) => {
    if (!kegiatan) return '/volunteer1.jpg';
    
    // Cek image_url dari API
    if (kegiatan.image_url && kegiatan.image_url.trim() !== '') {
        const img = kegiatan.image_url.trim();
        if (img.startsWith('http')) return img;
        return `/${img}`;
    }
    
    // Mapping berdasarkan ID
    const imageMap = {
        1: '/volunteer4.jpg',
        2: '/volunteer5.jpg',
        3: '/volunteer3.jpg'
    };
    
    // Cek dari judul juga (URUTAN PENTING!)
    const title = kegiatan.title?.toLowerCase() || '';
    if (title.includes('mengajar') || title.includes('anak')) return '/volunteer3.jpg';
    if (title.includes('mangrove') || title.includes('tanam')) return '/volunteer4.jpg';
    if (title.includes('hijau')) return '/volunteer3.jpg';
    
    return imageMap[kegiatan.id] || '/volunteer5.jpg';
};

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
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8f9fa'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #e0e0e0',
                        borderTopColor: '#1e3a8a',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '1rem' }}>Memuat Detail...</p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!kegiatan) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</p>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Data tidak ditemukan</h3>
                    <Link 
                        to="/volunteer-terealisasi"
                        style={{
                            display: 'inline-block',
                            background: '#1e3a8a',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Kembali
                    </Link>
                </div>
            </div>
        );
    }

    const imagePath = getImagePath(kegiatan);

    const detailItems = [
        { label: "Jumlah Relawan", value: kegiatan.target_volunteer || "35 Orang" },
        { label: "Tanggal Pelaksanaan", value: kegiatan.event_day || "Sabtu, 10 Jan 2026" },
        { label: "Lokasi", value: kegiatan.location || "Bogor" },
        { label: "Waktu Pelaksanaan", value: kegiatan.event_time || "09:00" },
        { label: "Total Jam Pelaksanaan", value: kegiatan.total_hours || "3 Jam 30 Menit" },
        { label: "Status Program", value: kegiatan.status || "selesai" },
        { label: "Jumlah Penerima Manfaat", value: kegiatan.beneficiaries || "Siswa-siswi SD" }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                
                {/* HEADER */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#1a202c',
                        marginBottom: '8px'
                    }}>
                        {kegiatan.title}
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#718096',
                        fontStyle: 'italic'
                    }}>
                        Masa Depan yang Lebih Baik
                    </p>
                </div>

                {/* GAMBAR BESAR */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    marginBottom: '30px'
                }}>
                    <img
                        src={imagePath}
                        alt={kegiatan.title}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/900x400/1e3a8a/ffffff?text=Kegiatan+Volunteer';
                        }}
                    />
                </div>

                {/* DESKRIPSI */}
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    marginBottom: '30px'
                }}>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.7',
                        color: '#4a5568'
                    }}>
                        {kegiatan.description || "Membantu anak-anak belajar membaca."}
                    </p>
                </div>

                {/* DETAIL INFO */}
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    marginBottom: '30px'
                }}>
                    {detailItems.map((item, index) => {
                        const isStatus = item.label === "Status Program";
                        const isSelesai = isStatus && item.value.toLowerCase().includes('selesai');
                        
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px 0',
                                    borderBottom: index < detailItems.length - 1 ? '1px solid #e2e8f0' : 'none'
                                }}
                            >
                                <span style={{
                                    fontSize: '1rem',
                                    color: '#4a5568',
                                    fontWeight: '500'
                                }}>
                                    {item.label}
                                </span>
                                <span style={{
                                    fontSize: '1rem',
                                    color: isSelesai ? '#059669' : '#1a202c',
                                    fontWeight: isSelesai ? 'bold' : '600',
                                    textTransform: isSelesai ? 'uppercase' : 'none',
                                    background: isSelesai ? '#d1fae5' : 'transparent',
                                    padding: isSelesai ? '4px 12px' : '0',
                                    borderRadius: isSelesai ? '6px' : '0'
                                }}>
                                    {item.value}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* TOMBOL KEMBALI */}
                <div style={{ textAlign: 'center' }}>
                    <Link
                        to="/volunteer-terealisasi"
                        style={{
                            display: 'inline-block',
                            background: '#1e3a8a',
                            color: 'white',
                            padding: '14px 48px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#1e40af';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(30, 58, 138, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = '#1e3a8a';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                        }}
                    >
                        Kembali
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DetailVolunteer;