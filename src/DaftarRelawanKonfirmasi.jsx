// src/DaftarRelawanKonfirmasi.jsx (Langkah 3: Konfirmasi/Selesai)

import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { activitiesData } from './Aktivitas.jsx'; 
// Impor styling baru untuk halaman konfirmasi
import './KonfirmasiRelawan.css'; 

// Asumsi ikon Checkmark dari library seperti react-icons, atau bisa diganti div/img
import { IoCheckmarkCircle } from "react-icons/io5";

const DaftarRelawanKonfirmasi = () => {
    const { activityId } = useParams();
    const location = useLocation(); 

    // Ambil data yang dibawa dari Langkah 2 (data dari Langkah 1 dan 2)
    const dataStep1 = location.state?.dataStep1 || {};
    const dataStep2 = location.state?.dataStep2 || {};
    
    const activity = activitiesData.find(act => act.id === parseInt(activityId));
    const programTitle = activity ? activity.title.toUpperCase() : "PROGRAM TIDAK DITEMUKAN";

    // Data Mock untuk Ringkasan (disarankan menggunakan dataStep1/dataStep2 untuk tampilan nyata)
    const mockData = {
        nomorRegistrasi: "2025-XYXZ",
        tanggalMulai: "15 Januari 2025",
        totalBiaya: "GRATIS"
    };

    return (
        <div className="frame-8 konfirmasi-page">
            
            {/* --- HEADER NAVIGASI (Dibuat ulang untuk konsistensi) --- */}
            <div className="header-section">
                <div className="frame-56">
                    <div className="logo-text">RELADIKA</div>
                    <nav className="nav-links">
                        {/* Link tidak menggunakan absolute positioning lagi */}
                        <Link to="/" className="nav-link">HOME</Link>
                        <Link to="/aktivitas" className="nav-link">AKTIVITAS</Link>
                        <Link to="/volunteer" className="nav-link">VOLUNTEER</Link>
                    </nav>
                </div>
            </div>

            {/* --- STEPPER (Konfirmasi - Langkah Terakhir) --- */}
            {/* Menggantikan Stepper lama dengan tampilan Selesai (opsional, bisa dihilangkan) */}
            <div className="step-navigation final-step">
                <div className="step-item completed-step">
                    <span className="step-number">1</span>
                    <span className="step-label">Informasi Pribadi</span>
                </div>
                <div className="step-separator completed"></div>
                <div className="step-item completed-step">
                    <span className="step-number">2</span>
                    <span className="step-label">Keahlian & Komitmen</span>
                </div>
                <div className="step-separator completed"></div>
                <div className="step-item active-step">
                    <span className="step-number">3</span>
                    <span className="step-label">Konfirmasi</span>
                </div>
            </div>
            
            {/* --- KONTEN UTAMA KONFIRMASI --- */}
            <div className="konfirmasi-content-container">
                
                {/* Bagian Pesan Sukses */}
                <div className="success-message-section">
                    <IoCheckmarkCircle className="checkmark-icon" />
                    <h1 className="selamat-pendaftaran-anda-berhasil">SELAMAT! PENDAFTARAN ANDA BERHASIL!</h1>
                    <p className="anda-telah-resmi">
                        Anda telah resmi akan menjalani program <span className="program-bold">{programTitle}</span>.
                    </p>
                </div>
                
                {/* Kontainer Kartu Ringkasan dan Next Steps */}
                <div className="card-grid">
                    
                    {/* CARD 1: Ringkasan Pendaftaran */}
                    <div className="card ringkasan-pendaftaran-card">
                        <h2 className="card-title">Ringkasan Pendaftaran</h2>
                        <div className="status-box">
                            <p className="status-label">STATUS</p>
                            <p className="status-value">TERDAFTAR</p>
                        </div>
                        <div className="summary-detail">
                            <p className="detail-item">
                                <span className="detail-label">Nomor Registrasi:</span> 
                                <span className="detail-value">{mockData.nomorRegistrasi}</span>
                            </p>
                            <p className="detail-item">
                                <span className="detail-label">Program:</span> 
                                <span className="detail-value">{programTitle}</span>
                            </p>
                            <p className="detail-item">
                                <span className="detail-label">Tanggal Mulai:</span> 
                                <span className="detail-value">{mockData.tanggalMulai}</span>
                            </p>
                            <p className="detail-item">
                                <span className="detail-label">Total Biaya:</span> 
                                <span className="detail-value">{mockData.totalBiaya}</span>
                            </p>
                        </div>
                    </div>

                    {/* CARD 2: Apa Selanjutnya */}
                    <div className="card next-steps-card">
                        <h2 className="card-title">Apa Selanjutnya? Persiapan Program</h2>
                        <ol className="next-steps-list">
                            <li>
                                <span className="step-title">Cek Email Anda:</span> Kami telah memberikan panduan awal (Kit Program lengkap).
                            </li>
                            <li>
                                <span className="step-title">Grup Komunitas:</span> Tim kami akan mengundang Anda ke grup komunitas.
                            </li>
                            <li>
                                <span className="step-title">Sesi Orientasi:</span> Jadwal sesi orientasi akan diinformasikan di panduan awal.
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Tombol Kembali ke Beranda */}
                <div className="button-group-wrapper">
                    <Link to="/" className="kembali-ke-beranda-button">
                        KEMBALI KE BERANDA
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DaftarRelawanKonfirmasi;