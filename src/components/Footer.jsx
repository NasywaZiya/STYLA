import React from "react";
import "./Footer.css";

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="footer">
      {/* CONTAINER */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* BRAND */}
          <div className="footer-brand">
            <h3 className="footer-logo">STYLA</h3>

            <p className="footer-tagline">
              Fashion timeless dengan sentuhan modern minimalist untuk gaya
              hidup yang elegan dan effortless.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="footer-column">
            <h4 className="footer-heading">Navigasi</h4>

            <div className="footer-links">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("home");
                }}
                className="footer-link"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("about");
                }}
                className="footer-link"
              >
                Tentang Kami
              </a>

              <a
                href="#collection"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("collection");
                }}
                className="footer-link"
              >
                Collection
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="footer-column">
            <h4 className="footer-heading">Layanan</h4>

            <div className="footer-links">
              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("faq");
                }}
                className="footer-link"
              >
                Bantuan
              </a>

              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                Kebijakan Privasi
              </a>

              <a
                href="#shipping"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                Shipping Info
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 STYLA Minimalist Fashion. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;