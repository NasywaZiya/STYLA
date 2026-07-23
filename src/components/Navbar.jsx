import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  LogOut,
  Package,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export const Navbar = ({ onShowPage, onToggleSidebar }) => {
  const { isLoggedIn, user, logout, openLogin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setDropdownOpen(!dropdownOpen);
    } else {
      openLogin("profile");
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* LEFT GROUP: Hamburger & Logo */}
        <div className="navbar-left-group">
          {/* SIDEBAR BUTTON (HAMBURGER CUSTOM THIN LINES) */}
          <button onClick={onToggleSidebar} className="navbar-hamburger-btn">
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
          </button>

          {/* LOGO */}
          <h1 onClick={() => onShowPage("home")} className="navbar-logo">
            STYLA
          </h1>
        </div>

        {/* CENTER MENU (TEXT RENGGANG MINIMALIS) */}
        <nav className="navbar-center-menu">
          <button
            onClick={() => onShowPage("home")}
            className="navbar-menu-item"
          >
            Home
          </button>

          <button
            onClick={() => onShowPage("women")}
            className="navbar-menu-item"
          >
            Women
          </button>

          <button
            onClick={() => onShowPage("men")}
            className="navbar-menu-item"
          >
            Men
          </button>

          <button
            onClick={() => onShowPage("collection")}
            className="navbar-menu-item"
          >
            Collection
          </button>

          <button
            onClick={() => onShowPage("sale")}
            className="navbar-menu-item navbar-menu-item-sale"
          >
            Sale
          </button>
        </nav>

        {/* RIGHT GROUP: Ikon ultra-thin, Tombol Dinamis, & Profil */}
        <div className="navbar-right-group">
          {/* ICONS WITH STROKEWIDTH = 1 */}
          <div className="navbar-icons">
            <button
              onClick={() => onShowPage("search")}
              className="navbar-icon-btn"
            >
              <Search className="navbar-icon" strokeWidth={1} />
            </button>

            <button
              onClick={() => onShowPage("favorite")}
              className="navbar-icon-btn"
            >
              <Heart className="navbar-icon" strokeWidth={1} />
            </button>

            <button
              onClick={() => onShowPage("cart")}
              className="navbar-icon-btn"
            >
              <ShoppingBag className="navbar-icon" strokeWidth={1} />
            </button>
          </div>

          {/* DYNAMIC BUTTON BASED ON LOGIN STATE */}
          {isLoggedIn ? (
            <button
              onClick={() => onShowPage("track")}
              className="navbar-action-btn"
            >
              Lacak Paket
            </button>
          ) : (
            <button onClick={() => openLogin()} className="navbar-action-btn">
              Login
            </button>
          )}

          {/* PROFILE CIRCLE WITH DROPDOWN */}
          <div className="navbar-profile-wrapper" ref={dropdownRef}>
            <button onClick={handleProfileClick} className="navbar-profile-btn">
              {isLoggedIn && user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="navbar-profile-avatar"
                />
              ) : (
                <User size={18} strokeWidth={1} />
              )}
            </button>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <p className="navbar-dropdown-greeting">Halo,</p>
                  <p className="navbar-dropdown-username">{user?.name}</p>
                </div>
                <button
                  onClick={() => {
                    onShowPage("profile");
                    setDropdownOpen(false);
                  }}
                  className="navbar-dropdown-item"
                >
                  <User size={14} className="navbar-dropdown-icon" />
                  Profil Saya
                </button>
                <button
                  onClick={() => {
                    onShowPage("track");
                    setDropdownOpen(false);
                  }}
                  className="navbar-dropdown-item"
                >
                  <Package size={14} className="navbar-dropdown-icon" />
                  Lacak Paket
                </button>
                <div className="navbar-dropdown-divider"></div>
                <button
                  onClick={() => {
                    logout();
                    onShowPage("home");
                    setDropdownOpen(false);
                  }}
                  className="navbar-dropdown-item navbar-dropdown-item-danger"
                >
                  <LogOut size={14} className="navbar-dropdown-icon" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};