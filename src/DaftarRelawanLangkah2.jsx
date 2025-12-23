import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const KeahlianList = ['Desain Grafis', 'Public Speaking', 'Photography', 'Penulisan', 'Lainnya'];
const DivisiList = ['Public Relation', 'Partnership', 'Social Media', 'Human Resource', 'Team Teaching'];

const DaftarRelawanLangkah2 = () => {
    const { activityId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 
    const { dataStep1, programData } = location.state || {};

    const [formDataStep2, setFormDataStep2] = useState({
        keahlian: [], komitmen: '', divisi: '', motivasi: '',
    });
    const [portofolioFile, setPortofolioFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            const current = formDataStep2.keahlian;
            setFormDataStep2(prev => ({
                ...prev,
                keahlian: checked ? [...current, value] : current.filter(k => k !== value)
            }));
        } else if (type === 'file') {
            setPortofolioFile(files[0]);
        } else {
            setFormDataStep2(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLanjut = (e) => {
        e.preventDefault();
        if (formDataStep2.keahlian.length === 0 || !portofolioFile) {
            alert("Keahlian dan Portofolio wajib diisi!");
            return;
        }

        // MAPPING DATA KE FORMAT DATABASE
        const finalData = {
            ...dataStep1,
            ...formDataStep2,
            activity_id: activityId,
            skills: formDataStep2.keahlian.join(', ')
        };

        navigate(`/konfirmasi/${activityId}`, { 
            state: { finalData, portofolioFile, programData } 
        }); 
    };

    return (
        <form onSubmit={handleLanjut} className="form-container">
            <h4>Langkah 2: Keahlian & Minat</h4>
            <div>
                <label>Keahlian (Pilih):</label>
                {KeahlianList.map(s => (
                    <label key={s}><input type="checkbox" value={s} onChange={handleChange} /> {s}</label>
                ))}
            </div>
            <select name="divisi" onChange={handleChange} required>
                <option value="">Pilih Divisi</option>
                {DivisiList.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <textarea name="motivasi" placeholder="Motivasi Anda" onChange={handleChange} required />
            <input type="file" onChange={handleChange} required />
            <button type="submit">REVIEW PENDAFTARAN</button>
        </form>
    );
};

export default DaftarRelawanLangkah2;