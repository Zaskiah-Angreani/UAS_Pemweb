import React from "react";
import { Link } from 'react-router-dom'; 
import VolunteerImage from './assets/volunteer1.jpg'; 
import IkonMakan from './assets/ikonmakan-removebg-preview.png'; 
import IkonSosial from './assets/ikonsosial2-removebg-preview.png'; 
import IkonLingkungan from './assets/ikonlingkungan-removebg-preview.png'; 

const programs = [
  { 
    icon: IkonMakan, 
    title: 'Pemberian\nMakanan', 
    className: 'pemberian-makanan'
  },
  { 
    icon: IkonSosial, 
    title: 'Aksi\nSosial', 
    className: 'aksi-sosial'
  },
  { 
    icon: IkonLingkungan, 
    title: 'Aksi\nLingkungan', 
    className: 'aksi-lingkungan' 
  },
];

const ProgramCard = ({ icon, title, className }) => {
  return (
    <div className="program-card"> 
      <img className="vector-icon" src={icon} alt={`${title} Icon`} /> 
      
      <div className={className}> 
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function Home() {
  return (
    <div className="home-content"> 
      
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="main-headline">
            Bersama Kita
            <br />
            Mewujudkan
            <br />
            Perubahan Nyata
          </h1>
          <p className="sub-headline">
            Bergabunglah dengan kami untuk menghasilkan dampak positif bagi masyarakat dan lingkungan
          </p>

          <Link to="/aktivitas" className="register-button-link">
            <div className="register-button">
              Gabung Sekarang
            </div>
          </Link>
          
        </div>

        <img 
          className="image-4" 
          src={VolunteerImage}
          alt="volunteer1" 
        />
      </section>

      <section className="program-section">
        <h2 className="tentang-program-kami">Tentang Program Kami</h2>
        <p className="program-description">
          Kami berkomitmen untuk menciptakan masyarakat yang lebih baik melalui program volunteer
        </p>
        
        <div className="program-cards-container">
          {programs.map((program, index) => (
            <ProgramCard 
              key={index} 
              icon={program.icon} 
              title={program.title} 
              className={program.className} 
            />
          ))}
        </div>
  
        <Link to="/volunteer-terealisasi" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="volunteer-count-box">Volunteer Terealisasi</div>
        </Link>
      
        <div className="testimoni-box"> 
            <p className="testimoni-text">
              “Bergabung dengan SatuAksi Indonesia adalah keputusan terbaik yang pernah saya buat. 
              Mengajar anak-anak di panti asuhan membawa kebahagiaan yang luar biasa bagi saya.”
            </p>
        </div>
      </section>

    </div>
  );
}

export default Home;