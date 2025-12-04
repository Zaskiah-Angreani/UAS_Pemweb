// src/Kontak.jsx (KODE FINAL & LENGKAP)

import React from 'react';
import './Kontak.css'; 
// Tidak ada import gambar logo karena sudah diganti teks

function Kontak() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ganti dengan logika pengiriman data ke server/API Anda
        alert("Pesan Terkirim! Terima kasih telah menghubungi kami."); 
    };

    return (
        <div className="kontak-page-container"> 
            
            <div className="main-content-contact">
                
                {/* --- JUDUL HALAMAN --- */}
                <h1 className="contact-title">Hubungi Kami</h1>

                {/* --- WRAPPER UTAMA: HANYA FORM (Satu Kolom di Tengah) --- */}
                <div className="contact-main-wrapper"> 
                    
                    {/* --- FORM KONTAK (Card Kecil) --- */}
                    <div className="contact-form-section">
                        <form className="contact-form-card" onSubmit={handleSubmit}>
                            
                            <h2 className="form-header">Kirimkan Pesan Anda</h2>
                            
                            {/* Input Nama Lengkap */}
                            <div className="form-group">
                                <label htmlFor="name-input" className="form-label">Nama Lengkap</label>
                                <input id="name-input" className="form-input" type="text" placeholder="Masukkan Nama Lengkap" required />
                            </div>
                            
                            {/* Input Email */}
                            <div className="form-group">
                                <label htmlFor="email-input" className="form-label">Masukkan Email</label>
                                <input id="email-input" className="form-input" type="email" placeholder="Masukkan Email" required />
                            </div>
                            
                            {/* Input No. Telepon */}
                            <div className="form-group">
                                <label htmlFor="phone-input" className="form-label">No. Telepon</label>
                                <input id="phone-input" className="form-input" type="tel" placeholder="Masukkan No. Telepon" required />
                            </div>
                            
                            {/* Input Pesan Anda (Textarea) */}
                            <div className="form-group">
                                <label htmlFor="message-input" className="form-label">Pesan Anda</label>
                                <textarea 
                                    id="message-input"
                                    className="form-textarea" 
                                    placeholder="Tulis pesan Anda di sini..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            
                            {/* Tombol Kirim */}
                            <div className="submit-button-wrapper">
                                <button type="submit" className="submit-button">
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            
            {/* --- FOOTER --- */}
            <div className="simple-footer-placeholder">
                <div className="footer-content-wrapper">
                    
                    {/* LOGO DIGANTI DENGAN TEKS BRAND */}
                    <h1 className="footer-brand-text">SatuAksi</h1>

                    {/* Detail Kontak (Vertikal) */}
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