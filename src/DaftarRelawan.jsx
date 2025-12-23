import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './DaftarRelawan.css'; 
const API_BASE_URL = 'https://uasbackend-production-ae20.up.railway.app/api';
const API_URL = API_BASE_URL; 
const initialFormData = {
    namaLengkap: '',
    tanggalLahir: '',
    gender: '',
    email: '',
    noTelepon: '',
    profession: '',
    alamatLengkap: '',
    domisili: '',
    institution: '',
    source: '',
};

const DaftarRelawan = () => {
    const { activityId } = useParams();
    const navigate = useNavigate(); 
    const location = useLocation(); 
    
    const [programData, setProgramData] = useState(null); 
    
    useEffect(() => {
        const fetchProgram = async () => {
            if (!activityId || isNaN(parseInt(activityId))) return;

            try {
                const response = await axios.get(`${API_URL}/activities/${activityId}`);
                setProgramData(response.data); 
                
            } catch (error) {
                console.error('Gagal mengambil data program dari API:', error);
            }
        };

        fetchProgram();
    }, [activityId]); 

    const dataInitialStep1 = location.state?.dataStep1 || {};

    const [formData, setFormData] = useState({ 
        ...initialFormData,
        ...dataInitialStep1 
    });

    const programTitle = programData 
        ? programData.title.toUpperCase() 
        : "PROGRAM TIDAK DITEMUKAN";

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id === 'fullName' ? 'namaLengkap' : 
             id === 'birthDate' ? 'tanggalLahir' : 
             id === 'phone' ? 'noTelepon' :
             id === 'address' ? 'alamatLengkap' :
             id === 'domicile' ? 'domisili' :
             id === 'profession' ? 'profession' :
             id === 'gender' ? 'gender' :
             id === 'email' ? 'email' :
             id === 'source' ? 'source' :
             id === 'institution' ? 'institution' : id]: value
        }));
    };
    
    const handleNextStep = (e) => {
        e.preventDefault();
        
        const dataStep2ToPass = location.state?.dataStep2 || {};
        
        navigate(`/keahlian/${activityId}`, {
            state: { 
                dataStep1: formData, 
                dataStep2: dataStep2ToPass,
                programData: programData, 
            }
        });
    };

    return (
        <div className="frame-8 daftar-relawan-page">
            
            <section className="stepper-section">
                <div className="group-58 stepper-item active-step">
                    <div className="rectangle-48 checkmark">✅</div>
                    <div className="langkah-1-informasi-pribadi2">Langkah 1: Informasi Pribadi</div>
                </div>
                <div className="group-61 stepper-item">
                    <div className="rectangle-483">2</div>
                    <div className="langkah-2-keahlian-minat">Langkah 2: Keahlian & Minat</div>
                </div>
                <div className="group-62 stepper-item">
                    <div className="rectangle-482">3</div>
                    <div className="langkah-3-konfirmasi-persetujuan">Langkah 3: Konfirmasi & Persetujuan</div>
                </div>
            </section>

            <form onSubmit={handleNextStep} className="group-84 form-container">
                <div className="group-82 form-box">
                    
                    <div className="group-76 registration-info-card">
                        <div className="group-75">
                            <p className="anda-sedang-mendaftar-untuk-program">
                                Anda Sedang Mendaftar Untuk Program:
                            </p>
                            <h3 className="rumah-belajar-starban">{programTitle}</h3>
                        </div>
                    </div>

                    <div className="group-80 form-step-1">
                        <h4 className="langkah-1-informasi-pribadi">Langkah 1: Informasi Pribadi</h4>
                        
                        <div className="input-group-grid">
                            
                            <div className="input-group group-174">
                                <label htmlFor="fullName">Nama Lengkap</label>
                                <input id="fullName" type="text" placeholder="Masukkan nama lengkap Anda" 
                                        value={formData.namaLengkap} onChange={handleChange} required />
                            </div>
                            
                            <div className="input-group group-51">
                                <label htmlFor="birthDate">Tanggal Lahir</label>
                                <input id="birthDate" type="date" 
                                        value={formData.tanggalLahir} onChange={handleChange} required />
                            </div>
                            
                            <div className="input-group group-52">
                                <label htmlFor="gender">Jenis Kelamin</label>
                                <select id="gender" 
                                        value={formData.gender} onChange={handleChange} required>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div className="input-group group-53">
                                <label htmlFor="email">Alamat Email</label>
                                <input id="email" type="email" placeholder="contoh@mail.com" 
                                        value={formData.email} onChange={handleChange} required />
                            </div>
    
                            <div className="input-group group-54">
                                <label htmlFor="phone">Nomor Telepon</label>
                                <input id="phone" type="tel" placeholder="08xxxxxxxxxx" 
                                        value={formData.noTelepon} onChange={handleChange} required />
                            </div>

                            <div className="input-group group-55">
                                <label htmlFor="profession">Profesi/Pekerjaan Saat ini</label>
                                <input id="profession" type="text" placeholder="Mahasiswa/Karyawan/Lainnya" 
                                        value={formData.profession} onChange={handleChange} />
                            </div>

                            <div className="input-group group-50 full-width">
                                <label htmlFor="address">Alamat Lengkap</label>
                                <textarea id="address" rows="3" placeholder="Alamat tinggal Anda saat ini"
                                            value={formData.alamatLengkap} onChange={handleChange} required></textarea>
                            </div>

                            <div className="input-group group-51">
                                <label htmlFor="domicile">Domisili Saat Ini (Kota/Kabupaten)*</label>
                                <input id="domicile" type="text" required placeholder="Contoh: Medan" 
                                        value={formData.domisili} onChange={handleChange} />
                            </div>
                            
                            <div className="input-group group-52">
                                <label htmlFor="institution">Instansi/Universitas (Opsional)</label>
                                <input id="institution" type="text" placeholder="Nama Instansi" 
                                        value={formData.institution} onChange={handleChange} />
                            </div>
                            
                            <div className="input-group group-53">
                                <label htmlFor="source">Sumber Info Program Ini</label>
                                <select id="source"
                                        value={formData.source} onChange={handleChange} required>
                                    <option value="">Pilih Sumber Informasi</option>
                                    <option value="IG">Instagram</option>
                                    <option value="WEB">Website SatuAksi</option>
                                    <option value="TEMAN">Teman/Keluarga</option>
                                    <option value="LAINNYA">Lainnya</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="group-57 next-step-button-wrapper">
                        <button type="submit" className="group-81 next-step-button">
                            <div className="lanjut-ke-langkah-berikutnya">
                                LANJUT KE LANGKAH BERIKUTNYA
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DaftarRelawan;