import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailVolunteer.css'; 

import MainImage1 from './assets/volunteer8.jpg'; 
import ImageVolunteer9 from './assets/volunteer9.jpg'; 
import ImageVolunteer10 from './assets/volunteer10.jpg'; 

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
        judul: "Aksi Bersih Lingkungan: Jaga Alam Kita.",
        tagline: "Setiap aksi kecil yang dilakukan membawa dampak besar bagi bumi yang lebih sehat.",
        image: ImageVolunteer9, 
        deskripsi: "Program ini mengajak relawan untuk bersama-sama membersihkan area alam yang tercemar sampah. Melalui kegiatan gotong royong ini, para relawan berkontribusi menjaga keindahan dan kebersihan lingkungan, sekaligus meningkatkan kesadaran masyarakat tentang pentingnya menjaga kelestarian alam. Setiap aksi kecil yang dilakukan membawa dampak besar bagi bumi yang lebih sehat.",
        detailItems: [
            { label: "Jumlah Relawan", value: "30 Orang" },
            { label: "Tanggal Pelaksanan", value: "4 November 2024" },
            { label: "Lokasi", value: "Taman Wisata Alam (TWA) Sibolangit" },
            { label: "Waktu Pelakasaan", value: "08.00 - 14.00" },
            { label: "Total Jam Pelaksanaan", value: "6 Jam" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Masyarakat sekitar" },
        ]
    },
   
    { 
        id: 3, 
        judul: "Pantai Bersih, Laut Terjaga",
        tagline: "pentingnya menjaga kebersihan lingkungan pesisir.",
        image: ImageVolunteer10, 
        deskripsi: "Program ini mengajak relawan untuk bersama-sama membersihkan area pantai dari sampah plastik dan limbah yang mencemari lingkungan. Melalui kerja sama dan kepedulian, kegiatan ini bertujuan menjaga keindahan pantai, melindungi ekosistem laut, serta meningkatkan kesadaran masyarakat tentang pentingnya menjaga kebersihan lingkungan pesisir.",
        detailItems: [
            { label: "Jumlah Relawan", value: "50 Orang" },
            { label: "Tanggal Pelaksanan", value: "1 Februari 2025" },
            { label: "Lokasi", value: "Pantai Bali Lestari, Serdang Bedagai" },
            { label: "Waktu Pelakasaan", value: "07.00 - 12.00" },
            { label: "Total Jam Pelaksanaan", value: " 5 Jam" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Lingkungan dan Masyarakat Lokal" },
        ]
    }
];

const DetailVolunteer = () => {
    const { id } = useParams();
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
                
                <h1 className="main-title">{kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline}</h2>
                
                <section className="summary-section">
                    <img src={kegiatan.image} alt={kegiatan.judul} className="summary-image" />
                    <p className="description-text">
                        {kegiatan.deskripsi}
                    </p>
                </section>

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