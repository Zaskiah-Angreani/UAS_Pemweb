// src/KonfirmasiPendaftaran.jsx (Langkah 3: Konfirmasi & Persetujuan - FINAL FIX)

import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { activitiesData } from './Aktivitas.jsx'; // Asumsi file ini ada
import './DaftarRelawan.css'; // Asumsi file styling ini ada

const KonfirmasiPendaftaran = () => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 

    // 1. Ambil data gabungan (finalData) dari Langkah 2
    const formData = location.state?.finalData || {}; 
    
    // Fallback data
    const activity = activitiesData.find(act => act.id === parseInt(activityId));
    const programTitle = activity ? activity.title.toUpperCase() : "PROGRAM TIDAK DITEMUKAN";

    // Mengubah array Keahlian menjadi string yang dipisahkan koma
    const keahlianString = Array.isArray(formData.keahlian) ? formData.keahlian.join(', ') : (formData.keahlian || '-');

    // Fungsi untuk kembali ke Langkah 2
    const handleBackStep = () => {
        // 2. Bagi data gabungan menjadi data Langkah 1 dan Langkah 2
        // Penting: Membagi data agar Langkah 2 dapat mengisi ulang formnya (persistency)
        const dataStep1ToPassBack = {
            namaLengkap: formData.namaLengkap,
            email: formData.email,
            noTelepon: formData.noTelepon,
            domisili: formData.domisili,
            alamatLengkap: formData.alamatLengkap,
            tanggalLahir: formData.tanggalLahir,
            gender: formData.gender,
            institution: formData.institution,
            source: formData.source,
        };
        const dataStep2ToPassBack = {
            keahlian: formData.keahlian,
            komitmen: formData.komitmen,
            divisi: formData.divisi,
            motivasi: formData.motivasi,
            // Portofolio (file) tidak perlu dikirim
        };
        
        // ✅ Navigasi eksplisit kembali ke rute Langkah 2 dengan membawa data
        navigate(`/keahlian/${activityId}`, { 
            state: { 
                dataStep1: dataStep1ToPassBack, // Untuk persistency data Langkah 1 jika user kembali dari Langkah 2
                dataStep2: dataStep2ToPassBack // Untuk mengisi ulang form Langkah 2
            }
        });
    };

    // Fungsi untuk Submit/Selesai
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan Final Submission data (formData) ke API di sini
        alert("Pendaftaran berhasil dikirim! Data yang dikirim:\n" + JSON.stringify(formData, null, 2));
        // TODO: Ganti dengan navigasi ke halaman sukses
    };

    return (
        <div className="frame-8 daftar-relawan-page">
            
            {/* --- JUDUL HALAMAN (SAMA) --- */}
            <section className="group-74 header-section">
                <h2 className="daftar-jadi-relawan-kami">Daftar Jadi Relawan Kami</h2>
                <p className="isi-formulir-dibawah-untuk-memulai-perjalanan-anda-sebagai-bagian-dari-keluarga-relawan-kami">
                    Review dan Konfirmasi data Anda sebelum mengirim pendaftaran.
                </p>
            </section>

            {/* --- STEPPER / PROGRESS BAR (Langkah 3 = Active) --- */}
            <section className="stepper-section">
                <div className="group-58 stepper-item completed-step">
                    <div className="checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1: Informasi Pribadi</div>
                </div>
                <div className="group-61 stepper-item completed-step">
                    <div className="checkmark">✅</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</div>
                </div>
                <div className="group-62 stepper-item active-step">
                    <div className="rectangle-483">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>
            </section>

            {/* --- FORMULIR KONFIRMASI (LANGKAH 3) --- */}
            <form onSubmit={handleSubmit} className="card-shadow step-3-confirmation">
                
                {/* Info Program (Ringkas) - SAMA */}
                <div className="program-info-card">
                    <div>
                        <p className="program-info-title">Program yang Anda Daftarkan</p>
                        <h3 className="program-info-name">{programTitle}</h3>
                    </div>
                    <div className="program-checkmark">✔️</div>
                </div>

                {/* Bagian Review Data */}
                <h4 className="review-section-title">Review Data Pendaftaran Anda</h4>
                
                <div className="review-data-layout">
                    
                    {/* KOLOM KIRI: Data Pribadi (Ambil dari State) */}
                    <div className="review-group-data kolom-kiri">
                        <h5 className="review-group-title">Informasi Pribadi</h5>
                        
                        <div className="review-data-row">
                            <p className="review-label">Nama Lengkap</p>
                            <p className="review-value">{formData.namaLengkap || '-'}</p>
                        </div>
                        <div className="review-data-row">
                            <p className="review-label">Alamat Email</p>
                            <p className="review-value">{formData.email || '-'}</p>
                        </div>
                        <div className="review-data-row">
                            <p className="review-label">Nomor Telepon</p>
                            <p className="review-value">{formData.noTelepon || '-'}</p>
                        </div>
                        <div className="review-data-row">
                            <p className="review-label">Tanggal Lahir / JK</p>
                            <p className="review-value">{formData.tanggalLahir ? `${formData.tanggalLahir} (${formData.gender || '-'})` : '-'}</p>
                        </div>
                        <div className="review-data-row">
                            <p className="review-label">Domisili / Instansi</p>
                            <p className="review-value">{formData.domisili || '-'} / {formData.institution || 'Tidak ada'}</p>
                        </div>
                        <div className="review-data-row full-width-review">
                            <p className="review-label">Alamat Lengkap</p>
                            <p className="review-value">{formData.alamatLengkap || '-'}</p>
                        </div>
                    </div>
                    
                    <div className="review-data-separator"></div>

                    {/* KOLOM KANAN: Keahlian & Motivasi (Ambil dari State) */}
                    <div className="review-group-data kolom-kanan">
                        <h5 className="review-group-title">Keahlian & Minat</h5>
                        
                        <div className="review-data-row">
                            <p className="review-label">Keahlian Utama</p>
                            <p className="review-value">{keahlianString}</p>
                        </div>
                        <div className="review-data-row">
                            <p className="review-label">Komitmen Waktu</p>
                            <p className="review-value">{formData.komitmen || '-'}</p>
                        </div>
                         <div className="review-data-row">
                            <p className="review-label">Pilihan Divisi</p>
                            <p className="review-value">{formData.divisi || '-'}</p>
                        </div>
                        
                        <div className="review-data-row full-width-review">
                            <p className="review-label">Motivasi Bergabung</p>
                            <div className="review-motivasi-box">{formData.motivasi || 'Tidak ada motivasi yang diisi.'}</div>
                        </div>
                        
                    </div>
                </div>

                {/* Persetujuan - SAMA */}
                <div className="agreement-section">
                    <div className="agreement-checkbox-wrapper">
                        <input type="checkbox" id="agreement" required />
                        <label htmlFor="agreement" className="agreement-text">
                            Saya menyatakan bahwa semua data di atas adalah benar dan menyetujui syarat & ketentuan relawan.
                        </label>
                    </div>
                </div>

                {/* Tombol Navigasi (Kembali & Kirim) */}
                <div className="button-group-wrapper">
                    <div className="group-57">
                        <button type="button" onClick={handleBackStep} className="back-step-button">
                            KEMBALI KE LANGKAH SEBELUMNYA
                        </button>
                    </div>
                    <div className="group-57">
                        <button type="submit" className="next-step-button">
                            KIRIM PENDAFTARAN
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default KonfirmasiPendaftaran;