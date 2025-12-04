// src/VolunteerTerealisasi.jsx (KODE AKHIR YANG SUDAH DIPERBAIKI GAMBAR)

import React from 'react';
import { Link } from 'react-router-dom';
import './VolunteerTerealisasi.css'; 

// --- 1. IMPORT ASSETS (Harus ada di src/assets) ---
import ImageVolunteer8 from './assets/volunteer8.jpeg'; 
import ImageVolunteer9 from './assets/volunteer9.jpg'; 
import ImageVolunteer10 from './assets/volunteer10.webp'; 

// --- 2. DATA CONTOH (MOCK DATA) ---
const kegiatanSelesai = [
    { 
        id: 1, 
        judul: "Aksi Bersih Pantai Serang: Menjaga Laut Kita",
        lokasi: "Pantai Serang, Blitar",
        tanggal: "12 Feb 2024",
        // ✅ Menggunakan variabel yang diimpor
        image: ImageVolunteer8, 
        deskripsiSingkat: "Berhasil mengumpulkan 500kg sampah plastik dan mengedukasi masyarakat lokal.",
    },
    { 
        id: 2, 
        judul: "Edukasi Tani Mandiri di Desa Sukamaju",
        lokasi: "Desa Sukamaju, Malang",
        tanggal: "05 Mar 2024",
        image: ImageVolunteer9, // ✅ Menggunakan variabel yang diimpor
        deskripsiSingkat: "Meningkatkan pengetahuan petani tentang teknik irigasi hemat air dan pupuk organik.",
    },
    { 
        id: 3, 
        judul: "Program Bedah Rumah Lansia Kurang Mampu",
        lokasi: "Kampung Cipedak, Jakarta",
        tanggal: "21 Apr 2024",
        image: ImageVolunteer10, // ✅ Menggunakan variabel yang diimpor
        deskripsiSingkat: "Sukarelawan merenovasi total dua rumah lansia agar layak huni dan aman.",
    },
];

const VolunteerTerealisasi = () => {
    return (
        <div className="terealisasi-page-container">
            <header className="terealisasi-header">
                <h1>Kegiatan Sukarelawan Terealisasi</h1>
                <p>Lihat dampak nyata dari setiap aksi yang telah kita lakukan bersama.</p>
            </header>

            <div className="kegiatan-list-grid">
                {kegiatanSelesai.map((kegiatan) => (
                    <Link 
                        key={kegiatan.id} 
                        to={`/volunteer-terealisasi/detail/${kegiatan.id}`} 
                        className="kegiatan-card-link"
                    >
                        <div className="kegiatan-terealisasi-card">
                            
                            <div className="card-image-wrapper">
                                {/* ✅ Menggunakan properti 'image' yang berisi path impor */}
                                <img src={kegiatan.image} alt={kegiatan.judul} className="card-image"/> 
                            </div>
                            
                            <div className="card-content">
                                <h2>{kegiatan.judul}</h2>
                                <p className="card-meta">
                                    <span>📅 {kegiatan.tanggal}</span> | 
                                    <span> 📍 {kegiatan.lokasi}</span>
                                </p>
                                <p className="card-deskripsi">{kegiatan.deskripsiSingkat}</p>
                                
                                <div className="button-wrapper-right">
                                    <button className="detail-button">
                                        DETAIL 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VolunteerTerealisasi;