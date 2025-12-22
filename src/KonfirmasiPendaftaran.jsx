import React, { useState } from 'react'; 
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import './DaftarRelawan.css'; 
const API_BASE_URL = 'https://uasbackendpemweb-production-b27f.up.railway.app/api';
const API_URL = API_BASE_URL; 
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
    const { activityId } = useParams();
   
    console.log("Activity ID dari useParams:", activityId); 
    console.log("Tipe data Activity ID:", typeof activityId); 
    
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
                <Link to={`/daftar/${activityId || ''}`} className="next-step-button" style={{marginTop: '20px'}}>
                    Mulai Ulang Pendaftaran
                </Link>
            </div>
        );
    }

    const handleBackStep = () => {
        const dataStep1 = {
            namaLengkap: formData.namaLengkap, email: formData.email, noTelepon: formData.noTelepon,
            tanggalLahir: formData.tanggalLahir, gender: formData.gender, alamatLengkap: formData.alamatLengkap, 
            source: formData.source, profession: formData.profession, domisili: formData.domisili, institution: formData.institution
        };
        const dataStep2 = {
            keahlian: formData.keahlian, komitmen: formData.komitmen, divisi: formData.divisi, motivasi: formData.motivasi,
            portofolio: portofolioFile 
        };
        
        navigate(`/keahlian/${activityId}`, { 
            state: { 
                dataStep1: dataStep1, 
                dataStep2: dataStep2,
                programData: programData, 
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);

        const finalActivityId = parseInt(activityId); 
        
        if (isNaN(finalActivityId) || finalActivityId <= 0) {
            setSubmissionError("ID Program tidak ditemukan di URL. Mohon periksa navigasi dari Langkah 2.");
            console.error("DEBUG ERROR: ID Program tidak valid. Activity ID yang terbaca:", activityId);
            return; 
        }

        if (!isAgreed) {
            setSubmissionError("Anda harus menyetujui syarat & ketentuan untuk melanjutkan.");
            return;
        }

        if (!portofolioFile) {
            setSubmissionError("File portofolio hilang. Mohon kembali ke langkah 2 dan unggah ulang.");
            return;
        }

        setIsSubmitting(true);
        
        const dataToSend = new FormData();

        const relawanData = {
            registration_id: finalActivityId, 
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
            
            keahlian: Array.isArray(formData.keahlian) ? formData.keahlian.join(',') : formData.keahlian, 
            commitment_time: formData.komitmen,
            chosen_division: formData.divisi,
            motivation_text: formData.motivasi,
        };
        
        dataToSend.append('relawanData', JSON.stringify(relawanData));
      
        dataToSend.append('portofolio', portofolioFile, portofolioFile.name); 

        try {
         
            const response = await fetch(API_REGISTRATION_URL, {
                method: 'POST',
                body: dataToSend, 
            });
            
            let result = {};
            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                if (response.ok) {
                    result = { registrationId: 999, message: 'Pendaftaran sukses, namun respons backend tidak berformat JSON.' }; 
                }
            }


            if (!response.ok) {
                const errorMessage = result.message || 
                                     result.detail || 
                                     `Gagal mengirim pendaftaran. Status: ${response.status}.`;
                throw new Error(errorMessage);
            }

            navigate(`/pendaftaran-sukses/${finalActivityId}`, { 
                state: { 
                    namaLengkap: formData.namaLengkap, 
                    programTitle: programTitle,
                    registrationId: result.registrationId, 
                }
            });

        } catch (error) {
            console.error("Submission Error:", error);
            if (error.message.includes("Failed to fetch")) {
                setSubmissionError(`Gagal menghubungi server. Kemungkinan server offline, error CORS, atau URL API salah. Cek: ${API_REGISTRATION_URL}`);
            } else if (error.message.includes("404")) {
                 setSubmissionError(`Endpoint tidak ditemukan (404). Pastikan route POST ${API_REGISTRATION_URL} sudah didaftarkan dengan benar di backend.`);
            } else {
                setSubmissionError(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="frame-8 daftar-relawan-page">
            
            <div className="stepper-section">
             
                <div className="group-58 stepper-item completed-step" onClick={handleBackStep} style={{cursor: 'pointer'}}>
                    <div className="rectangle-48 checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1: Informasi Pribadi</div>
                </div>
             
                <div className="step-separator completed"></div>
              
                <div className="group-61 stepper-item completed-step" onClick={handleBackStep} style={{cursor: 'pointer'}}>
                    <div className="rectangle-483 checkmark">✅</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</div>
                </div>
                
                <div className="step-separator completed"></div>
               
                <div className="group-62 stepper-item active-step">
                    <div className="rectangle-482">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>
            </div>

            <div className="program-info-box card-shadow registration-info-card">
                <p className="program-title-label">Anda Sedang Mendaftar Untuk Program:</p>
                <h3 className="program-title-value">{programTitle}</h3>
                <p style={{marginTop: '5px', fontSize: '0.8em', color: '#888'}}>ID Program yang terbaca: {activityId || 'TIDAK TERBACA'}</p> 
            </div>
            
            <form onSubmit={handleSubmit} className="card-shadow step-3-confirmation">
                {submissionError && (
                    <div style={{color: 'red', textAlign: 'center', padding: '10px', border: '1px solid red', marginBottom: '20px'}}>
                        **🚨 Kesalahan:** {submissionError}
                        <hr style={{margin: '10px 0'}}/>
                        <p style={{fontSize: '0.9em', color: '#cc0000'}}>
                            Jika pesan ini adalah **"ID Program tidak ditemukan di URL"**, cek Konsol *browser* Anda untuk nilai Activity ID.
                        </p>
                    </div>
                )}
            
                <div className="review-data-section">
                    <h4>Review Data Pendaftaran Anda</h4>
                    
                    <div className="review-group-data" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                      
                        <div className="review-column">
                            <h5>1. Data Pribadi</h5>
                            <p><strong>Nama Lengkap:</strong> {formData.namaLengkap}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Tanggal Lahir:</strong> {formatToUserDate(formData.tanggalLahir)}</p>
                            <p><strong>No. Telepon:</strong> {formData.noTelepon}</p>
                            <p><strong>Gender:</strong> {formData.gender}</p>
                            <p><strong>Pekerjaan:</strong> {formData.profession || '-'}</p>
                        </div>
                        
                        <div className="review-column">
                            <h5>2. Data Keahlian & Minat</h5>
                            <p><strong>Alamat Lengkap:</strong> {formData.alamatLengkap}</p>
                            <p><strong>Domisili:</strong> {formData.domisili}</p>
                            <p><strong>Institusi/Kampus:</strong> {formData.institution || '-'}</p>
                            <p><strong>Keahlian:</strong> {keahlianString}</p>
                            <p><strong>Komitmen Waktu:</strong> {formData.komitmen}</p>
                            <p><strong>Divisi Minat:</strong> {formData.divisi}</p>
                            <p><strong>Sumber Info:</strong> {formData.source}</p>
                        </div>
                    </div>
                    
                    <div className="review-group-motivasi-cv" style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px'}}>
                        <h5>3. Motivasi & Kelengkapan Dokumen</h5>
                        <p><strong>Motivasi:</strong> {formData.motivasi}</p>
                        <p>
                            <strong>File Portofolio/CV:</strong> 
                            {portofolioFile ? 
                                <span style={{color: 'green', fontWeight: 'bold'}}> {portofolioFile.name} (Siap Kirim)</span> : 
                                <span style={{color: 'red'}}> Belum ada file terlampir!</span>
                            }
                        </p>
                    </div>
                </div>

                <div className="agreement-section">
                    <div className="agreement-checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            id="agreement" 
                            checked={isAgreed} 
                            onChange={(e) => setIsAgreed(e.target.checked)} 
                            required 
                        />
                        <label htmlFor="agreement" className="agreement-text">
                            Saya menyatakan bahwa semua data di atas adalah benar dan menyetujui syarat & ketentuan relawan.
                        </label>
                    </div>
                </div>

                <div className="button-group-wrapper">
                    <div className="group-57">
                        <button type="button" onClick={handleBackStep} className="back-step-button" disabled={isSubmitting}>
                            KEMBALI KE LANGKAH SEBELUMNYA
                        </button>
                    </div>
                    <div className="group-57">
                        <button type="submit" className="next-step-button" disabled={isSubmitting}>
                            {isSubmitting ? 'MENGIRIM...' : 'KIRIM PENDAFTARAN'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default KonfirmasiPendaftaran;