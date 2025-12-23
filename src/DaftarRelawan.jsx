import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './DaftarRelawan.css'; 

const API_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DaftarRelawan = () => {
    const { activityId } = useParams();
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const [programData, setProgramData] = useState(null); 

    const [formData, setFormData] = useState({ 
        namaLengkap: location.state?.dataStep1?.namaLengkap || '',
        tanggalLahir: location.state?.dataStep1?.tanggalLahir || '',
        gender: location.state?.dataStep1?.gender || '',
        email: location.state?.dataStep1?.email || '',
        noTelepon: location.state?.dataStep1?.noTelepon || '',
        profession: location.state?.dataStep1?.profession || '',
        alamatLengkap: location.state?.dataStep1?.alamatLengkap || '',
        domisili: location.state?.dataStep1?.domisili || '',
        institution: location.state?.dataStep1?.institution || '',
        source: location.state?.dataStep1?.source || '',
    });

    useEffect(() => {
        const fetchProgram = async () => {
            if (!activityId) return;
            try {
                const response = await axios.get(`${API_URL}/activities/${activityId}`);
                setProgramData(response.data); 
            } catch (error) {
                console.error('Gagal mengambil data program:', error);
            }
        };
        fetchProgram();
    }, [activityId]); 

    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldMap = {
            fullName: 'namaLengkap', birthDate: 'tanggalLahir', phone: 'noTelepon',
            address: 'alamatLengkap', domicile: 'domisili'
        };
        const fieldName = fieldMap[id] || id;
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };
    
    const handleNextStep = (e) => {
        e.preventDefault();
        navigate(`/keahlian/${activityId}`, {
            state: { 
                dataStep1: formData, 
                programData: programData 
            }
        });
    };

    return (
        <div className="frame-8 daftar-relawan-page">
            <section className="stepper-section">
                <div className="stepper-item active-step">
                    <div className="rectangle-48">1</div>
                    <div>Langkah 1: Informasi Pribadi</div>
                </div>
                <div className="stepper-item">2</div>
                <div className="stepper-item">3</div>
            </section>

            <form onSubmit={handleNextStep} className="form-container">
                <h3>Mendaftar Untuk: {programData?.title?.toUpperCase() || "MEMUAT..."}</h3>
                <div className="input-group-grid">
                    <input id="fullName" type="text" placeholder="Nama Lengkap" value={formData.namaLengkap} onChange={handleChange} required />
                    <input id="birthDate" type="date" value={formData.tanggalLahir} onChange={handleChange} required />
                    <select id="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Pilih Gender</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                    <input id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input id="phone" type="tel" placeholder="Nomor Telepon" value={formData.noTelepon} onChange={handleChange} required />
                    <input id="profession" type="text" placeholder="Profesi" value={formData.profession} onChange={handleChange} />
                    <textarea id="address" placeholder="Alamat Lengkap" value={formData.alamatLengkap} onChange={handleChange} required />
                    <input id="domicile" type="text" placeholder="Domisili" value={formData.domisili} onChange={handleChange} required />
                    <input id="institution" type="text" placeholder="Instansi" value={formData.institution} onChange={handleChange} />
                    <select id="source" value={formData.source} onChange={handleChange} required>
                        <option value="">Sumber Info</option>
                        <option value="IG">Instagram</option>
                        <option value="WEB">Website</option>
                    </select>
                </div>
                <button type="submit" className="next-step-button">LANJUT KE LANGKAH 2</button>
            </form>
        </div>
    );
};

export default DaftarRelawan;