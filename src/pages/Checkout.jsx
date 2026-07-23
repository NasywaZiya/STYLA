import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orders";
import { ShoppingBag } from "lucide-react";
import "./Checkout.css";

const provinces = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "DI Yogyakarta",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Sumatera Barat",
  "Sumatera Utara",
  "Sumatera Selatan",
  "Sumatera Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Timur",
  "Kalimantan Selatan",
  "Kalimantan Utara",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Utara",
];

const cities = {
  "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Cimahi"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang", "Klaten", "Purwokerto", "Cilacap"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo", "Gresik"],
  "DI Yogyakarta": ["Yogyakarta", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul"],
  Banten: ["Tangerang", "Serang", "Cilegon"],
  Bali: ["Denpasar", "Badung", "Gianyar"],
  "Nusa Tenggara Barat": ["Mataram", "Sumbawa Besar", "Bima"],
  "Nusa Tenggara Timur": ["Kupang", "Flores", "Sumba"],
  "Sumatera Barat": ["Padang", "Bukittinggi", "Solok"],
  "Sumatera Utara": ["Medan", "Binjai", "Pematang Siantar"],
  "Sumatera Selatan": ["Palembang", "Baturaja", "Prabumulih"],
  "Sumatera Timur": ["Pekanbaru", "Dumai", "Siak"],
  "Kalimantan Barat": ["Pontianak", "Singkawang", "Kuburaya"],
  "Kalimantan Tengah": ["Palangkaraya", "Banjarbaru", "Kotawaringin Barat"],
  "Kalimantan Timur": ["Samarinda", "Balikpapan", "Bontang"],
  "Kalimantan Selatan": ["Banjarmasin", "Banjarbaru", "Tabalong"],
  "Kalimantan Utara": ["Tarakan", "Nunukan", "Malinau"],
  "Sulawesi Barat": ["Mamuju", "Polewali Mandar", "Majene"],
  "Sulawesi Selatan": ["Makassar", "Parepare", "Maros"],
  "Sulawesi Tengah": ["Palu", "Donggala", "Poso"],
  "Sulawesi Tenggara": ["Kendari", "Bau-Bau", "Kolaka"],
  "Sulawesi Utara": ["Manado", "Tomohon", "Bitung"],
  "Gorontalo": ["Gorontalo", "Marisa", "Tilamuta"],
};

const steps = ["Pengiriman", "Pembayaran", "Review", "Selesai"];

