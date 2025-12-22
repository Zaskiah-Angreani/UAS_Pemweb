import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './utils/api'; 
import './LoginPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nama: '', email: '', password: '', konfirmasiPassword: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => { 
        e.preventDefault();
        setError('');
        setIsLoading(true); 

        if (formData.password !== formData.konfirmasiPassword) {
            setError('❌ Konfirmasi Password tidak cocok!');
            setIsLoading(false);
            return;
        }

        const userData = {
            name: formData.nama, 
            email: formData.email,
            password: formData.password,
            role: isAdmin ? 'admin' : 'user'
        };

        try {
            // Menggunakan api.js yang mengarah ke localhost:4000
            const response = await api.post('/auth/register', userData);
            alert(`✅ Pendaftaran berhasil! Silakan login.`);
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal mendaftar.';
            setError(`❌ ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                <div className="login-card">
                    <div className="frame-56"><span className="logo-text">SatuAksi</span></div>
                    <div className="login-header">
                        <div className="icon-placeholder">📝</div>
                        <div className="masuk-akun-satu-aksi">{isAdmin ? 'Daftar Admin' : 'Daftar Akun Baru'}</div>
                    </div>
                    <div className="toggle-section">
                        <label className="toggle-label">
                            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                            <span className="toggle-switch"></span>
                            <span className="toggle-text">Daftar sebagai Admin</span>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleRegister} className="login-form">
                        <div className="input-group">
                            <label>{isAdmin ? 'Username Admin' : 'Nama Lengkap'}</label>
                            <input className="input-field" type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                        </div>
                        {!isAdmin && (
                            <div className="input-group">
                                <label>Email</label>
                                <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        )}
                        <div className="input-group">
                            <label>Password</label>
                            <input className="input-field" type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Konfirmasi Password</label>
                            <input className="input-field" type="password" name="konfirmasiPassword" value={formData.konfirmasiPassword} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="button-masuk" disabled={isLoading}>
                            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </form>
                    <div className="register-link-wrapper">
                        <span className="text-prompt">Sudah punya akun? </span>
                        <Link to="/login" className="link-daftar">Login Disini</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;