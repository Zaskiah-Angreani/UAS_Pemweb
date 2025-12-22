import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './KonfirmasiRelawan.css'; 
import { IoCheckmarkCircle } from "react-icons/io5";

const activitiesData = [
    { id: 1, title: 'Program Aksi Bersama' },
    { id: 2, title: 'Rumah Belajar Starban' },
]; 

const DaftarRelawanKonfirmasi = () => {
    const { activityId } = useParams();
    const location = useLocation(); 
    const namaPendaftar = location.state?.namaLengkap || 'Relawan'; 
    const programTitle = location.state?.programTitle || 'Program Tidak Ditemukan';
    const registrationId = location.state?.registrationId || 'ID-TIDAK-DITEMUKAN'; 
    
    const mockData = {
        nomorRegistrasi: registrationId, 
        namaPendaftar: namaPendaftar,
        tanggalMulai: "15 Januari 2025",
        totalBiaya: "GRATIS"
    };

    return (
        <div className="frame-8 konfirmasi-page">
            
            <h1 style={{textAlign: 'center', margin: '20px 0', fontSize: '24px', color: '#0A192F'}}>
                Pendaftaran Relawan
            </h1>

            <div className="step-navigation final-step" style={{maxWidth: '700px', margin: '20px auto'}}>
                <div className="step-item completed-step">
                    <span className="step-number">1</span>
                    <span className="step-label">Informasi Pribadi</span>
                </div>
                <div className="step-separator completed"></div>
                <div className="step-item completed-step">
                    <span className="step-number">2</span>
                    <span className="step-label">Keahlian & Komitmen</span>
                </div>
                <div className="step-separator completed"></div>
                <div className="step-item active-step">
                    <span className="step-number">3</span>
                    <span className="step-label">Selesai</span>
                </div>
            </div>
       
            <div 
                className="konfirmasi-content-container" 
                style={{
                    maxWidth: '900px', 
                    margin: '40px auto', 
                    padding: '0 20px 60px 20px' 
                }}
            >
                
                <div className="success-message-section" style={{textAlign: 'center', marginBottom: '40px', padding: '30px', borderBottom: '1px solid #ccc'}}>
                    <IoCheckmarkCircle className="checkmark-icon" style={{color: '#4CAF50', fontSize: '60px', marginBottom: '15px'}} />
                    <h1 className="selamat-pendaftaran-anda-berhasil" style={{fontSize: '28px', margin: '10px 0', lineHeight: '1.2'}}>
                        SELAMAT, {mockData.namaPendaftar.toUpperCase()}! PENDAFTARAN ANDA BERHASIL!
                    </h1>
                    <p className="anda-telah-resmi" style={{fontSize: '16px', color: '#555'}}>
                        Anda telah resmi **TERDAFTAR** sebagai relawan untuk program <span className="program-bold">{programTitle}</span>.
                    </p>
                </div>

                <div className="card-grid" style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                    gap: '30px', 
                    marginBottom: '40px'
                }}>
             
                    <div className="card ringkasan-pendaftaran-card" style={{padding: '25px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                        <h2 className="card-title" style={{fontSize: '20px', borderBottom: '2px solid #EEE', paddingBottom: '10px', marginBottom: '15px'}}>Ringkasan Pendaftaran</h2>
                        <div className="status-box" style={{backgroundColor: '#E8F5E9', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center'}}>
                            <p className="status-label" style={{margin: 0, fontSize: '12px', color: '#4CAF50', fontWeight: 'bold'}}>STATUS</p>
                            <p className="status-value" style={{margin: 0, fontSize: '18px', color: '#388E3C', fontWeight: 'bold'}}>BERHASIL</p>
                        </div>
                        <div className="summary-detail">
                            <p className="detail-item" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '5px 0', borderBottom: '1px dotted #EEE'}}>
                                <span className="detail-label" style={{fontWeight: '500', color: '#333'}}>Nomor Registrasi:</span> 
                                <span className="detail-value" style={{fontWeight: 'bold', color: '#0A192F'}}>{mockData.nomorRegistrasi}</span>
                            </p>
                            <p className="detail-item" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '5px 0', borderBottom: '1px dotted #EEE'}}>
                                <span className="detail-label" style={{fontWeight: '500', color: '#333'}}>Program:</span> 
                                <span className="detail-value" style={{fontWeight: 'bold', color: '#0A192F'}}>{programTitle}</span>
                            </p>
                        </div>
                    </div>

                    <div className="card next-steps-card" style={{padding: '25px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', backgroundColor: '#F9F9F9'}}>
                        <h2 className="card-title" style={{fontSize: '20px', borderBottom: '2px solid #E0E0E0', paddingBottom: '10px', marginBottom: '15px'}}>Apa Selanjutnya? Persiapan Program</h2>
                        <ol className="next-steps-list" style={{listStyleType: 'decimal', paddingLeft: '20px'}}>
                            <li style={{marginBottom: '15px'}}>
                                <span className="step-title" style={{fontWeight: 'bold', color: '#1A73E8'}}>Cek Email Anda:</span> Kami telah memberikan panduan awal (Kit Program lengkap).
                            </li>
                            <li style={{marginBottom: '15px'}}>
                                <span className="step-title" style={{fontWeight: 'bold', color: '#1A73E8'}}>Grup Komunitas:</span> Tim kami akan mengundang Anda ke grup komunitas.
                            </li>
                            <li style={{marginBottom: '0'}}>
                                <span className="step-title" style={{fontWeight: 'bold', color: '#1A73E8'}}>Sesi Orientasi:</span> Jadwal sesi orientasi akan diinformasikan di panduan awal.
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="button-group-wrapper" style={{textAlign: 'center', margin: '40px 0'}}>
                    <Link to="/" className="kembali-ke-beranda-button" style={{
                        display: 'inline-block', 
                        padding: '12px 30px', 
                        backgroundColor: '#1A73E8', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 'bold', 
                        fontSize: '16px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        KEMBALI KE BERANDA
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default DaftarRelawanKonfirmasi;