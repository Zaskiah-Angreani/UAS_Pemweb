import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './VolunteerDetailProgram.css'; 

// Data tetap dipertahankan agar fungsi .find() berjalan
const kegiatanLengkap = [
    { 
        id: 1, 
        judul: "Profil Volunteer",
        tagline: "Belajar Ceria untuk Masa Depan",
        deskripsi: "Program ini mengajak relawan untuk mendampingi anak-anak SD dalam proses belajar, mulai dari membaca, berhitung, hingga tugas sekolah. Melalui pendekatan yang menyenangkan dan interaktif, relawan membantu meningkatkan kepercayaan diri dan semangat belajar anak-anak agar mereka dapat meraih masa depan yang lebih cerah.",
        detailItems: [
            { label: "Jumlah Relawan", value: "35 Orang" },
            { label: "Tanggal Pelaksanaan", value: "12 Januari 2025" },
            { label: "Lokasi", value: "Sekolah Dasar Negeri 060809, Medan" },
            { label: "Waktu Pelaksanaan", value: "07.30 - 11.00" },
            { label: "Total Jam Pelaksanaan", value: "3 Jam 30 Menit" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Siswa-siswi kelas 2 SD" },
        ]
    },
    { 
        id: 2, 
        judul: "Relawan Mengajar Anak Desa",
        tagline: "Membangun Literasi dari Pelosok",
        deskripsi: "Membantu anak-anak belajar membaca dan memberikan motivasi pendidikan di area Bogor.",
        detailItems: [
            { label: "Jumlah Relawan", value: "10 Orang" },
            { label: "Tanggal Pelaksanaan", value: "10 Januari 2026" },
            { label: "Lokasi", value: "Bogor, Jawa Barat" },
            { label: "Waktu Pelaksanaan", value: "09.00 - 15.00" },
            { label: "Total Jam Pelaksanaan", value: "6 Jam" },
            { label: "Status Program", value: "Selesai" },
            { label: "Jumlah Penerima Manfaat", value: "Anak-anak Desa" },
        ]
    }
];

const VolunteerDetailProgram = () => {
    const { id } = useParams();
    
    // Mencari kegiatan berdasarkan ID dari URL secara dinamis
    const kegiatan = kegiatanLengkap.find(k => k.id === parseInt(id)); 
    
    if (!kegiatan) {
        return (
            <div className="detail-page-wrapper" style={{textAlign: 'center', paddingTop: '50px'}}>
                <h1>Detail Kegiatan Tidak Ditemukan</h1>
                <Link to="/volunteer-terealisasi">Kembali ke Daftar Kegiatan</Link>
            </div>
        );
    }

    return (
        <div className="detail-page-wrapper">
            {/* Header telah dihapus sesuai permintaan */}
            
            <div className="content-area">
                <h1 className="main-title">{kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline}</h2>
              
                <section className="summary-section">
                    {/* Gambar dihapus dari tampilan sesuai permintaan */}
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