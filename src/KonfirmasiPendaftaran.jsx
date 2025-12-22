import React, { useState } from 'react'; 
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import './DaftarRelawan.css'; 
import { activityImages } from './assetsmaps'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

// PERBAIKAN: Menambahkan variabel yang hilang agar tidak ReferenceError
const API_REGISTRATION_URL = `${API_BASE_URL}/registrations`; 

const formatToUserDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '-';
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
};

const getFormattedDate = (dateString) => {
    if (dateString && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateString; 
    }
    return dateString; 
};

const KonfirmasiPendaftaran = () => {
    // PERBAIKAN: Menggunakan activityId sesuai definisi di App.js atau Route
    const { activityId } = useParams();
    
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);

    const formData = location.state?.finalData || {}; 
    const programData = location.state?.programData || null; 
    
    const programTitle = programData 
        ? programData.title.toUpperCase() 
        : "PROGRAM TIDAK DITEMUKAN";

    const portofolioFile = formData.portofolio instanceof File ? formData.portofolio : null;
    const keahlianString = Array.isArray(formData.keahlian) ? formData.keahlian.join(', ') : (formData.keahlian || '-');

    if (Object.keys(formData).length === 0 || !formData.namaLengkap) {
        return (
            <div className="frame-8 daftar-relawan-page" style={{textAlign: 'center', marginTop: '100px'}}>
                <h1 style={{color: 'red'}}>Data Pendaftaran Hilang</h1>
                <p>Silakan mulai proses pendaftaran dari langkah pertama.</p>
                <Link to={`/aktivitas`} className="next-step-button" style={{marginTop: '20px'}}>
                    Kembali ke Daftar Aktivitas
                </Link>
            </div>
        );
    }

    const handleBackStep = () => {
        navigate(-1); // Lebih simpel untuk kembali ke langkah sebelumnya
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);

        // Validasi ID Program
        const finalActivityId = parseInt(activityId); 
        if (isNaN(finalActivityId)) {
            setSubmissionError("ID Program tidak valid. Silakan ulangi pendaftaran.");
            return;
        }

        if (!isAgreed) {
            setSubmissionError("Anda harus menyetujui syarat & ketentuan.");
            return;
        }

        setIsSubmitting(true);
        
        // Menggunakan FormData karena mengirim File Portofolio
        const dataToSend = new FormData();
        
        const relawanData = {
            activity_id: finalActivityId, 
            full_name: formData.namaLengkap,
            date_of_birth: getFormattedDate(formData.tanggalLahir), 
            gender: formData.gender,
            phone_number: formData.noTelepon,
            email: formData.email, 
            profession: formData.profession || '',
            full_address: formData.alamatLengkap,
            domicile_city: formData.domisili,
            institution: formData.institution || '',
            source_info: formData.source,
            keahlian: keahlianString, 
            commitment_time: formData.komitmen,
            chosen_division: formData.divisi,
            motivation_text: formData.motivasi,
        };
        
        // Append data teks sebagai string JSON atau field individu
        dataToSend.append('relawanData', JSON.stringify(relawanData));
        if (portofolioFile) {
            dataToSend.append('portofolio', portofolioFile); 
        }

        try {
            // Memanggil API yang sekarang sudah didefinisikan
            const response = await fetch(API_REGISTRATION_URL, {
                method: 'POST',
                body: dataToSend, 
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal mengirim pendaftaran.");
            }

            // Jika sukses, arahkan ke halaman sukses
            navigate(`/pendaftaran-sukses/${finalActivityId}`, { 
                state: { 
                    namaLengkap: formData.namaLengkap, 
                    programTitle: programTitle
                }
            });

        } catch (error) {
            console.error("Submission Error:", error);
            setSubmissionError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="frame-8 daftar-relawan-page">
            <div className="stepper-section">
                <div className="group-58 stepper-item completed-step">
                    <div className="rectangle-48 checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1</div>
                </div>
                <div className="step-separator completed"></div>
                <div className="group-61 stepper-item completed-step">
                    <div className="rectangle-483 checkmark">✅</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2</div>
                </div>
                <div className="step-separator completed"></div>
                <div className="group-62 stepper-item active-step">
                    <div className="rectangle-482">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3</div>
                </div>
            </div>

            <div className="program-info-box card-shadow registration-info-card">
                <p className="program-title-label">Program:</p>
                <h3 className="program-title-value">{programTitle}</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="card-shadow step-3-confirmation">
                {submissionError && (
                    <div className="error-banner" style={{color: 'red', marginBottom: '20px', border: '1px solid red', padding: '10px'}}>
                        {submissionError}
                    </div>
                )}
            
                <div className="review-data-section">
                    <h4>Review Data Anda</h4>
                    <div className="review-grid" style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                        <div className="review-col">
                            <p><strong>Nama:</strong> {formData.namaLengkap}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Telepon:</strong> {formData.noTelepon}</p>
                        </div>
                        <div className="review-col">
                            <p><strong>Domisili:</strong> {formData.domisili}</p>
                            <p><strong>Divisi:</strong> {formData.divisi}</p>
                        </div>
                    </div>
                </div>

                <div className="agreement-section" style={{marginTop: '20px'}}>
                    <input 
                        type="checkbox" 
                        id="agreement" 
                        checked={isAgreed} 
                        onChange={(e) => setIsAgreed(e.target.checked)} 
                    />
                    <label htmlFor="agreement"> Saya menyatakan data di atas benar.</label>
                </div>

                <div className="button-group" style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
                    <button type="button" onClick={handleBackStep} className="back-step-button" disabled={isSubmitting}>KEMBALI</button>
                    <button type="submit" className="next-step-button" disabled={isSubmitting}>
                        {isSubmitting ? 'MENGIRIM...' : 'KIRIM PENDAFTARAN'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KonfirmasiPendaftaran;