// src/DaftarRelawan.jsx (VERSI DIPERBAHARUI DENGAN NAVIGASI KE LANGKAH 2)

import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'; // Menambahkan useLocation untuk getLinkClass
import { activitiesData } from './Aktivitas.jsx'; 
import './DaftarRelawan.css'; 

const DaftarRelawan = () => {
    const { activityId } = useParams();
    const navigate = useNavigate(); // <-- Panggil hook useNavigate
    const location = useLocation(); // <-- Panggil hook useLocation
    const activity = activitiesData.find(act => act.id === parseInt(activityId));

    // Fallback jika program tidak ditemukan
    const programTitle = activity ? activity.title.toUpperCase() : "PROGRAM TIDAK DITEMUKAN";

    const getLinkClass = (path) => {
        return location.pathname.startsWith(path) ? 'active-link' : '';
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        
        // TODO: Tambahkan validasi form di sini sebelum navigasi
        
        // ✅ Ganti alert dengan navigasi ke Langkah 2
        navigate(`/keahlian/${activityId}`);
    };

    return (
        <div className="frame-8 daftar-relawan-page">
            
            {/* --- HEADER / NAVIGASI (frame-56) TELAH DIHAPUS --- */}
            {/* <header className="frame-56">
                <h1 className="logo-text">SatuAksi</h1>
                <nav className="nav-links">
                    <Link to="/tentang" className={`tentang ${getLinkClass('/tentang')}`}>Tentang</Link>
                    <Link to="/" className={`beranda ${getLinkClass('/')}`}>Beranda</Link>
                    <Link to="/aktivitas" className={`aktivitas ${getLinkClass('/aktivitas')}`}>Aktivitas</Link>
                    <Link to="/kontak" className={`kontak ${getLinkClass('/kontak')}`}>Kontak</Link>
                </nav>
                <div className="login-button">Login</div>
            </header>
            */}
            
            {/* --- JUDUL HALAMAN --- */}
            <section className="group-74 header-section">
                <h2 className="daftar-jadi-relawan-kami">Daftar Jadi Relawan Kami</h2>
                <p className="isi-formulir-dibawah-untuk-memulai-perjalanan-anda-sebagai-bagian-dari-keluarga-relawan-kami">
                    Isi formulir dibawah untuk memulai perjalanan anda
                    <br />
                    sebagai bagian dari keluarga relawan kami.
                </p>
            </section>

            {/* --- STEPPER / PROGRESS BAR --- */}
            <section className="stepper-section">
                <div className="group-58 stepper-item active-step">
                    <div className="rectangle-48 checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1: Informasi Pribadi</div>
                </div>
                <div className="group-61 stepper-item">
                    <div className="rectangle-483">2</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</div>
                </div>
                <div className="group-62 stepper-item">
                    <div className="rectangle-482">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>
            </section>

            {/* --- FORMULIR UTAMA --- */}
            <form onSubmit={handleNextStep} className="group-84 form-container">
                <div className="group-82 form-box">
                    
                    {/* Program yang Didaftarkan (Info Card) */}
                    <div className="group-76 registration-info-card">
                        <div className="group-75">
                            <p className="anda-sedang-mendaftar-untuk-program">
                                Anda Sedang Mendaftar Untuk Program:
                            </p>
                            <h3 className="rumah-belajar-starban">{programTitle}</h3>
                        </div>
                    </div>

                    {/* Langkah 1: Informasi Pribadi (Form Section) */}
                    <div className="group-80 form-step-1">
                        <h4 className="langkah-1-informasi-pribadi">Langkah 1: Informasi Pribadi</h4>
                        
                        <div className="input-group-grid">
                            
                            <div className="input-group group-174">
                                <label htmlFor="fullName">Nama Lengkap</label>
                                <input id="fullName" type="text" placeholder="Masukkan nama lengkap Anda" />
                            </div>
                            
                            <div className="input-group group-51">
                                <label htmlFor="birthDate">Tanggal Lahir</label>
                                <input id="birthDate" type="date" />
                            </div>
                            
                            <div className="input-group group-52">
                                <label htmlFor="gender">Jenis Kelamin</label>
                                <select id="gender">
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            
                            <div className="input-group group-53">
                                <label htmlFor="email">Alamat Email</label>
                                <input id="email" type="email" placeholder="contoh@mail.com" />
                            </div>
                            
                            <div className="input-group group-54">
                                <label htmlFor="phone">Nomor Telepon</label>
                                <input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                            </div>
                            
                            <div className="input-group group-55">
                                <label htmlFor="profession">Profesi/Pekerjaan Saat ini</label>
                                <input id="profession" type="text" placeholder="Mahasiswa/Karyawan/Lainnya" />
                            </div>

                            {/* Alamat Lengkap - Lebar Penuh (full-width) */}
                            <div className="input-group group-50 full-width">
                                <label htmlFor="address">Alamat Lengkap</label>
                                <textarea id="address" rows="3" placeholder="Alamat tinggal Anda saat ini"></textarea>
                            </div>

                            {/* Baris bawah */}
                            <div className="input-group group-51">
                                <label htmlFor="domicile">Domisili Saat Ini (Kota/Kabupaten)*</label>
                                <input id="domicile" type="text" required placeholder="Contoh: Medan" />
                            </div>
                            
                            <div className="input-group group-52">
                                <label htmlFor="institution">Instansi/Universitas (Opsional)</label>
                                <input id="institution" type="text" placeholder="Nama Instansi" />
                            </div>
                            
                            <div className="input-group group-53">
                                <label htmlFor="source">Sumber Info Program Ini</label>
                                <select id="source">
                                    <option value="">Pilih Sumber Informasi</option>
                                    <option value="IG">Instagram</option>
                                    <option value="WEB">Website SatuAksi</option>
                                    <option value="TEMAN">Teman/Keluarga</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Lanjut */}
                    <div className="group-57 next-step-button-wrapper">
                        <button type="submit" className="group-81 next-step-button">
                            <div className="lanjut-ke-langkah-berikutnya">
                                LANJUT KE LANGKAH BERIKUTNYA
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DaftarRelawan;