// src/LoginPage.jsx - PERBAIKAN TOMBOL MASUK

import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // --- LOGIKA VALIDASI ---
        if (!email || !password) {
            setError('Email dan Password harus diisi.');
            return;
        }
        
        // Logika login (SIMULASI)
        console.log('Login attempt:', { email, password });
        setError('');
        alert('Login Berhasil! Mengalihkan...'); 
        
        // Di sini Anda akan menambahkan navigasi ke halaman dashboard
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                
                {/* Frame Utama / Card Login */}
                <div className="login-card">
                    
                    {/* Header Logo */}
                    <div className="frame-56">
                        <span className="logo-text">SatuAksi</span> 
                    </div>

                    {/* Judul dan Ikon (Masuk Akun) */}
                    <div className="login-header">
                        <div className="icon-placeholder">👤</div> 
                        <div className="masuk-akun-satu-aksi">Masuk Akun SatuAksi</div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin} className="login-form">
                        
                        {/* Input Email */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="input-field"
                                type="email"
                                placeholder="Masukkan email Anda"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="Masukkan password Anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* TOMBOL MASUK YANG SUDAH DIPERBAIKI */}
                        <button type="submit" className="button-masuk">
                            Masuk
                        </button>
                    </form>

                    {/* Link Daftar */}
                    <div className="register-link-wrapper">
                        <span className="text-prompt">Belum punya akun? </span>
                        {/* Ganti dengan komponen Link jika menggunakan React Router */}
                        <a href="/register" className="link-daftar">Daftar Disini.</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;