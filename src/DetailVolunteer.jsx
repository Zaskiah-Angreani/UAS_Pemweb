// src/DetailVolunteer.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailVolunteer.css'; 

// --- IMPORT ASSETS (Pastikan file gambar ini ada di folder Anda) ---
import MainImage1 from './assets/volunteer8.jpeg'; 
// Menambahkan import untuk 2 event baru
import ImageVolunteer9 from './assets/volunteer9.jpg'; 
import ImageVolunteer10 from './assets/volunteer10.webp'; 

// --- MOCK DATA (Kini berisi 3 Event) ---
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
    // --- EVENT BARU 2: Teknologi & Edukasi ---
    { 
        id: 2, 
        judul: "Digital Mentor: Pelatihan Coding untuk Remaja",
        tagline: "Membentuk Generasi Digital yang Kompeten",
        image: ImageVolunteer9, 
        deskripsi: "Program ini berfokus pada pemberian pelatihan dasar coding dan literasi digital kepada remaja di panti asuhan. Relawan akan menjadi mentor yang membimbing peserta dari konsep dasar hingga proyek sederhana. Tujuannya adalah membuka peluang karir di bidang teknologi bagi mereka yang kurang beruntung.",
        detailItems: [
            { label: "Jumlah Relawan", value: "20 Orang" },
            { label: "Tanggal Pelaksanan", value: "5 Maret 2025" },
            { label: "Lokasi", value: "Panti Asuhan Sinar Harapan, Jakarta" },
            { label: "Waktu Pelakasaan", value: "14.00 - 17.00" },
            { label: "Total Jam Pelaksanaan", value: "3 Jam" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "30 Remaja (Usia 15-18)" },
        ]
    },
    // --- EVENT BARU 3: Lingkungan ---
    { 
        id: 3, 
        judul: "Tanam 1000 Pohon di Hutan Kota",
        tagline: "Aksi Nyata Menghijaukan Lingkungan",
        image: ImageVolunteer10, 
        deskripsi: "Kegiatan penanaman kembali 1000 bibit pohon di area hutan kota yang terdampak erosi. Relawan akan bertugas mulai dari persiapan lahan, penanaman, hingga sosialisasi perawatan pohon kepada masyarakat sekitar. Program ini mendukung upaya mitigasi perubahan iklim di tingkat lokal.",
        detailItems: [
            { label: "Jumlah Relawan", value: "50 Orang" },
            { label: "Tanggal Pelaksanan", value: "22 April 2025" },
            { label: "Lokasi", value: "Hutan Kota Sentosa, Bandung" },
            { label: "Waktu Pelakasaan", value: "08.00 - 12.00" },
            { label: "Total Jam Pelaksanaan", value: "4 Jam" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Lingkungan dan Masyarakat Lokal" },
        ]
    }
];

const DetailVolunteer = () => {
    const { id } = useParams();
    // Gunakan parseInt(id) untuk mencocokkan ID
    const kegiatan = kegiatanLengkap.find(k => k.id === parseInt(id)); 
    
    if (!kegiatan) {
        return (
            <div className="detail-page-wrapper" style={{textAlign: 'center', paddingTop: '80px'}}>
                <h1>Kegiatan Detail Tidak Ditemukan</h1>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    return (
        <div className="detail-page-wrapper">
            
            <div className="content-area">
                
                {/* Judul utama, akan sangat dekat dengan navbar utama aplikasi */}
                <h1 className="main-title">{kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline}</h2>
                
                {/* Bagian Gambar dan Deskripsi */}
                <section className="summary-section">
                    <img src={kegiatan.image} alt={kegiatan.judul} className="summary-image" />
                    <p className="description-text">
                        {kegiatan.deskripsi}
                    </p>
                </section>

                {/* Detail Data Kegiatan */}
                <section className="detail-list-container"> 
                    <h3 className="detail-list-title">Detail Pelaksanaan Program</h3>
                    <div className="detail-list">
                        {kegiatan.detailItems.map((item, index) => (
                            <div key={index} className="detail-row">
                                <span className="detail-label">{item.label}</span>
                                <span className="detail-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Tombol Kembali */}
                <div className="button-footer">
                    <Link to="/volunteer-terealisasi" className="back-button">
                        ← Kembali ke Daftar Program
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DetailVolunteer;