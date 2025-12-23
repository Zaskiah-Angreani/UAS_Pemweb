import React, { useState } from 'react'; 
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import './DaftarRelawan.css'; 

const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_REGISTRATION_URL = `${API_BASE_URL}/registrations`; 

const KonfirmasiPendaftaran = () => {
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
    const keahlianString = Array.isArray(formData.keahlian) 
        ? formData.keahlian.join(', ') 
        : (formData.keahlian || '-');

    // VALIDASI: Pastikan ada data dari langkah sebelumnya
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
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);

        // 1. VALIDASI AGREEMENT
        if (!isAgreed) {
            setSubmissionError("Anda harus menyetujui syarat & ketentuan.");
            return;
        }

        // 2. VALIDASI ACTIVITY ID
        const finalActivityId = parseInt(activityId); 
        if (isNaN(finalActivityId)) {
            setSubmissionError("ID Program tidak valid. Silakan ulangi pendaftaran.");
            return;
        }

        // 3. VALIDASI FILE PORTOFOLIO
        if (!portofolioFile) {
            setSubmissionError("File Portofolio/CV wajib diunggah!");
            return;
        }

        setIsSubmitting(true);
        
        // 4. PERSIAPAN DATA DENGAN FORMDATA
        const dataToSend = new FormData();
        
        // MAPPING: Frontend (Bahasa Indonesia) → Backend (English)
        const relawanData = {
            activity_id: finalActivityId,
            full_name: formData.namaLengkap,
            date_of_birth: formData.tanggalLahir,
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
        
        // Append sebagai JSON string (sesuai dengan backend)
        dataToSend.append('relawanData', JSON.stringify(relawanData));
        dataToSend.append('portofolio', portofolioFile);

        console.log('📤 Mengirim data ke:', API_REGISTRATION_URL);
        console.log('📦 Data yang dikirim:', relawanData);

        try {
    const response = await fetch(API_REGISTRATION_URL, {
        method: 'POST',
        body: dataToSend,
    });

    const result = await response.json();
    console.log('📥 Response:', result);

    if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pendaftaran.");
    }

    // Sukses - langsung redirect
    navigate(`/pendaftaran-sukses/${finalActivityId}`, { 
        state: { 
            namaLengkap: formData.namaLengkap,
            programTitle: programTitle
        }
    });

} catch (error) {
    console.error("❌ Error:", error);
    setSubmissionError(error.message);
} finally {
    setIsSubmitting(false);
}
    };
    
    return (
        <div className="frame-8 daftar-relawan-page">
            {/* STEPPER */}
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

            {/* INFO PROGRAM */}
            <div className="program-info-box card-shadow registration-info-card">
                <p className="program-title-label">Program:</p>
                <h3 className="program-title-value">{programTitle}</h3>
            </div>
            
            {/* FORM KONFIRMASI */}
            <form onSubmit={handleSubmit} className="card-shadow step-3-confirmation">
                {/* ERROR BANNER */}
                {submissionError && (
                    <div className="error-banner" style={{
                        color: '#D8000C',
                        backgroundColor: '#FFD2D2',
                        marginBottom: '20px',
                        border: '1px solid #D8000C',
                        padding: '15px',
                        borderRadius: '5px'
                    }}>
                        <strong>⚠️ Error:</strong> {submissionError}
                    </div>
                )}
            
                {/* REVIEW DATA */}
                <div className="review-data-section">
                    <h4>Review Data Anda</h4>
                    <div className="review-grid" style={{display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '15px'}}>
                        <div className="review-col">
                            <p><strong>Nama:</strong> {formData.namaLengkap}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Telepon:</strong> {formData.noTelepon}</p>
                            <p><strong>Tanggal Lahir:</strong> {formData.tanggalLahir || '-'}</p>
                        </div>
                        <div className="review-col">
                            <p><strong>Domisili:</strong> {formData.domisili}</p>
                            <p><strong>Divisi:</strong> {formData.divisi}</p>
                            <p><strong>Komitmen:</strong> {formData.komitmen || '-'}</p>
                            <p><strong>Keahlian:</strong> {keahlianString}</p>
                        </div>
                    </div>
                    {portofolioFile && (
                        <p style={{marginTop: '10px', fontSize: '0.9em', color: '#666'}}>
                            📎 <strong>File:</strong> {portofolioFile.name}
                        </p>
                    )}
                </div>

                {/* AGREEMENT CHECKBOX */}
                <div className="agreement-section" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px'}}>
                    <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <input 
                            type="checkbox" 
                            id="agreement" 
                            checked={isAgreed} 
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            style={{marginRight: '10px', width: '18px', height: '18px'}}
                        />
                        <span>Saya menyatakan bahwa data yang saya masukkan adalah benar dan dapat dipertanggungjawabkan.</span>
                    </label>
                </div>

                {/* BUTTONS */}
                <div className="button-group" style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
                    <button 
                        type="button" 
                        onClick={handleBackStep} 
                        className="back-step-button" 
                        disabled={isSubmitting}
                        style={{opacity: isSubmitting ? 0.5 : 1}}
                    >
                        KEMBALI
                    </button>
                    <button 
                        type="submit" 
                        className="next-step-button" 
                        disabled={isSubmitting || !isAgreed}
                        style={{opacity: (isSubmitting || !isAgreed) ? 0.5 : 1}}
                    >
                        {isSubmitting ? 'MENGIRIM...' : 'KIRIM PENDAFTARAN'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KonfirmasiPendaftaran;