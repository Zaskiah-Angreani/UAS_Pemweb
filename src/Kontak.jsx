import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Kontak.css'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_URL = API_BASE_URL; 
function Kontak() {
    const [formData, setFormData] = useState({ 
        name: '',
        email: '',
        phone: '', 
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState({ type: 'success', text: '' });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                API_CONTACT_URL, 
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            setNotificationMessage({ 
                type: 'success', 
                text: response.data.message || 'Pesan berhasil terkirim!' 
            });
            setShowNotification(true);
            setFormData({ name: '', email: '', phone: '', message: '' }); 
        } catch (err) {
            console.error('Error sending message:', err.response || err);
            const msg = err.response?.data?.message || 'Gagal mengirim pesan. Silakan cek koneksi Anda.';
            
            setNotificationMessage({ 
                type: 'error', 
                text: msg
            });
            setShowNotification(true);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [showNotification]);


    return (
        <div className="kontak-page-container"> 
            
            {showNotification && (
                <div className={`custom-notification active ${notificationMessage.type}`}>
                    <span className="notification-icon">
                        {notificationMessage.type === 'success' ? '✔️' : '❌'}
                    </span>
                    <p className="notification-message">{notificationMessage.text}</p>
                </div>
            )}
            
            <div className="main-content-contact">
                <h1 className="contact-title">Hubungi Kami</h1>
                <div className="contact-main-wrapper"> 
                    <div className="contact-form-section">
                        <form className="contact-form-card" onSubmit={handleSubmit}> 
                            <h2 className="form-header">Kirimkan Pesan Anda</h2>
                            
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nama Lengkap</label>
                                <input id="name" className="form-input" type="text" 
                                    name="name" value={formData.name} onChange={handleChange} 
                                    placeholder="Masukkan Nama Lengkap" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Masukkan Email</label>
                                <input id="email" className="form-input" type="email" 
                                    name="email" value={formData.email} onChange={handleChange} 
                                    placeholder="Masukkan Email" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">No. Telepon</label>
                                <input id="phone" className="form-input" type="tel" 
                                    name="phone" value={formData.phone} onChange={handleChange} 
                                    placeholder="Masukkan No. Telepon (Opsional)" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Pesan Anda</label>
                                <textarea 
                                    id="message"
                                    className="form-textarea" 
                                    name="message" value={formData.message} onChange={handleChange} 
                                    placeholder="Tulis pesan Anda di sini..."
                                    rows="5"
                                    required
                                    disabled={loading}
                                ></textarea>
                            </div>
                            
                            <div className="submit-button-wrapper">
                                <button type="submit" className="submit-button" disabled={loading}>
                                    {loading ? 'Mengirim...' : 'Kirim'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="simple-footer-placeholder">
                <div className="footer-content-wrapper">
                    <h1 className="footer-brand-text">SatuAksi</h1>
                    <div className="footer-contact-details">
                        <div className="contact-item">
                            <div className="item-label">Email</div>
                            <div className="item-value">satuaksi1234@gmail.com</div>
                        </div>
                        <div className="contact-item">
                            <div className="item-label">Telepon / WhatsApp</div>
                            <div className="item-value">081993438954</div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        © 2025 SatuAksi — Menghubungkan Kamu dengan Setiap Momen Spesial
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kontak;