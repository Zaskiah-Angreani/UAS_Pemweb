// src/KonfirmasiRelawanLangkah3.jsx

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './KonfirmasiRelawanLangkah3.css'; 

// ASUMSI: Data ini harusnya diambil dari state global atau context dari langkah-langkah sebelumnya.
const mockUserData = {
    programName: "Aksi Bersih Lingkungan",
    personalInfo: {
        'Nama Lengkap': "Zaskiah Angreani",
        'Email Aktif': "kiacantik@gmail.com",
        'Nomor Telepon': "081234567",
        'Alamat Lengkap': "Jalan Teladan No. 12 Blok AA",
        'Portofolio/CV': "zaskiah-angreani.pdf",
    },
    interestInfo: {
        'Divisi Yang Diminati': "Human Resource Division",
        'Motivasi Bergabung': "Alasan saya ikut program volunteer ini karena saya suka bersosialisasi dengan masyarakat, saya senang berbagi dengan orang lain, dan saya tahu program ini juga dari teman saya yaitu Zaskiah.",
    }
};

// Nama Komponen: KonfirmasiRelawanLangkah3
const KonfirmasiRelawanLangkah3 = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const { activityId } = useParams(); 
    const { programName, personalInfo, interestInfo } = mockUserData;

    const handleConfirm = () => {
        if (isAgreed) {
            alert(`Pendaftaran untuk program "${programName}" telah Selesai! Data relawan berhasil dikirim.`);
            // TODO: Lakukan submit data ke API dan navigasi ke halaman sukses
        } else {
            alert("Anda harus menyetujui syarat & ketentuan yang berlaku.");
        }
    };

    return (
        <div className="confirmation-page-wrapper">
            
            {/* --- HEADER (Tetap konsisten) --- */}
            <header className="main-header">
                <div className="header-logo-wrapper">
                    <img src={"/path/to/your/logo.png"} alt="Logo" className="header-logo" /> 
                </div>
                <nav className="header-nav">
                    <Link to="/beranda" className="nav-item">Beranda</Link>
                    <Link to="/tentang" className="nav-item">Tentang</Link>
                    <Link to="/aktivitas" className="nav-item">Aktivitas</Link>
                    <Link to="/kontak" className="nav-item">Kontak</Link>
                    <Link to="/login" className="nav-item login">Login</Link>
                </nav>
            </header>

            <div className="content-area">
                
                <h1 className="main-title-regis">Daftar Jadi Relawan Kami</h1>
                <p className="subtitle-regis">Isi formulir dibawah untuk memulai perjalanan anda sebagai bagian dari keluarga relawan kami.</p>

                {/* --- LANGKAH PROGRES --- */}
                <div className="progress-steps-container">
                    <Link to={`/register/${activityId}/step1`} className="progress-step done">Langkah 1: Informasi Pribadi</Link>
                    <Link to={`/register/${activityId}/step2`} className="progress-step done">Langkah 2: Keahlian & Minat</Link>
                    <div className="progress-step active">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>

                {/* --- KOTAK UTAMA KONFIRMASI --- */}
                <div className="confirmation-box">
                    
                    {/* 1. Program yang didaftar (Program Registered Card) */}
                    <div className="program-registered-card">
                        <div className="program-info">
                            <span className="info-label">Anda sedang mendaftar untuk program:</span>
                            <h2 className="program-name">{programName}</h2>
                        </div>
                    </div>
                    
                    <h3 className="section-title">Tinjau Ulang Data Anda</h3>

                    {/* 2. Pembagi Dua Kolom Data Review (review-details-layout) */}
                    <div className="review-details-layout">
                        
                        {/* Kiri: Informasi Pribadi */}
                        <div className="review-column personal-info">
                            <h4 className="column-header">Informasi Pribadi</h4>
                            
                            {Object.keys(personalInfo).map((key) => (
                                <div key={key} className="review-field">
                                    <label className="field-label">{key}:</label>
                                    {/* 3. Field Value Styling */}
                                    <p className="field-value">{personalInfo[key]}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Kanan: Keahlian & Minat */}
                        <div className="review-column interest-info">
                            <h4 className="column-header">Keahlian & Minat</h4>
                            
                            <div className="review-field">
                                <label className="field-label">{Object.keys(interestInfo)[0]}:</label>
                                <p className="field-value division-tag">{interestInfo['Divisi Yang Diminati']}</p>
                            </div>
                            
                            {/* 3. Motivation Field Styling (Kotak besar) */}
                            <div className="review-field motivation-field">
                                <label className="field-label">{Object.keys(interestInfo)[1]}:</label>
                                <p className="field-value motivation-text">{interestInfo['Motivasi Bergabung']}</p>
                            </div>
                        </div>

                    </div>
                    
                    {/* Persetujuan T&C */}
                    <div className="agreement-section">
                        <input 
                            type="checkbox" 
                            id="agreement" 
                            checked={isAgreed} 
                            onChange={(e) => setIsAgreed(e.target.checked)} 
                            className="agreement-checkbox"
                        />
                        <label htmlFor="agreement" className="agreement-label">
                            Saya menyetujui syarat & ketentuan yang berlaku
                        </label>
                    </div>

                </div>

                {/* --- TOMBOL AKSI --- */}
                <div className="action-buttons-footer">
                    <Link to={`/register/${activityId}/step2`} className="btn-action btn-back"> 
                        Kembali ke Langkah Sebelumnya
                    </Link>
                    <button 
                        onClick={handleConfirm}
                        className={`btn-action btn-next ${!isAgreed ? 'disabled' : ''}`}
                        disabled={!isAgreed}
                    >
                        Lanjut ke Langkah Berikutnya
                    </button>
                </div>

            </div>
        </div>
    );
};

export default KonfirmasiRelawanLangkah3;