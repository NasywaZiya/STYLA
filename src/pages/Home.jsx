import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <section
      id="home-page"
      className="hero-section"
      style={{ display: "flex" }}
    >
      <img
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2070&q=80"
        className="hero-img"
        alt="Hero"
      />
      <div className="hero-content">
        <h1>STYLA MINIMALIST</h1>
        <p>Elegansi dalam kesederhanaan.</p>
      </div>
    </section>
  );
}
