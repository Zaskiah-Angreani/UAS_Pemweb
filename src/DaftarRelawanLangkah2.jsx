import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import './DaftarRelawan.css'; 

const KeahlianList = ['Desain Grafis', 'Public Speaking', 'Photography', 'Lainnya'];
const KomitmenList = ['4-8 jam/minggu', 'Fleksibel', '1-2 jam/minggu', '1-3 jam/minggu'];
const DivisiList = [
    { value: 'PR', label: 'Public Relation' },
    { value: 'Partnership', label: 'Partnership & Sponshorship' },
    { value: 'SMM', label: 'Social Media Management' },
    { value: 'HRD', label: 'Human Resource Division' },
    { value: 'TT', label: 'Team Teaching' }
];

const initialFormDataStep2 = {
    keahlian: [], 
    komitmen: '', 
    divisi: '', 
    motivasi: '', 
};


const DaftarRelawanLangkah2 = () => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const programData = location.state?.programData || null; 
    
    const dataFromStep1 = location.state?.dataStep1 || {};
    
    const dataInitialStep2 = location.state?.dataStep2 || {}; 
    
    const programTitle = programData 
        ? programData.title.toUpperCase() 
        : "PROGRAM TIDAK DITEMUKAN";

    const [formDataStep2, setFormDataStep2] = useState({
        ...initialFormDataStep2,
        keahlian: dataInitialStep2.keahlian || [], 
        komitmen: dataInitialStep2.komitmen || '', 
        divisi: dataInitialStep2.divisi || '', 
        motivasi: dataInitialStep2.motivasi || '', 
    });
 
    const [portofolioFile, setPortofolioFile] = useState(dataInitialStep2.portofolio || null);
   
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            const currentSkills = formDataStep2.keahlian;
    
            if (checked && currentSkills.length >= 3 && !currentSkills.includes(value)) {
                alert("Maksimal hanya boleh memilih 3 Keahlian Utama.");
                return;
            }

            setFormDataStep2(prev => ({ 
                ...prev,
                keahlian: checked 
                    ? [...currentSkills, value]
                    : currentSkills.filter(k => k !== value)
            }));
        } else if (type === 'file') {
            setPortofolioFile(files[0] || null); 
        } else {
            setFormDataStep2(prev => ({ ...prev, [name]: value })); 
        }
    };
   
    const handleLanjut = (e) => {
        e.preventDefault();
       
        if (!formDataStep2.komitmen || !formDataStep2.divisi || !formDataStep2.motivasi || formDataStep2.keahlian.length === 0 || !portofolioFile) {
            alert("Mohon lengkapi semua kolom wajib di Langkah 2 (Keahlian, Komitmen, Divisi, Motivasi, dan Portofolio)!");
            return;
        }

        const finalData = {
            ...dataFromStep1, 
            ...formDataStep2, 
            portofolio: portofolioFile, 
        };

        navigate(`/konfirmasi/${activityId}`, { 
            state: { 
                finalData: finalData, 
                programData: programData 
            } 
        }); 
    };

    const handleKembali = () => {

        navigate(`/daftar/${activityId}`, { 
            state: { 
                dataStep1: dataFromStep1, 
                dataStep2: {
                    ...formDataStep2,
                    portofolio: portofolioFile
                },
                programData: programData 
            } 
        }); 
    };
    
    return (
        <div className="frame-9 daftar-relawan-page">
            
            <div className="stepper-section">
    
                <div className="group-58 stepper-item completed-step" onClick={handleKembali} style={{cursor: 'pointer'}}>
                    <div className="rectangle-48 checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1: Informasi Pribadi</div>
                </div>
              
                <div className="step-separator completed"></div>
               
                <div className="group-61 stepper-item active-step">
                    <div className="rectangle-483">2</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</div>
                </div>
              
                <div className="step-separator"></div>
               
                <div className="group-62 stepper-item">
                    <div className="rectangle-482">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>
            </div>

            <div className="program-info-box card-shadow registration-info-card">
                <p className="program-title-label">Anda Sedang Mendaftar Untuk Program:</p>
                <h3 className="program-title-value">{programTitle}</h3>
            </div>

            <form onSubmit={handleLanjut} className="group-84 form-container">
                <div className="group-166 form-box">

                    <div className="group-164 form-step-2">
                        <h4 className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</h4>
                        
                        <div className="step-2-content-grid">
                            <div className="column-left column-grid-2x2">
                              
                                <div className="input-group keahlian-group card-shadow full-grid-width">
                                    <label>Keahlian Utama (Pilih Maksimal 3)</label>
                                    <div className="selection-group grid-options">
                                        {KeahlianList.map(skill => (
                                            <label key={skill} className="selection-box checkbox-item">
                                                <input type="checkbox" name="keahlian" value={skill} 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.keahlian.includes(skill)}/>
                                                <span className="option-label">{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                             
                                <div className="input-group commitment-group card-shadow">
                                    <label>Komitmen Waktu (Pilih 1)*</label>
                                    <div className="selection-group">
                                        {KomitmenList.map(commitment => (
                                            <label key={commitment} className="selection-box radio-item">
                                                <input type="radio" name="komitmen" value={commitment} required 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.komitmen === commitment} />
                                                <span className="option-label">{commitment}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                        
                                <div className="input-group divisi-group card-shadow">
                                    <label>Pilihan Divisi (Pilih 1)*</label>
                                    <div className="selection-group">
                                        {DivisiList.map(divisi => (
                                            <label key={divisi.value} className="selection-box radio-item">
                                                <input type="radio" name="divisi" value={divisi.label} required 
                                                        onChange={handleChange} 
                                                        checked={formDataStep2.divisi === divisi.label} />
                                                <span className="option-label">{divisi.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                          
                            <div className="column-right">
                              
                                <div className="input-group motivation-group card-shadow">
                                    <label htmlFor="motivasi">Motivasi Bergabung*</label>
                                    <textarea id="motivasi" name="motivasi" className="textarea-full-height" required 
                                                placeholder="Jelaskan alasan kuat Anda ingin bergabung..."
                                                value={formDataStep2.motivasi}
                                                onChange={handleChange}/>
                                </div>
                               
                                <div className="input-group file-upload-group card-shadow">
                                    <label htmlFor="portofolio" className="portofolio-cv-wajib">Portofolio / CV (Wajib)*</label>
                                    <input id="portofolio" name="portofolio" type="file" required 
                                            onChange={handleChange}/>
                                    <p className="file-info-text">
                                        {portofolioFile ? `File terpilih: ${portofolioFile.name}` : 'Maks. 5MB (PDF/DOCX/JPG/PNG)'}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="button-group-wrapper"> 
                        <div className="group-57 back-step-button-wrapper"> 
                            <button type="button" onClick={handleKembali} className="back-step-button">
                                KEMBALI KE LANGKAH SEBELUMNYA
                            </button>
                        </div>
                        <div className="group-57 next-step-button-wrapper"> 
                            <button type="submit" className="next-step-button">
                                LANJUT KE LANGKAH BERIKUTNYA
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default DaftarRelawanLangkah2;