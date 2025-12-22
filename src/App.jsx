import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext'; 

import Navbar from './Navbar.jsx'; 
import Home from './Home.jsx';
import Tentang from './Tentang.jsx'; 
import Aktivitas from './Aktivitas.jsx'; 
import Kontak from './Kontak.jsx'; 
import DetailAktivitas from './DetailAktivitas.jsx'; 
import DaftarRelawan from './DaftarRelawan.jsx';
import DaftarRelawanLangkah2 from './DaftarRelawanLangkah2.jsx'; 
import DaftarRelawanKonfirmasi from './DaftarRelawanKonfirmasi.jsx'; 
import KonfirmasiPendaftaran from './KonfirmasiPendaftaran.jsx'; 
import LoginPage from './LoginPage.jsx'; 
import RegisterPage from './RegisterPage.jsx'; 
import VolunteerTerealisasi from './VolunteerTerealisasi.jsx'; 
import DetailVolunteer from './DetailVolunteer.jsx'; 
import Dashboard from './Dashboard.jsx'; 
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx'; 
import AdminAddActivity from './AdminAddActivity.jsx'; 
import AdminManageActivities from './AdminManageActivities.jsx'; 
import AdminEditActivity from './AdminEditActivity.jsx'; 

import './App.css';
import './Home.css';
import './AdminEditActivity.css'; 

function App() {
    return (
        <AuthProvider>
            <div className="app-container">
                <Router>
                    <Navbar /> 
                    
                    <Routes>
                        {/* RUTE HALAMAN UTAMA DAN INFO */}
                        <Route path="/" element={<Home />} /> 
                        <Route path="/tentang" element={<Tentang />} /> 
                        <Route path="/aktivitas" element={<Aktivitas />} /> 
                        <Route path="/aktivitas/:id" element={<DetailAktivitas />} /> 
                        <Route path="/kontak" element={<Kontak />} /> 
                        
                        {/* RUTE VOLUNTEER TEREALISASI */}
                        <Route path="/volunteer-terealisasi" element={<VolunteerTerealisasi />} /> 
                        <Route path="/volunteer-terealisasi/detail/:id" element={<DetailVolunteer />} />
                        
                        {/* RUTE DASHBOARD USER */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Dashboard />} /> {/* <-- PERBAIKAN 404: Mengarahkan /profile ke Dashboard */}
                        
                        {/* RUTE ADMIN PROTECTED */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
                        <Route path="/admin/add-activity" element={<AdminAddActivity />} /> 
                        <Route path="/admin/manage-activities" element={<AdminManageActivities />} /> 
                        <Route path="/admin/edit-activity/:id" element={<AdminEditActivity />} /> 
                        
                        {/* RUTE AUTENTIKASI */}
                        <Route path="/login" element={<LoginPage />} /> 
                        <Route path="/register" element={<RegisterPage />} /> 
                        <Route path="/admin-login" element={<AdminLogin />} />

                        {/* RUTE PENDAFTARAN RELAWAN (Langkah 1, 2, Konfirmasi) */}
                        <Route path="/daftar/:activityId" element={<DaftarRelawan />} /> 
                        <Route path="/keahlian/:activityId" element={<DaftarRelawanLangkah2 />} />
                        <Route path="/konfirmasi/:activityId" element={<KonfirmasiPendaftaran />} />
                        
                        {/* RUTE SUKSES AKHIR */}
                        <Route 
                            path="/pendaftaran-sukses/:activityId" 
                            element={<DaftarRelawanKonfirmasi />} 
                        />
                        
                        {/* 404 */}
                        <Route path="*" element={<h1>404 Halaman Tidak Ditemukan</h1>} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;