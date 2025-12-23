import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './VolunteerDetailProgram.css'; 

import LogoImage from './assets/volunteer3.jpg'; 
import MainImage1 from './assets/volunteer4.jpg'; 

const kegiatanLengkap = [
    { 
        id: 1, 
        judul: "Profil Volunteer",
        tagline: "Belajar Ceria untuk Masa Depan",
        image: MainImage1, 
        deskripsi: "Program ini mengajak relawan untuk mendampingi anak-anak SD dalam proses belajar, mulai dari membaca, berhitung, hingga tugas sekolah. Melalui pendekatan yang menyenangkan dan interaktif, relawan membantu meningkatkan kepercayaan diri dan semangat belajar anak-anak agar mereka dapat meraih masa depan yang lebih cerah.",
        detailItems: [
            { label: "Jumlah Relawan", value: "35 Orang" },
            { label: "Tanggal Pelaksanan", value: "12 Januari 2025" },
            { label: "Lokasi", value: "Sekolah Dasar Negeri 060809, Medan" },
            { label: "Waktu Pelakasaan", value: "07.30 - 11.00" },
            { label: "Total Jam Pelaksanaan", value: "3 Jam 30 Menit" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Siswa-siswi kelas 2 SD" },
        ]
    },
     { 
        id: 2, 
        judul: "Profil Volunteer",
        tagline: "Belajar Ceria untuk Masa Depan",
        image: MainImage1, 
        deskripsi: "Program ini mengajak relawan untuk mendampingi anak-anak SD dalam proses belajar, mulai dari membaca, berhitung, hingga tugas sekolah. Melalui pendekatan yang menyenangkan dan interaktif, relawan membantu meningkatkan kepercayaan diri dan semangat belajar anak-anak agar mereka dapat meraih masa depan yang lebih cerah.",
        detailItems: [
            { label: "Jumlah Relawan", value: "35 Orang" },
            { label: "Tanggal Pelaksanan", value: "12 Januari 2025" },
            { label: "Lokasi", value: "Sekolah Dasar Negeri 060809, Medan" },
            { label: "Waktu Pelakasaan", value: "07.30 - 11.00" },
            { label: "Total Jam Pelaksanaan", value: "3 Jam 30 Menit" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Siswa-siswi kelas 2 SD" },
        ]
    },
     { 
        id: 3, 
        judul: "Profil Volunteer",
        tagline: "Belajar Ceria untuk Masa Depan",
        image: MainImage1, 
        deskripsi: "Program ini mengajak relawan untuk mendampingi anak-anak SD dalam proses belajar, mulai dari membaca, berhitung, hingga tugas sekolah. Melalui pendekatan yang menyenangkan dan interaktif, relawan membantu meningkatkan kepercayaan diri dan semangat belajar anak-anak agar mereka dapat meraih masa depan yang lebih cerah.",
        detailItems: [
            { label: "Jumlah Relawan", value: "35 Orang" },
            { label: "Tanggal Pelaksanan", value: "12 Januari 2025" },
            { label: "Lokasi", value: "Sekolah Dasar Negeri 060809, Medan" },
            { label: "Waktu Pelakasaan", value: "07.30 - 11.00" },
            { label: "Total Jam Pelaksanaan", value: "3 Jam 30 Menit" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Siswa-siswi kelas 2 SD" },
        ]
    },
];

const VolunteerDetailProgram = () => {
    const { id } = useParams();
    const kegiatan = kegiatanLengkap.find(k => k.id === 1); 
    
    if (!kegiatan) {
        return (
            <div className="detail-page-wrapper" style={{textAlign: 'center', paddingTop: '150px'}}>
                <h1>Kegiatan Detail Tidak Ditemukan</h1>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    return (
        <div className="detail-page-wrapper">
           
            <header className="main-header">
                <div className="header-logo-wrapper">
                    <img src={LogoImage} alt="Logo" className="header-logo" />
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
                
                <h1 className="main-title">{kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline}</h2>
              
                <section className="summary-section">
                    <img src={kegiatan.image} alt={kegiatan.judul} className="summary-image" />
                    <p className="description-text">
                        {kegiatan.deskripsi}
                    </p>
                </section>

                <section className="detail-list">
                    {kegiatan.detailItems.map((item, index) => (
                        <div key={index} className="detail-row">
                            <span className="detail-label">{item.label}:</span>
                            <span className="detail-value">{item.value}</span>
                        </div>
                    ))}
                </section>
                
                <div className="button-footer">
                    <Link to="/volunteer-terealisasi" className="back-button">
                        Kembali
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default VolunteerDetailProgram;