import React, { useState, useEffect } from "react";
import { MapPin, Phone, Briefcase, ShoppingBag, Award, Heart, ShieldCheck, CreditCard, Edit, Check, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, updateProfile } = useAuth();

  // Local edit states
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Sync state with active user on load or when user changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-restricted">
        <h2 className="profile-restricted-title">Akses Dibatasi</h2>
        <p className="profile-restricted-text">Silakan masuk ke akun Anda terlebih dahulu.</p>
      </div>
    );
  }

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    
    const res = await updateProfile({
      name,
      phone,
      address,
    });
    
    setSaving(false);
    
    if (res.success) {
      setEditMode(false);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleCancel = () => {
    setName(user.name || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
    setErrorMsg("");
    setEditMode(false);
  };

  return (
    <section className="profile-section">

      {/* Scenario Control Buttons */}
      <div className="profile-scenario-bar">
        <div>
          <h1 className="profile-page-title">Profil Pengguna</h1>
          <p className="profile-page-subtitle">Kelola informasi pribadi dan preferensi Anda.</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="profile-grid">

        {/* ==========================================
            CARD 1: AVATAR & MAIN STATS (LEFT)
            ========================================== */}
        <div className="profile-card profile-avatar-card">
          {/* Avatar frame */}
          <div className="profile-avatar-frame">
            <img
              src={user.avatar}
              alt={user.name}
              className="profile-avatar-img"
            />
          </div>

          {/* Name & Email */}
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>

          {/* Role Badge */}
          <div className="profile-role-badge">
            <Briefcase className="profile-role-icon" />
            <span className="profile-role-text">{user.role || "Member"}</span>
          </div>

          {/* Profile Stats */}
          <div className="profile-stats">
            <div className="profile-stat-item">
              <div className="profile-stat-icon-wrapper"><ShoppingBag className="profile-stat-icon" /></div>
              <span className="profile-stat-value">{(user.stats?.orders !== undefined) ? user.stats.orders : 0}</span>
              <span className="profile-stat-label">Orders</span>
            </div>
            <div className="profile-stat-item profile-stat-item-bordered">
              <div className="profile-stat-icon-wrapper"><Award className="profile-stat-icon" /></div>
              <span className="profile-stat-value">{(user.stats?.points !== undefined) ? user.stats.points : 0}</span>
              <span className="profile-stat-label">Points</span>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-icon-wrapper"><Heart className="profile-stat-icon" /></div>
              <span className="profile-stat-value">{(user.stats?.wishlist !== undefined) ? user.stats.wishlist : 0}</span>
              <span className="profile-stat-label">Saved</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (CARD 2 & CARD 3) */}
        <div className="profile-right-column">

          {/* ==========================================
              CARD 2: ACCOUNT INFO & ADDRESS FORM
              ========================================== */}
          <div className="profile-card profile-info-card">
            <div className="profile-info-edit-wrapper">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="profile-edit-btn"
                >
                  <Edit size={14} />
                  Edit Profil
                </button>
              ) : (
                <div className="profile-edit-actions">
                  <button
                    onClick={handleSave}
                    className="profile-save-btn"
                    disabled={saving}
                  >
                    <Check size={14} />
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="profile-cancel-btn"
                    disabled={saving}
                  >
                    <X size={14} />
                    Batal
                  </button>
                </div>
              )}
            </div>

            <span className="profile-card-label">Personal Info</span>
            <h3 className="profile-card-title">Informasi Akun</h3>

            {editMode ? (
              <form onSubmit={handleSave} className="profile-form">
                {errorMsg && (
                  <div className="profile-error-msg" style={{ color: "red", fontSize: "0.875rem", marginBottom: "1rem" }}>
                    {errorMsg}
                  </div>
                )}
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label className="profile-form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="profile-form-input"
                      required
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Nomor Telepon</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="profile-form-input"
                      placeholder="Contoh: 081234567890"
                    />
                  </div>
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">Alamat Lengkap</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    className="profile-form-textarea"
                    placeholder="Masukkan alamat pengiriman utama Anda"
                  />
                </div>
              </form>
            ) : (
              <div className="profile-info-grid">
                {/* Address Box */}
                <div className="profile-info-box">
                  <MapPin className="profile-info-icon" />
                  <div>
                    <h4 className="profile-info-box-label">Alamat Utama</h4>
                    <p className="profile-info-box-text">
                      {user.address || "Alamat belum dilengkapi."}
                    </p>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="profile-info-box profile-info-box-phone">
                  <Phone className="profile-info-icon" />
                  <div>
                    <h4 className="profile-info-box-label">Nomor Telepon</h4>
                    <p className="profile-info-box-phone-text">
                      {user.phone || "Belum diisi"}
                    </p>
                    {user.phone && (
                      <span className="profile-verified-badge">
                        Terverifikasi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ==========================================
              CARD 3: SECURITY & PREFERENCES
              ========================================== */}
          <div className="profile-card profile-security-card">
            <span className="profile-card-label">Preferences</span>
            <h3 className="profile-card-title profile-card-title-sm">Keamanan & Pembayaran</h3>

            <div className="profile-security-grid">
              {/* Payment Methods */}
              <div className="profile-security-item">
                <div className="profile-security-item-left">
                  <div className="profile-security-icon-wrapper">
                    <CreditCard className="profile-security-icon" />
                  </div>
                  <div>
                    <h4 className="profile-security-item-title">Metode Pembayaran</h4>
                    <p className="profile-security-item-text">E-Wallet & 1 Kartu Tersimpan</p>
                  </div>
                </div>
                <span className="profile-security-arrow">→</span>
              </div>

              {/* Account Security */}
              <div className="profile-security-item">
                <div className="profile-security-item-left">
                  <div className="profile-security-icon-wrapper">
                    <ShieldCheck className="profile-security-icon" />
                  </div>
                  <div>
                    <h4 className="profile-security-item-title">Keamanan Akun</h4>
                    <p className="profile-security-item-text">Kata Sandi Terlindungi</p>
                  </div>
                </div>
                <span className="profile-security-arrow">→</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;
