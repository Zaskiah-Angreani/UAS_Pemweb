import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './utils/api'; 
import { AuthContext } from './AuthContext'; 
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogin = async (e) => { 
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Pemanggilan ini akan menjadi: BaseURL + /auth/login
            // Contoh: .../api/auth/login
            const response = await api.post('/auth/login', { email, password });
            
            const { token, user } = response.data;
           
            login(token, user.role, user.name); 
            alert(`🎉 Selamat datang, ${user.name}!`);
            
            // Redirect sesuai role dari database
            navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } catch (err) {
            console.error('Login Error:', err);
            // Menangkap pesan error dari backend atau pesan default
            const errorMessage = err.response?.data?.message || 'Endpoint tidak ditemukan. Pastikan URL API benar.';
            setError(`❌ ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="login-page-container">
            <div className="login-card-wrapper">
                <div className="login-card">
                    <div className="frame-56"><span className="logo-text">SatuAksi</span></div>
                    <div className="login-header">
                        <div className="icon-placeholder">👤</div>
                        <div className="masuk-akun-satu-aksi">Masuk Akun</div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label>Email</label>
                            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="button-masuk" disabled={loading}>
                            {loading ? 'Memproses...' : '👋 Masuk'}
                        </button>
                    </form>
                    <div className="register-link-wrapper">
                        <Link to="/register" className="link-daftar">Daftar Disini</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;