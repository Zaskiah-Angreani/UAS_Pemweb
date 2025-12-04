// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- IMPORT KOMPONEN HALAMAN --- 
import Navbar from './Navbar.jsx'; 
import Home from './Home.jsx';
import Tentang from './Tentang.jsx'; 
import Aktivitas from './Aktivitas.jsx'; 
import Kontak from './Kontak.jsx'; 
import DetailAktivitas from './DetailAktivitas.jsx'; 
import DaftarRelawan from './DaftarRelawan.jsx'; // Langkah 1
import DaftarRelawanLangkah2 from './DaftarRelawanLangkah2.jsx'; // Langkah 2
import KonfirmasiPendaftaran from './KonfirmasiPendaftaran.jsx'; // Langkah 3
import LoginPage from './LoginPage.jsx'; // Halaman Login
import RegisterPage from './RegisterPage.jsx'; // Halaman Register
import VolunteerTerealisasi from './VolunteerTerealisasi.jsx' // ✅ Import komponen baru
import DetailVolunteer from './DetailVolunteer.jsx'; 

<Route path="/volunteer-terealisasi/detail/:id" element={<DetailVolunteer />} />

// --- IMPORT SEMUA FILE CSS ---
import './App.css';
import './Home.css';
import './Tentang.css';
import './Aktivitas.css';
import './Kontak.css';
import './DetailAktivitas.css'; 
import './DaftarRelawan.css';
import './LoginPage.css'; 
import './Navbar.css'; 
import './VolunteerTerealisasi.css'; // ✅ Import CSS baru


function App() {
    return (
        <div className="app-container">
            <Router>
                {/* 📌 HANYA SATU PANGGILAN NAVBAR DI SINI! (Single Navbar) */}
                <Navbar /> 
                
                <Routes>
                    {/* RUTE HALAMAN UTAMA DAN INFO */}
                    <Route path="/" element={<Home />} /> 
                    <Route path="/tentang" element={<Tentang />} /> 
                    <Route path="/aktivitas" element={<Aktivitas />} /> 
                    <Route path="/aktivitas/:id" element={<DetailAktivitas />} /> 
                    <Route path="/kontak" element={<Kontak />} /> 
                    {/* ✅ RUTE BARU DITAMBAHKAN */}
                    <Route path="/volunteer-terealisasi" element={<VolunteerTerealisasi />} /> 
                    <Route path="/volunteer-terealisasi/detail/:id" element={<DetailVolunteer />} />
                    
                    {/* RUTE AUTENTIKASI */}
                    <Route path="/login" element={<LoginPage />} /> 
                    <Route path="/register" element={<RegisterPage />} /> 

                    {/* RUTE PENDAFTARAN RELAWAN (MULTI-LANGKAH) */}
                    <Route path="/daftar/:activityId" element={<DaftarRelawan />} /> 
                    <Route path="/keahlian/:activityId" element={<DaftarRelawanLangkah2 />} />
                    <Route path="/konfirmasi/:activityId" element={<KonfirmasiPendaftaran />} />
                    
                    {/* Rute Catch-all untuk halaman tidak ditemukan */}
                    <Route path="*" element={<h1>404 Halaman Tidak Ditemukan</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;