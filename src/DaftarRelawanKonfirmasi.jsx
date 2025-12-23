import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DaftarRelawanKonfirmasi = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { activityId } = useParams();
    const [loading, setLoading] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    // Ambil data yang diteruskan dari Langkah 1 & 2
    const { finalData, portofolioFile, programData } = location.state || {};

    const handleSubmit = async () => {
        if (!isAgreed) {
            alert("Anda harus menyetujui bahwa data di atas benar.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            
            // Mapping data agar sesuai dengan field Backend (Database)
            formData.append('full_name', finalData.namaLengkap);
            formData.append('email', finalData.email);
            formData.append('phone', finalData.noTelepon);
            formData.append('birth_date', finalData.tanggalLahir);
            formData.append('gender', finalData.gender);
            formData.append('address', finalData.alamatLengkap);
            formData.append('domicile', finalData.domisili);
            formData.append('profession', finalData.profession);
            formData.append('institution', finalData.institution || '-');
            formData.append('source', finalData.source);
            formData.append('skills', finalData.keahlian.join(', '));
            formData.append('division', finalData.divisi);
            formData.append('motivation', finalData.motivasi);
            formData.append('activity_id', activityId);
            
            // Mengirim file portofolio asli
            if (portofolioFile) {
                formData.append('portofolio', portofolioFile);
            }

            const response = await axios.post(`${API_URL}/registrations`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201 || response.status === 200) {
                alert("Pendaftaran Berhasil Dikirim!");
                navigate(`/success-page`, { state: { name: finalData.namaLengkap } });
            }
        } catch (error) {
            console.error("Submission Error:", error.response?.data);
            alert("Gagal mengirim: " + (error.response?.data?.message || "Internal Server Error"));
        } finally {
            setLoading(false);
        }
    };

    if (!finalData) return <div className="p-10">Data tidak ditemukan. Silakan isi kembali dari awal.</div>;

    return (
        <div className="konfirmasi-pendaftaran-container">
            <h3>Review Data Anda</h3>
            <div className="review-grid">
                <p><strong>Nama:</strong> {finalData.namaLengkap}</p>
                <p><strong>Email:</strong> {finalData.email}</p>
                <p><strong>Telepon:</strong> {finalData.noTelepon}</p>
                <p><strong>Domisili:</strong> {finalData.domisili}</p>
                <p><strong>Divisi:</strong> {finalData.divisi}</p>
            </div>

            <div className="agreement-section">
                <input 
                    type="checkbox" 
                    id="agree" 
                    checked={isAgreed} 
                    onChange={(e) => setIsAgreed(e.target.checked)} 
                />
                <label htmlFor="agree"> Saya menyatakan data di atas benar.</label>
            </div>

            <div className="button-group">
                <button onClick={() => navigate(-1)} className="btn-kembali">KEMBALI</button>
                <button 
                    onClick={handleSubmit} 
                    className="btn-kirim" 
                    disabled={loading}
                >
                    {loading ? "MENGIRIM..." : "KIRIM PENDAFTARAN"}
                </button>
            </div>
        </div>
    );
};

export default DaftarRelawanKonfirmasi;