function Checkout({ onNavigate }) {
  const { cartData, loading: cartLoading, fetchCart } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    kodePos: "",
    simpanAlamat: true,
  });
  const [pengiriman, setPengiriman] = useState("regular");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank BCA");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nama: user.name || prev.nama,
        telepon: user.phone || prev.telepon,
        alamat: user.address || prev.alamat,
      }));
    }
  }, [user]);

  const cartItems = cartData.items || [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.effective_price * item.quantity,
    0,
  );
  const totalDiscount = cartItems.reduce((acc, item) => {
    if (item.sale_price) {
      return acc + (item.price - item.sale_price) * item.quantity;
    }
    return acc;
  }, 0);
  const ongkir = pengiriman === "regular" ? 15000 : 25000;
  const total = subtotal + ongkir - totalDiscount;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProvinsiChange = (e) => {
    const selectedProv = e.target.value;
    setForm((prev) => ({
      ...prev,
      provinsi: selectedProv,
      kota: cities[selectedProv][0],
    }));
    if (errors.provinsi) {
      setErrors((prev) => ({ ...prev, provinsi: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (!form.telepon.trim()) newErrors.telepon = "Nomor telepon wajib diisi";
    if (!form.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    if (!form.provinsi) newErrors.provinsi = "Provinsi wajib dipilih";
    if (!form.kota) newErrors.kota = "Kota wajib dipilih";
    if (!form.kodePos.trim()) newErrors.kodePos = "Kode pos wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!paymentMethod) newErrors.paymentMethod = "Pilih metode pembayaran";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoToStep2 = () => {
    if (validateStep1()) setCurrentStep(2);
  };

  const handleGoToStep3 = () => {
    if (validateStep2()) setCurrentStep(3);
  };

  const handleConfirm = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await createOrder({
        shippingAddress: `${form.alamat}, ${form.kota}, ${form.provinsi} ${form.kodePos}`,
        paymentMethod,
        shippingOption: pengiriman,
      });
      setOrderResult(result);
      await fetchCart();
      setCurrentStep(4);
    } catch (error) {
      console.error("Error creating order:", error);
      const message = error.response?.data?.message || "Gagal membuat pesanan. Coba lagi.";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      nama: user?.name || "",
      telepon: user?.phone || "",
      alamat: user?.address || "",
      provinsi: "DKI Jakarta",
      kota: "Jakarta Selatan",
      kodePos: "",
      simpanAlamat: true,
    });
    setPengiriman("regular");
    setPaymentMethod("Transfer Bank BCA");
    setCurrentStep(1);
    setErrors({});
    setOrderResult(null);
    onNavigate && onNavigate("home");
  };

  const renderItemRow = (item) => (
    <div key={item.cart_item_id} className="checkout-item-row">
      <img
        className="checkout-item-thumb"
        src={item.image}
        alt={item.product_name}
      />
      <div className="checkout-item-meta">
        <p className="checkout-item-title">{item.product_name}</p>
        <p className="checkout-item-subtext">
          {item.size}, {item.color} • Qty: {item.quantity}
        </p>
      </div>
      <p className="checkout-item-pricing">
        Rp {(item.effective_price * item.quantity).toLocaleString("id-ID")}
      </p>
    </div>
  );

  const renderBreakdown = () => (
    <div className="checkout-breakdown-panel">
      <div className="breakdown-row">
        <span>Subtotal</span>
        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
      </div>
      <div className="breakdown-row">
        <span>Ongkos Kirim</span>
        <span>Rp {ongkir.toLocaleString("id-ID")}</span>
      </div>
      {totalDiscount > 0 && (
        <div className="breakdown-row discount-text">
          <span>Diskon</span>
          <span>- Rp {totalDiscount.toLocaleString("id-ID")}</span>
        </div>
      )}
      <div className="breakdown-row grand-total-text">
        <span>Total Pembayaran</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );

  // Empty cart state
  if (!cartLoading && cartItems.length === 0 && currentStep !== 4) {
    return (
      <div className="checkout-page-container">
        <div className="checkout-content-wrapper">
          <div className="checkout-page-heading-area">
            <h1 className="checkout-main-title">Checkout</h1>
          </div>
          <div className="checkout-empty-state">
            <ShoppingBag size={64} className="checkout-empty-icon" />
            <h2 className="checkout-empty-title">Keranjang Anda Kosong</h2>
            <p className="checkout-empty-text">
              Tambahkan produk ke keranjang sebelum melanjutkan ke checkout.
            </p>
            <button
              className="primary-action-button"
              onClick={() => onNavigate && onNavigate("women")}
            >
              Mulai Belanja
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-content-wrapper">
        {/* JUDUL HALAMAN */}
        <div className="checkout-page-heading-area">
          <h1 className="checkout-main-title">Checkout</h1>
          <p className="checkout-sub-step-label">Langkah {currentStep} dari 4</p>
        </div>

        {/* STEPPER */}
        <div className="checkout-progress-stepper">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`stepper-node-item ${currentStep === i + 1 ? "step-active" : currentStep > i + 1 ? "step-completed" : ""}`}
            >
              <div className="stepper-circle-housing">
                <div className="stepper-status-ball">
                  {currentStep > i + 1 ? "✓" : i + 1}
                </div>
                {i < steps.length - 1 && <div className="stepper-connecting-line" />}
              </div>
              <span className="stepper-text-label">{step}</span>
            </div>
          ))}
        </div>

        {/* BODY UTAMA: 2 KOLOM */}
        <div className="checkout-dual-grid">
          {/* KOLOM KIRI */}
          <div className="checkout-left-form-column">

            {/* LANGKAH 1 */}
            {currentStep === 1 && (
              <div className="step-panel-view fade-in-animation">
                <h2 className="section-block-title">1. Informasi Pengiriman</h2>
                <div className="premium-content-card">
                  <div className="input-field-group">
                    <label>Nama Lengkap</label>
                    <input type="text" name="nama" placeholder="Masukkan nama penerima" value={form.nama} onChange={handleChange} />
                    {errors.nama && <span className="field-error-text">{errors.nama}</span>}
                  </div>
                  <div className="input-field-group">
                    <label>Nomor Telepon</label>
                    <input type="tel" name="telepon" placeholder="Contoh: 08123456789" value={form.telepon} onChange={handleChange} />
                    {errors.telepon && <span className="field-error-text">{errors.telepon}</span>}
                  </div>
                  <div className="input-field-group">
                    <label>Alamat Lengkap</label>
                    <textarea name="alamat" placeholder="Nama jalan, nomor rumah, RT/RW" value={form.alamat} onChange={handleChange} rows={3} />
                    {errors.alamat && <span className="field-error-text">{errors.alamat}</span>}
                  </div>
                  <div className="input-field-group dual-input-row">
                    <div>
                      <label>Provinsi</label>
                      <select name="provinsi" value={form.provinsi} onChange={handleProvinsiChange}>
                        {provinces.map((p) => (<option key={p}>{p}</option>))}
                      </select>
                    </div>
                    <div>
                      <label>Kota / Kabupaten</label>
                      <select name="kota" value={form.kota} onChange={handleChange}>
                        {(cities[form.provinsi] || []).map((c) => (<option key={c}>{c}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="input-field-group">
                    <label>Kode Pos</label>
                    <input type="text" name="kodePos" value={form.kodePos} onChange={handleChange} />
                    {errors.kodePos && <span className="field-error-text">{errors.kodePos}</span>}
                  </div>
                  <label className="premium-checkbox-container">
                    <input type="checkbox" name="simpanAlamat" checked={form.simpanAlamat} onChange={handleChange} />
                    <span>Simpan alamat ini ke akun saya</span>
                  </label>
                </div>

                <h2 className="section-block-title">2. Metode Pengiriman</h2>
                <div className="courier-selection-stack">
                  <label className={`courier-option-box ${pengiriman === "regular" ? "selected" : ""}`}>
                    <input type="radio" name="pengiriman" value="regular" checked={pengiriman === "regular"} onChange={() => setPengiriman("regular")} />
                    <div className="courier-details">
                      <span className="courier-emoji">🚚</span>
                      <div>
                        <p className="courier-title-text">Reguler (2–4 hari kerja)</p>
                        <p className="courier-delivery-est">Estimasi tiba sesuai jadwal normal</p>
                      </div>
                    </div>
                    <span className="courier-rate-tag">Rp 15.000</span>
                  </label>

                  <label className={`courier-option-box ${pengiriman === "express" ? "selected" : ""}`}>
                    <input type="radio" name="pengiriman" value="express" checked={pengiriman === "express"} onChange={() => setPengiriman("express")} />
                    <div className="courier-details">
                      <span className="courier-emoji">⚡</span>
                      <div>
                        <p className="courier-title-text">Express (1–2 hari kerja)</p>
                        <p className="courier-delivery-est">Estimasi tiba lebih cepat kilat</p>
                      </div>
                    </div>
                    <span className="courier-rate-tag">Rp 25.000</span>
                  </label>
                </div>

                <div className="mobile-only-summary-box">
                  {cartItems.map(renderItemRow)}
                  {renderBreakdown()}
                </div>

                <button className="primary-action-button" onClick={handleGoToStep2} disabled={cartItems.length === 0}>
                  Lanjut ke Pembayaran →
                </button>
              </div>
            )}

            {/* LANGKAH 2 */}
            {currentStep === 2 && (
              <div className="step-panel-view fade-in-animation">
                <h2 className="section-block-title">Pilih Metode Pembayaran</h2>
                <div className="premium-content-card payment-selection-grid">
                  {["Transfer Bank BCA", "Transfer Bank Mandiri", "GoPay", "OVO", "Dana", "Kartu Kredit"].map((m) => (
                    <label key={m} className={`payment-method-tile ${paymentMethod === m ? "tile-active" : ""}`}>
                      <input type="radio" name="payment" checked={paymentMethod === m} onChange={() => setPaymentMethod(m)} />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <span className="field-error-text">{errors.paymentMethod}</span>}
                <div className="navigation-buttons-flex">
                  <button className="secondary-nav-btn" onClick={() => setCurrentStep(1)}>Kembali</button>
                  <button className="primary-nav-btn" onClick={handleGoToStep3}>Review Pesanan</button>
                </div>
              </div>
            )}

            {/* LANGKAH 3 */}
            {currentStep === 3 && (
              <div className="step-panel-view fade-in-animation">
                <h2 className="section-block-title">Review Pesanan Anda</h2>
                <div className="premium-content-card review-invoice-card">
                  <div className="invoice-data-row">
                    <strong>Nama Penerima:</strong>
                    <span>{form.nama || "-"}</span>
                  </div>
                  <div className="invoice-data-row">
                    <strong>Kontak Telepon:</strong>
                    <span>{form.telepon || "-"}</span>
                  </div>
                  <div className="invoice-data-row">
                    <strong>Alamat Kirim:</strong>
                    <span>{form.alamat || "-"}, {form.kota}, {form.provinsi}</span>
                  </div>
                  <div className="invoice-data-row">
                    <strong>Opsi Kurir:</strong>
                    <span>{pengiriman === "regular" ? "Reguler" : "Express"}</span>
                  </div>
                  <div className="invoice-data-row">
                    <strong>Metode Bayar:</strong>
                    <span>{paymentMethod}</span>
                  </div>
                </div>
                <div className="navigation-buttons-flex">
                  <button className="secondary-nav-btn" onClick={() => setCurrentStep(2)}>Kembali</button>
                  <button className="primary-nav-btn success-color" onClick={handleConfirm} disabled={submitting}>
                    {submitting ? "Memproses..." : "Konfirmasi & Bayar ✓"}
                  </button>
                </div>
              </div>
            )}

            {/* LANGKAH 4 */}
            {currentStep === 4 && (
              <div className="step-panel-view success-center-panel fade-in-animation">
                <div className="success-badge-circle">✓</div>
                <h2 className="success-title">Pesanan Berhasil Disimpan!</h2>

                {orderResult && (
                  <div className="order-result-card">
                    <div className="order-result-row">
                      <strong>Nomor Order:</strong>
                      <span className="order-number-value">{orderResult.order_number}</span>
                    </div>
                    <div className="order-result-row">
                      <strong>Tanggal Order:</strong>
                      <span>{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="order-result-row">
                      <strong>Status Pembayaran:</strong>
                      <span className="order-status-value">
                        {orderResult.status === "pending" ? "Menunggu Pembayaran" : "Lunas"}
                      </span>
                    </div>
                    <div className="order-result-divider"></div>
                    <div className="order-result-row order-total-row">
                      <strong>Total Bayar:</strong>
                      <span className="order-total-value">Rp {orderResult.total_price?.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                )}

                <p className="success-note">
                  Gunakan Nomor Order Anda untuk melacak status pengiriman pesanan.
                </p>

                <div className="success-action-group">
                  <button
                    className="success-btn-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(orderResult?.order_number || "");
                      alert("Nomor Order disalin ke clipboard!");
                    }}
                  >
                    Copy Order Number
                  </button>
                  <button
                    className="success-btn-track"
                    onClick={() => {
                      window.location.href = `/track?order_number=${orderResult?.order_number || ""}`;
                    }}
                  >
                    Track Order
                  </button>
                  <button className="success-btn-back" onClick={handleReset}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* KOLOM KANAN: SIDEBAR (DESKTOP) */}
          {currentStep !== 4 && (
            <div className="checkout-right-sidebar-column">
              <div className="desktop-sticky-summary-card">
                <h3 className="sidebar-summary-title">Ringkasan Pesanan</h3>
                <div className="sidebar-items-scroller">
                  {cartLoading ? (
                    <p className="sidebar-loading-text">Memuat keranjang...</p>
                  ) : (
                    cartItems.map(renderItemRow)
                  )}
                </div>
                {renderBreakdown()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;