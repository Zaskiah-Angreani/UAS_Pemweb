import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Context Provider
import { AuthProvider } from './AuthContext'; 

// Import Komponen UI Global
import Navbar from './Navbar.jsx'; 

// Import Halaman Utama
import Home from './Home.jsx';
import Tentang from './Tentang.jsx'; 
import Aktivitas from './Aktivitas.jsx'; 
import Kontak from './Kontak.jsx'; 

// Import Halaman Pendaftaran & Detail Aktivitas (Kegiatan Aktif)
import DetailAktivitas from './DetailAktivitas.jsx'; 
import DaftarRelawan from './DaftarRelawan.jsx';
import DaftarRelawanLangkah2 from './DaftarRelawanLangkah2.jsx'; 
import DaftarRelawanKonfirmasi from './DaftarRelawanKonfirmasi.jsx'; 
import KonfirmasiPendaftaran from './KonfirmasiPendaftaran.jsx'; 

// Import Halaman Autentikasi
import LoginPage from './LoginPage.jsx'; 
import RegisterPage from './RegisterPage.jsx'; 

// Import Halaman Volunteer yang Sudah Selesai (Terealisasi)
import VolunteerTerealisasi from './VolunteerTerealisasi.jsx'; 
import DetailVolunteer from './DetailVolunteer.jsx'; // Pastikan nama file ini sesuai di folder Anda

// Import Halaman User & Dashboard
import Dashboard from './Dashboard.jsx'; 

// Import Halaman Admin
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx'; 
import AdminAddActivity from './AdminAddActivity.jsx'; 
import AdminManageActivities from './AdminManageActivities.jsx'; 
import AdminEditActivity from './AdminEditActivity.jsx'; 

// Import CSS Global
import './App.css';
import './Home.css';
import './AdminEditActivity.css'; 

function App() {
    return (
        <AuthProvider>
            <div className="app-container">
                <Router>
                    {/* Navbar muncul di semua halaman */}
                    <Navbar /> 
                    
                    <Routes>
                        {/* ==========================================
                            RUTE HALAMAN UTAMA DAN INFO 
                           ========================================== */}
                        <Route path="/" element={<Home />} /> 
                        <Route path="/beranda" element={<Home />} />
                        <Route path="/tentang" element={<Tentang />} /> 
                        <Route path="/aktivitas" element={<Aktivitas />} /> 
                        <Route path="/kontak" element={<Kontak />} /> 

                        {/* Rute Detail Aktivitas (Untuk Pendaftaran/Kegiatan Berjalan) */}
                        <Route path="/aktivitas/:id" element={<DetailAktivitas />} /> 
                        
                        {/* ==========================================
                            RUTE VOLUNTEER TEREALISASI (Kegiatan Selesai)
                           ========================================== */}
                        <Route path="/volunteer-terealisasi" element={<VolunteerTerealisasi />} /> 
                        
                        {/* PERBAIKAN: Rute khusus untuk melihat profil kegiatan yang sudah selesai */}
                        <Route path="/volunteer-terealisasi/detail/:id" element={<DetailVolunteer />} />
                        
                        {/* ==========================================
                            RUTE DASHBOARD USER 
                           ========================================== */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Dashboard />} /> 
                        
                        {/* ==========================================
                            RUTE ADMIN (DILINDUNGI)
                           ========================================== */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
                        <Route path="/admin/add-activity" element={<AdminAddActivity />} /> 
                        <Route path="/admin/manage-activities" element={<AdminManageActivities />} /> 
                        <Route path="/admin/edit-activity/:id" element={<AdminEditActivity />} /> 
                        
                        {/* ==========================================
                            RUTE AUTENTIKASI 
                           ========================================== */}
                        <Route path="/login" element={<LoginPage />} /> 
                        <Route path="/register" element={<RegisterPage />} /> 
                        <Route path="/admin-login" element={<AdminLogin />} />

                        {/* ==========================================
                            RUTE PENDAFTARAN RELAWAN (FLOW MULTI-STEP)
                           ========================================== */}
                        <Route path="/daftar/:activityId" element={<DaftarRelawan />} /> 
                        <Route path="/keahlian/:activityId" element={<DaftarRelawanLangkah2 />} />
                        <Route path="/konfirmasi/:activityId" element={<KonfirmasiPendaftaran />} />
                        
                        {/* Halaman Sukses Setelah Submit Backend */}
                        <Route 
                            path="/pendaftaran-sukses/:activityId" 
                            element={<DaftarRelawanKonfirmasi />} 
                        />
                        
                        {/* ==========================================
                            404 - HALAMAN TIDAK DITEMUKAN
                           ========================================== */}
                        <Route path="*" element={
                            <div style={{textAlign: 'center', padding: '100px'}}>
                                <h1>404</h1>
                                <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
                                <a href="/">Kembali ke Beranda</a>
                            </div>
                        } />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
/*tes*/