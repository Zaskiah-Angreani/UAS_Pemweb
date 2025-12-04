// src/Navbar.jsx (FINAL DENGAN IMPORT CSS KHUSUS)

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // <-- ✅ IMPORT CSS KHUSUS NAVBAR

const Navbar = () => {
    const location = useLocation();
    
    // Daftar navigasi utama
    const navItems = [
        { path: '/', label: 'Beranda' },
        { path: '/aktivitas', label: 'Aktivitas' },
        { path: '/tentang', label: 'Tentang' },
        { path: '/kontak', label: 'Kontak' },
    ];

    return (
        <nav className="frame-56">
            
            {/* Logo */}
            <Link to="/" className="logo-text">
                SatuAksi
            </Link>
            
            {/* Link Navigasi Tengah */}
            <div className="nav-links">
                {navItems.map(item => (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        // Menambahkan kelas 'active' jika rute saat ini cocok
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            
            {/* Tombol Login */}
            <Link to="/login" className="login-button">
                Login
            </Link>
        </nav>
    );
};

export default Navbar;