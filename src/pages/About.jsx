import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      {/* SECTION ATAS: Split 50/50 Gambar & Penjelasan */}
      <div className="about-top-grid">

        {/* SISI KIRI: Gambar Katalog Fashion Vertikal */}
        <div className="about-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            alt="STYLA Editorial Minimalist"
            className="about-image"
          />
        </div>

        {/* SISI KANAN: Tentang Toko */}
        <div className="about-text-wrapper">
          <span className="about-label">
            Our Story
          </span>

          {/* Judul Utama Menggunakan Font Serif Mewah STYLA */}
          <h1 className="about-title">About STYLA</h1>

          {/* Paragraf Narasi Bahasa Indonesia */}
          <div className="about-paragraphs">
            <p>
              STYLA merupakan label fashion modern bercorak minimalis yang menghadirkan perpaduan sempurna antara elegansi, kenyamanan, serta kebutuhan gaya hidup masa kini. Kami merancang setiap koleksi secara matang untuk menghasilkan pakaian premium yang esensial dan tahan lama.
            </p>
            <p>
              Kami percaya bahwa fashion bukan sekadar pakaian yang Anda kenakan, melainkan sebuah medium untuk mengekspresikan identitas, karakter, dan rasa percaya diri tertinggi Anda. STYLA hadir sebagai ruang kurasi untuk menemani setiap momen berharga di sepanjang perjalanan hidup Anda.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION BAWAH: Vision, Mission, Quality (Membentang di Bawah) */}
      <div className="about-bottom-section">
        <div className="about-cards-grid">

          {/* Kotak Vision */}
          <div className="about-card">
            <span className="about-card-label">01 / Value</span>
            <h2 className="about-card-title">Vision</h2>
            <p className="about-card-text">
              Kami percaya bahwa fashion bukan hanya tentang pakaian, tetapi juga tentang bagaimana seseorang mengekspresikan identitas dan kepercayaan dirinya. Menjadi brand fashion digital terpercaya di Indonesia.
            </p>
          </div>

          {/* Kotak Mission */}
          <div className="about-card">
            <span className="about-card-label">02 / Purpose</span>
            <h2 className="about-card-title">Mission</h2>
            <p className="about-card-text">
              Memberikan pengalaman belanja digital yang cepat, transparan, nyaman, serta selalu menyuguhkan kurasi pakaian yang stylish dan berestetika tinggi.
            </p>
          </div>

          {/* Kotak Quality */}
          <div className="about-card">
            <span className="about-card-label">03 / Standard</span>
            <h2 className="about-card-title">Quality</h2>
            <p className="about-card-text">
              Setiap lembar kain dipilih secara selektif melalui kontrol kualitas yang ketat untuk memastikan produk terbaik dengan penawaran harga yang tetap kompetitif.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
