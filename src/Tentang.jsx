// src/Tentang.jsx (FINAL - GAMBAR ABOUTUS.JPG JADI HEADER UTAMA)

import React from 'react';
import { Link } from 'react-router-dom'; 

// Import file aboutus.jpg dari folder src/assets
import AboutUsImage from './assets/aboutus.jpg'; 

function Tentang() {
  return (
    <div className="frame-2 tentang-page-wrapper"> 
      
      {/* 🖼️ GAMBAR ABOUTUS.JPG SEBAGAI HEADER UTAMA DIBAWAH NAVBAR */}
      <section className="aboutus-header-image-section">
          <div className="about-image-wrapper">
              <img 
                  className="aboutus-image header-image" 
                  src={AboutUsImage} 
                  alt="Tim Relawan Saat Aksi" 
              />
          </div>
          {/* ❌ TITLE BOX DAN TULISAN "TENTANG KAMI" DIHAPUS */}
          {/* <div className="tentang-kami-title-box">
             <h1 className="tentang-kami-hero-title">Tentang Kami</h1>
          </div> */}
      </section>

      {/* --- CONTENT SECTION (Latar Belakang & Card) --- */}
      <section className="about-content-section">
        
        {/* ❌ SUBTITLE "LATAR BELAKANG" DIHAPUS */}
        {/* <div className="subtitle">Latar Belakang</div> */}
        
        <div className="section-title">Kenali Lebih Jauh Tentang Kami</div>
        
        <div className="content-wrapper">
            
            <div className="paragraf-cards-group"> 
                {/* ... (Konten Card Misi, Visi, Program tetap sama) ... */}
                <div className="paragraf-card paragraf-misi"> 
                    <h3>Misi Utama Kami</h3>
                    <p>Misi kami adalah menjembatani masyarakat yang memiliki semangat berbagi 
                    dengan komunitas yang membutuhkan bantuan nyata, baik dalam bentuk edukasi, 
                    kemanusiaan, maupun pelestarian lingkungan. Kami fokus pada keberlanjutan 
                    dampak dan pengembangan potensi lokal.</p>
                </div>
                
                <div className="paragraf-card paragraf-visi">
                    <h3>Visi dan Filosofi Kami</h3>
                    <p>Didirikan oleh sekelompok anak muda yang peduli terhadap isu sosial, lingkungan, dan
                    kemanusiaan. Kami meyakini bahwa kebaikan bukan hanya tentang memberi, tetapi juga tentang 
                    berbagi waktu, tenaga, dan empati kepada mereka yang membutuhkan. Solidaritas, kepedulian, 
                    dan kolaborasi adalah nilai-nilai yang kami junjung tinggi dalam setiap langkah. </p>
                </div>
                
                <div className="paragraf-card paragraf-program">
                    <h3>Dampak dan Perubahan</h3>
                    <p>Kami menjalankan berbagai program sosial mulai dari kegiatan lingkungan, edukasi
                    anak, hingga aksi kemanusiaan di berbagai daerah di Indonesia. Setiap
                    kegiatan kami dirancang untuk memberikan dampak berkelanjutan dan membangun
                    kesadaran bahwa semua orang memiliki peran dalam menciptakan dunia yang lebih baik.
                    Melalui SatuAksi, kami ingin menumbuhkan generasi yang peduli dan berdaya, karena 
                    satu aksi kecil yang dilakukan bersama-sama mampu menciptakan perubahan besar bagi masa depan.</p>
                </div>
            </div>
            
        </div> 
      </section>
      
    </div>
  );
}

export default Tentang;