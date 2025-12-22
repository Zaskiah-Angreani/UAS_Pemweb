import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 
import './LoginPage.css'; 

// URL Backend Railway yang aktif saat ini
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_LOGIN_URL = `${API_BASE_URL}/auth/login`; 

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // Menggunakan API_LOGIN_URL yang sudah didefinisikan
            const response = await axios.post(API_LOGIN_URL, {
                email: credentials.email,
                password: credentials.password,
            });

            const { token, user } = response.data;
            
            // Validasi role admin di sisi frontend
            if (user.role !== 'admin') {
                setError('Akses ditolak: Hanya pengguna Admin yang bisa login di sini.');
                return;
            }

            login(token, user.role, user.name || 'Admin'); 
            alert(`✅ Login Admin Berhasil! Selamat datang, ${user.name || 'Admin'}.`);
            navigate('/admin/dashboard');

        } catch (err) {
            console.error('Login Error:', err);
            const errorMessage = err.response?.data?.message || 'Gagal terhubung ke server atau terjadi kesalahan tak terduga.';
            setError(`❌ ${errorMessage}`);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                <div className="login-card">
                    <div className="frame-56">
                        <span className="logo-text">Admin SatuAksi</span>
                    </div>

                    <div className="login-header">
                        <div className="icon-placeholder">🔐</div>
                        <div className="masuk-akun-satu-aksi">Panel Admin</div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleAdminLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email Admin</label>
                            <input
                                id="email"
                                className="input-field"
                                type="email"
                                name="email"
                                placeholder="email_admin@example.com"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password Admin</label>
                            <input
                                id="password"
                                className="input-field"
                                type="password"
                                name="password"
                                placeholder="******"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="button-masuk">
                            Masuk Admin
                        </button>
                    </form>

                    <div className="register-link-wrapper">
                        <Link to="/login" className="link-daftar">← Kembali ke Login User</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;