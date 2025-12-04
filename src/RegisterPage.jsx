// src/RegisterPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Menggunakan styling yang sama dengan LoginPage

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        konfirmasiPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        // --- Logika Validasi ---
        if (formData.password !== formData.konfirmasiPassword) {
            setError('Konfirmasi Password tidak cocok.');
            return;
        }
        if (!formData.email || !formData.password || !formData.nama) {
            setError('Semua kolom wajib diisi.');
            return;
        }

        // Logika Pendaftaran (SIMULASI)
        console.log('Registration attempt:', formData);
        setError('');
        alert('Pendaftaran Berhasil (Simulasi)! Anda akan diarahkan ke halaman login.');
        // Di sini Anda akan mengarahkan pengguna ke halaman login: navigate('/login')
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                
                <div className="login-card">
                    
                    <div className="frame-56">
                        <span className="logo-text">SatuAksi</span> 
                    </div>

                    <div className="login-header">
                        <div className="icon-placeholder">📝</div> 
                        <div className="masuk-akun-satu-aksi">Daftar Akun Baru</div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleRegister} className="login-form">
                        
                        {/* Input Nama Lengkap */}
                        <div className="input-group">
                            <label htmlFor="nama">Nama Lengkap</label>
                            <input
                                id="nama"
                                className="input-field"
                                type="text"
                                name="nama"
                                placeholder="Masukkan nama lengkap Anda"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Input Email */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="input-field"
                                type="email"
                                name="email"
                                placeholder="Masukkan email aktif Anda"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Input Password */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="input-field"
                                type="password"
                                name="password"
                                placeholder="Buat password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Input Konfirmasi Password */}
                        <div className="input-group">
                            <label htmlFor="konfirmasiPassword">Konfirmasi Password</label>
                            <input
                                id="konfirmasiPassword"
                                className="input-field"
                                type="password"
                                name="konfirmasiPassword"
                                placeholder="Ulangi password"
                                value={formData.konfirmasiPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Tombol Daftar */}
                        <button type="submit" className="button-masuk">
                            Daftar Sekarang
                        </button>
                    </form>

                    {/* Link Kembali ke Login */}
                    <div className="register-link-wrapper">
                        <span className="text-prompt">Sudah punya akun? </span>
                        <Link to="/login" className="link-daftar">Login Disini.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;