import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://uasbackend-production-ae20.up.railway.app/api';

const DaftarRelawanKonfirmasi = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { finalData, portofolioFile, programData } = location.state || {};

    const handleKirim = async () => {
        setLoading(true);
        const data = new FormData();
        
        // Membungkus data agar sesuai dengan req.body backend Anda
        data.append('full_name', finalData.namaLengkap);
        data.append('email', finalData.email);
        data.append('phone', finalData.noTelepon);
        data.append('birth_date', finalData.tanggalLahir);
        data.append('gender', finalData.gender);
        data.append('address', finalData.alamatLengkap);
        data.append('domicile', finalData.domisili);
        data.append('profession', finalData.profession);
        data.append('institution', finalData.institution);
        data.append('source', finalData.source);
        data.append('skills', finalData.skills);
        data.append('division', finalData.divisi);
        data.append('motivation', finalData.motivasi);
        data.append('activity_id', finalData.activity_id);
        data.append('portofolio', portofolioFile);

        try {
            const res = await axios.post(`${API_URL}/registrations`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (res.data.success) {
                alert("Pendaftaran Berhasil!");
                navigate('/');
            }
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Gagal mengirim data"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Konfirmasi Data</h2>
            <p>Nama: {finalData?.namaLengkap}</p>
            <p>Program: {programData?.title}</p>
            <button onClick={handleKirim} disabled={loading}>
                {loading ? "MENGIRIM..." : "KIRIM SEKARANG"}
            </button>
        </div>
    );
};

export default DaftarRelawanKonfirmasi;