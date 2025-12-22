import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import './Aktivitas.css'; 
import { activityImages } from './assetsmaps'; 

// Menggunakan URL lokal sesuai dengan terminal port 4000 Anda
const API_URL = 'http://localhost:4000/api/activities'; 

const ActivityCard = ({ title, category, location, event_day, event_time, description, image_url, id }) => {
    
    const trimDescription = (text, maxLength) => {
        if (!text) return "";
        if (text.length > maxLength) {
            let trimmedText = text.substring(0, maxLength);
            trimmedText = trimmedText.substring(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
            return trimmedText + "...";
        }
        return text;
    };
    
    const fullTime = `${event_day || ''}, ${event_time || ''}`; 
    const shortDescription = trimDescription(description, 80);

    // Perbaikan: Mencari di assetsmaps, jika nama file dari database tidak cocok, gunakan placeholder
    const imageSource = activityImages[image_url] || activityImages['placeholder.jpg'] || 'https://via.placeholder.com/400x250?text=SatuAksi';

    return (
        <div className="activity-card">
            <div className="card-image-wrapper">
                <img 
                    className="card-image" 
                    src={imageSource} 
                    alt={title} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Thumbnail+Error'; }}
                /> 
            </div>
            
            <div className="card-content">
                <h3 className="activity-title">{title}</h3>
                <div className={`category-button category-${category?.toLowerCase()}`}>
                    {category}
                </div>
                
                <div className="activity-description">
                    <p>{shortDescription}</p> 
                </div>
                
                <div className="activity-meta-row">
                    <div className="meta-item">
                        <span className="meta-icon">📍</span> 
                        <span className="meta-text">{location || 'Lokasi belum ditentukan'}</span> 
                    </div>
                </div>
                <div className="activity-meta-row"> 
                    <div className="meta-item">
                        <span className="meta-icon">⏱️</span> 
                        <span className="meta-text">{fullTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Aktivitas() {
    const location = useLocation(); 

    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]); 
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL); 
                
                // Pastikan mengambil data baik jika response.data adalah array atau objek { data: [] }
                const rawData = Array.isArray(response.data) ? response.data : response.data.data;
                
                if (rawData) {
                    // Menghapus filter 'mendatang' agar semua data yang ada di database Anda muncul
                    setActivities(rawData); 
                    setFilteredActivities(rawData); 
                }
                setError(null);

            } catch (err) {
                console.error("Gagal mengambil data aktivitas:", err);
                setError("Gagal memuat aktivitas dari server. Pastikan backend berjalan di port 4000."); 
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []); 

    const handleSearch = () => {
        const query = searchText.toLowerCase().trim();

        if (query === '') {
            setFilteredActivities(activities); 
            return;
        }

        const results = activities.filter(activity => {
            return (
                activity.title?.toLowerCase().includes(query) ||
                activity.category?.toLowerCase().includes(query) ||
                activity.location?.toLowerCase().includes(query) || 
                activity.description?.toLowerCase().includes(query)
            );
        });

        setFilteredActivities(results);
    };

    return (
        <div className="aktivitas-page">
            
            <section className="search-filter-section">
                <div className="search-text-group">
                    <h1 className="search-headline">Jelajahi Peluang Volunteer</h1>
                    <p className="search-subtext">Temukan Peran yang sesuai dengan minat anda</p>
                    <p className="search-subtext-2">Mari buat dampak positif!</p>
                </div>

                <div className="search-bar-group">
                    <div className="search-bar-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Cari aktivitas, lokasi, atau kategori"
                            className="search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                        />
                    </div>
                    <button className="search-button" onClick={handleSearch}>
                        Cari
                    </button>
                </div>
            </section>
        
            <section className="activities-grid-section">
                <h2 className="grid-title">Daftar Semua Aktivitas</h2>
                
                <div className="activities-grid">
                    
                    {loading && <p className="status-message">⏳ Memuat aktivitas...</p>}
                    {error && <p className="status-message error-message">❌ {error}</p>}
                    
                    {!loading && !error && filteredActivities.length > 0 ? (
                        filteredActivities.map(activity => (
                            <Link to={`/aktivitas/${activity.id}`} className="activity-card-link" key={activity.id}>
                                <ActivityCard 
                                    id={activity.id}
                                    title={activity.title}
                                    category={activity.category}
                                    description={activity.description}
                                    event_day={activity.event_day}
                                    event_time={activity.event_time}
                                    location={activity.location} 
                                    image_url={activity.image_url} 
                                />
                            </Link>
                        ))
                    ) : (
                        !loading && !error && (
                            <p className="no-results-message">
                                Tidak ditemukan aktivitas yang cocok.
                            </p>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}

export default Aktivitas;