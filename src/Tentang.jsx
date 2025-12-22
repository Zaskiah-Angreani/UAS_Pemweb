import React from 'react';
import './Tentang.css'; 
import AboutUsImage from './assets/aboutus.jpg'; 

function Tentang() {
  return (
    <div className="tentang-page">
      {/* Bagian Atas: Gambar Full & Judul Ringan */}
      <header className="about-header">
        <img src={AboutUsImage} alt="Volunteer SatuAksi" className="main-image" />
        <h1>Tentang SatuAksi</h1>
      </header>

      <main className="about-content">
        {/* Cerita Kami */}
        <section className="story-section">
          <h2>Kenali Lebih Jauh</h2>
          <p>
            SatuAksi lahir dari kegelisahan sekelompok anak muda akan isu sosial dan lingkungan di sekitar kita. 
            Kami percaya bahwa kebaikan tidak melulu soal materi, tapi juga tentang kehadiran, tenaga, dan empati 
            yang kita bagikan kepada mereka yang membutuhkan.
          </p>
        </section>

        {/* Visi Misi - Layout Bersih tanpa Kotak Kaku */}
        <section className="vision-mission-section">
          <div className="item">
            <h3>Misi Kami</h3>
            <p>Menjadi jembatan bagi relawan untuk menyalurkan semangat berbagi dalam bidang edukasi, kemanusiaan, dan lingkungan.</p>
          </div>
          <div className="item">
            <h3>Visi Kami</h3>
            <p>Menciptakan ekosistem kolaborasi yang solid demi terciptanya perubahan nyata yang berkelanjutan bagi masyarakat lokal.</p>
          </div>
        </section>

        {/* Penutup */}
        <section className="impact-statement">
          <p>
            Melalui setiap program yang dijalankan, kami ingin menumbuhkan generasi yang lebih peka dan berdaya. 
            Sebab, satu aksi kecil yang dilakukan bersama akan selalu lebih baik daripada diam melihat keadaan.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Tentang;