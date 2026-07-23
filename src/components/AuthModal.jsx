import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function AuthModal({
  isOpen,
  onClose,
}) {
  const { login, register } = useAuth();
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    onClose();
  };

  const closeOutside = (e) => {
    if (e.target.id === "loginModal") {
      handleClose();
    }
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div
      id="loginModal"
      className="modal-overlay"
      onClick={closeOutside}
      style={{ display: "flex" }}
    >
      <div className="modal-card">
        <span className="close-modal" onClick={handleClose}>
          ✕
        </span>

        {error && (
          <div className="text-red-600 text-xs font-semibold mb-4 bg-red-50 p-3 rounded-lg border border-red-200 text-center">
            {error}
          </div>
        )}

        {authMode === "login" && (
          <div id="loginSection">
            <h2>Login</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                const res = await login(email, password);
                if (res.success) {
                  handleClose();
                } else {
                  setError(res.message);
                }
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot-pass-container">
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModeChange("forgot");
                  }}
                  className="forgot-pass-link"
                >
                  Lupa Password?
                </a>
              </div>
              <button type="submit" className="btn-auth">
                Login
              </button>
              <p className="switch-txt">
                Belum punya akun?{" "}
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModeChange("register");
                  }}
                >
                  Daftar
                </a>
              </p>
            </form>
          </div>
        )}

        {authMode === "register" && (
          <div id="registerSection">
            <h2>Registrasi</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                if (password.length < 6) {
                  setError("Password minimal 6 karakter!");
                  return;
                }
                const res = await register(name, email, password);
                if (res.success) {
                  alert("Registrasi Berhasil! Anda otomatis masuk.");
                  handleClose();
                } else {
                  setError(res.message);
                }
              }}
            >
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (min. 6 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn-auth mt-2">
                Daftar
              </button>
              <p className="switch-txt">
                Sudah punya akun?{" "}
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModeChange("login");
                  }}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        )}

        {authMode === "forgot" && (
          <div id="forgotPasswordSection">
            <h2>Reset Password</h2>
            <p className="forgot-desc">
              Masukkan email Anda untuk menerima tautan pemulihan kata sandi.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Tautan reset password telah dikirim ke: " + email);
                handleModeChange("login");
              }}
            >
              <input
                type="email"
                placeholder="Masukkan Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-auth">
                Kirim Tautan
              </button>
              <p className="switch-txt">
                Kembali ke{" "}
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModeChange("login");
                  }}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
