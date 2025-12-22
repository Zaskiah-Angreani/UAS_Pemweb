import React, { useContext } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { AuthContext } from './AuthContext'; 
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { isLoggedIn, userRole, dashboardPath, logout } = useContext(AuthContext);

    const navItems = [
        { path: '/', label: 'Beranda' },
        { path: '/aktivitas', label: 'Aktivitas' },
        { path: '/tentang', label: 'Tentang' },
        { path: '/kontak', label: 'Kontak' },
    ];

    const handleLogout = () => {
        logout(); 
        alert('👋 Logout Berhasil!');
        navigate('/'); 
    };

    return (
        <nav className="frame-56">
            
            <Link to="/" className="logo-text">SatuAksi</Link>
            <div className="nav-links">
                {navItems.map(item => (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
           
            <div className="auth-section">
                {isLoggedIn ? (
                    <>
                        {userRole === 'admin' && (
                        
                            <Link to="/admin/dashboard" className="admin-button">
                                🔐 Admin Panel
                            </Link>
                        )}
                        
                        <Link to={dashboardPath} className="saya-button">
                            {userRole === 'admin' ? 'Dashboard' : 'Saya'}
                        </Link>
                        <button onClick={handleLogout} className="logout-button">
                            Keluar
                        </button>
                    </>
                ) : (
                   
                    <Link to="/login" className="login-button">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;