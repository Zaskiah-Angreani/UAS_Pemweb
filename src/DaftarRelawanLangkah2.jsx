// src/DaftarRelawanLangkah2.jsx (Langkah 2: Keahlian & Minat - VERSI PERBAIKAN TRANSFER DATA)

import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { activitiesData } from './Aktivitas.jsx'; 
import './DaftarRelawan.css'; 

// --- DAFTAR PILIHAN UNTUK FORM (DARI SNIPPET FILE LAMA) ---
const KeahlianList = ['Desain Grafis', 'Public Speaking', 'Photography', 'Lainnya'];
const KomitmenList = ['4-8 jam/minggu', 'Fleksibel', '1-2 jam/minggu', '1-3 jam/minggu'];
const DivisiList = [
    { value: 'PR', label: 'Public Relation' },
    { value: 'Partnership', label: 'Partnership & Sponshorship' },
    { value: 'SMM', label: 'Social Media Management' },
    { value: 'HRD', label: 'Human Resource Division' },
    { value: 'TT', label: 'Team Teaching' }
];

const DaftarRelawanLangkah2 = () => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Gunakan useLocation
    
    // 1. Ambil data dari Langkah 1
    const dataFromStep1 = location.state?.dataStep1 || {};
    // Ambil data Langkah 2 jika ada (saat pengguna kembali dari Langkah 3 atau Langkah 1)
    const dataInitialStep2 = location.state?.dataStep2 || {};
    
    // Cari data aktivitas
    const activity = activitiesData.find(act => act.id === parseInt(activityId));
    const programTitle = activity ? activity.title.toUpperCase() : "PROGRAM TIDAK DITEMUKAN";

    // 2. State lokal untuk data Langkah 2, diisi dengan data awal jika ada
    const [formDataStep2, setFormDataStep2] = useState({
        keahlian: dataInitialStep2.keahlian || [], 
        komitmen: dataInitialStep2.komitmen || '', 
        portofolio: null, // File upload tidak bisa dikirim via state
        divisi: dataInitialStep2.divisi || '', 
        motivasi: dataInitialStep2.motivasi || '', 
    });
    
    // Fungsi untuk navigasi ke Langkah 3
    const handleLanjut = (e) => {
        e.preventDefault();
        
        // VALIDASI Sederhana (Opsional, tapi disarankan)
        if (!formDataStep2.komitmen || !formDataStep2.divisi || !formDataStep2.motivasi || formDataStep2.keahlian.length === 0) {
             alert("Mohon lengkapi semua kolom wajib di Langkah 2 (Keahlian, Komitmen, Divisi, dan Motivasi)!");
             return;
        }

        // 3. Gabungkan data Langkah 1 dan Langkah 2
        // NOTE: File Portofolio (formDataStep2.portofolio) hanya referensi objek File di browser.
        // Dalam aplikasi nyata, file ini akan diunggah ke server sebelum navigasi.
        const finalData = {
            ...dataFromStep1, // Data Pribadi
            ...formDataStep2, // Data Keahlian/Minat
        };
        
        // 4. Kirim data gabungan ke Langkah 3
        navigate(`/konfirmasi/${activityId}`, { 
            state: { finalData: finalData } 
        }); 
    };

    // Fungsi untuk navigasi kembali ke Langkah 1
    const handleKembali = () => {
        // 5. Kirim data Langkah 1 & Langkah 2 saat kembali agar form Langkah 1 terisi
        navigate(`/daftar/${activityId}`, { 
            state: { dataStep1: dataFromStep1, dataStep2: formDataStep2 } 
        }); 
    };
    
    // Fungsi handle perubahan input (untuk form control yang sebenarnya)
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormDataStep2(prev => ({ 
                ...prev,
                keahlian: checked 
                    ? [...prev.keahlian, value]
                    : prev.keahlian.filter(k => k !== value)
            }));
        } else if (type === 'file') {
            setFormDataStep2(prev => ({ ...prev, [name]: files[0] })); 
        } else {
            setFormDataStep2(prev => ({ ...prev, [name]: value })); 
        }
    };

    return (
        <div className="frame-9 daftar-relawan-page">
            
            {/* --- HEADER NAVIGASI (SAMA DENGAN DaftarRelawan.jsx) --- */}
            <div className="header-section">
                <h1 className="daftar-jadi-relawan-kami">Daftar Jadi Relawan Kami!</h1>
                <div className="frame-56">
                    <div className="logo-text">RELADIKA</div>
                    <nav className="nav-links">
                        <Link to="/" className="nav-link">HOME</Link>
                        <Link to="/aktivitas" className="nav-link">AKTIVITAS</Link>
                        <Link to="/volunteer-terealisasi" className="nav-link">VOLUNTEER</Link>
                    </nav>
                </div>
            </div>

            {/* --- STEPPER --- */}
            <div className="step-navigation">
                <div className="step-item completed-step">
                    <span className="step-number">1</span>
                    <span className="step-label">Informasi Pribadi</span>
                </div>
                <div className="step-separator completed"></div>
                <div className="step-item active-step">
                    <span className="step-number">2</span>
                    <span className="step-label">Keahlian & Komitmen</span>
                </div>
                <div className="step-separator"></div>
                <div className="step-item">
                    <span className="step-number">3</span>
                    <span className="step-label">Konfirmasi</span>
                </div>
            </div>

            {/* --- INFO PROGRAM --- */}
            <div className="program-info-box card-shadow">
                <p className="program-title-label">Program yang Anda Pilih:</p>
                <h2 className="program-title-value">{programTitle}</h2>
            </div>

            {/* --- FORMULIR UTAMA --- */}
            <form onSubmit={handleLanjut} className="group-84 form-container">
                <div className="group-166 form-box">

                    {/* Langkah 2: Keahlian & Minat */}
                    <div className="group-164 form-step-2">
                        <h4 className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</h4>
                        
                        <div className="step-2-content-grid">
                            <div className="column-left column-grid-2x2">
                                
                                {/* 1. Keahlian Utama (Checkbox) */}
                                <div className="input-group keahlian-group card-shadow full-grid-width">
                                    <label>Keahlian Utama (Pilih Maksimal 3)</label>
                                    <div className="selection-group grid-options">
                                        {KeahlianList.map(skill => (
                                            <label key={skill} className="selection-box checkbox-item">
                                                <input type="checkbox" name="keahlian" value={skill} 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.keahlian.includes(skill)}/>
                                                <span className="option-label">{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 2. Komitmen Waktu (Radio) */}
                                <div className="input-group commitment-group card-shadow">
                                    <label>Komitmen Waktu (Pilih 1)</label>
                                    <div className="selection-group">
                                        {KomitmenList.map(commitment => (
                                            <label key={commitment} className="selection-box radio-item">
                                                <input type="radio" name="komitmen" value={commitment} required 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.komitmen === commitment} />
                                                <span className="option-label">{commitment}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 3. Divisi yang Diminati (Radio) */}
                                <div className="input-group divisi-group card-shadow">
                                    <label>Pilihan Divisi (Pilih 1)</label>
                                    <div className="selection-group">
                                        {DivisiList.map(divisi => (
                                            <label key={divisi.value} className="selection-box radio-item">
                                                <input type="radio" name="divisi" value={divisi.label} required 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.divisi === divisi.label} />
                                                <span className="option-label">{divisi.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* KOLOM KANAN: Motivasi & Portofolio */}
                            <div className="column-right">
                                
                                {/* 4. Motivasi Bergabung (Textarea) */}
                                <div className="input-group motivation-group card-shadow">
                                    <label htmlFor="motivasi">Motivasi Bergabung (Min. 50 kata)*</label>
                                    <textarea id="motivasi" name="motivasi" className="textarea-full-height" required 
                                            placeholder="Jelaskan alasan kuat Anda ingin bergabung..."
                                            value={formDataStep2.motivasi}
                                            onChange={handleChange}/>
                                </div>
                                
                                {/* 5. Portofolio / CV (File Upload) */}
                                <div className="input-group file-upload-group card-shadow">
                                    <label htmlFor="portofolio" className="portofolio-cv-wajib">Portofolio / CV (Wajib)*</label>
                                    <input id="portofolio" name="portofolio" type="file" required 
                                            onChange={handleChange}/>
                                    <p className="file-info-text">
                                        {formDataStep2.portofolio ? `File terpilih: ${formDataStep2.portofolio.name}` : 'Maks. 5MB (PDF/DOCX/JPG/PNG)'}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    {/* Tombol Navigasi (Kembali & Lanjut) */}
                    <div className="button-group-wrapper"> 
                        <div className="group-57 back-step-button-wrapper"> 
                            <button type="button" onClick={handleKembali} className="back-step-button">
                                KEMBALI KE LANGKAH SEBELUMNYA
                            </button>
                        </div>
                        <div className="group-57 next-step-button-wrapper"> 
                            <button type="submit" className="next-step-button">
                                LANJUT KE LANGKAH BERIKUTNYA
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default DaftarRelawanLangkah2;