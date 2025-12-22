import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DetailAktivitas.css'; 
import { activityImages } from './assetsmaps'; 

// Gunakan port 4000 sesuai dengan terminal backend kamu
const API_URL = 'http://localhost:4000/api/activities'; 

const DetailAktivitas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Jika ID tidak ada di URL, jangan eksekusi
        if (!id) return;

        const fetchActivityDetail = async () => {
            try {
                setLoading(true);
                // Mengambil data dari backend lokal
                const response = await axios.get(`${API_URL}/${id}`);
                setActivity(response.data); 
                setError(null);
            } catch (err) {
                console.error("Gagal memuat detail aktivitas:", err);
                setError("Aktivitas tidak ditemukan. Pastikan ID di URL benar dan backend menyala.");
            } finally {
                setLoading(false);
            }
        };

        fetchActivityDetail();
    }, [id]);

    // Tampilan saat loading
    if (loading) {
        return (
            <div className="detail-aktivitas-page" style={{padding: '100px', textAlign: 'center'}}>
                <p>⌛ Memuat detail aktivitas...</p>
            </div>
        );
    }

    // Tampilan jika error (404)
    if (error || !activity) {
        return (
            <div className="detail-aktivitas-page not-found" style={{padding: '100px', textAlign: 'center'}}>
                <h1 style={{color: '#DC3545'}}>404 - Aktivitas Tidak Ditemukan</h1>
                <p>{error || "Maaf, detail aktivitas tidak tersedia."}</p>
                <button 
                    onClick={() => navigate('/aktivitas')} 
                    className="back-button" 
                    style={{marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px'}}
                >
                    &larr; Kembali ke Daftar Aktivitas
                </button>
            </div>
        );
    }
    
    // Logika pengolahan data untuk tampilan
    const fullTime = `${activity.event_day || 'Tanggal TBA'}, ${activity.event_time || ''}`;
    const priceDisplay = activity.price || "Gratis";
    const imageSource = activityImages[activity.image_url] || activityImages['placeholder.jpg'] || 'https://via.placeholder.com/800x400?text=No+Image';
    
    return (
        <div className="detail-aktivitas-page">
            <section className="detail-content-section-figma"> 
                
                {/* Bagian Judul dan Kategori */}
                <div className="detail-header-figma">
                    <h1 className="detail-title-main-figma">{activity.title}</h1>
                    <span className={`detail-category-figma detail-category-${activity.category?.toLowerCase() || 'umum'}`}>
                        {activity.category}
                    </span>
                </div>

                {/* Bagian Gambar Utama */}
                <div className="detail-image-wrapper-figma">
                    <img 
                        className="detail-image-figma" 
                        src={imageSource} 
                        alt={activity.title} 
                    />
                </div>

                <div className="detail-body-wrapper-figma">
                    {/* Kolom Kiri: Deskripsi & Informasi */}
                    <div className="detail-left-column-figma">
                        <div className="info-block">
                            <h2 className="info-block-title">1. Mengenai Program Ini</h2>
                            <p className="info-block-text">
                                {activity.description} 
                                <br/><br/>
                                Kegiatan ini merupakan inisiatif yang berfokus pada {activity.category?.toLowerCase()} dan kepedulian terhadap kebutuhan sekitar.
                            </p>
                        </div>

                        <div className="info-block">
                            <h2 className="info-block-title">2. Tugas dan Tanggung Jawab</h2>
                            <ul className="info-block-list">
                                <li>Berpartisipasi aktif sesuai dengan arahan koordinator lapangan.</li>
                                <li>Bekerja sama dalam tim untuk mencapai target kegiatan.</li>
                                <li>Menjaga nama baik organisasi selama kegiatan berlangsung.</li>
                                <li>Melaporkan hasil kegiatan kepada penanggung jawab.</li>
                            </ul>
                        </div>

                        <div className="info-block">
                            <h2 className="info-block-title">3. Kualifikasi yang Dicari</h2>
                            <ul className="info-block-list">
                                <li>Memiliki kepedulian tinggi terhadap isu {activity.category?.toLowerCase()}.</li>
                                <li>Sehat jasmani dan rohani untuk kegiatan lapangan.</li>
                                <li>Disiplin, bertanggung jawab, dan tepat waktu.</li>
                                <li>Minimal usia 17 tahun atau mendapat izin orang tua.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Kolom Kanan: Ringkasan & Tombol Daftar */}
                    <div className="detail-right-column-figma">
                        <div className="detail-summary-card">
                            <h3>Detail Singkat & Pendaftaran</h3>
                            <div className="summary-item">
                                <span className="summary-icon">📍</span>
                                <span className="summary-text">{activity.location}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-icon">⏱️</span>
                                <span className="summary-text">{fullTime}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-icon">💰</span>
                                <span className="summary-text">{priceDisplay}</span>
                            </div>
                            
                            {/* Mengarah ke form pendaftaran dengan ID aktivitas */}
                            <Link to={`/daftar/${activity.id}`} className="register-button-link">
                                <button className="register-button-figma">
                                    DAFTAR SEKARANG
                                </button>
                            </Link>
                            
                            <button onClick={() => navigate(-1)} className="back-link-figma">
                                &larr; Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailAktivitas;