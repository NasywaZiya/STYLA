import React, { useState, useEffect } from "react";
// 4. DATA INTEGRATION: Mengimpor Axios untuk HTTP Request
import axios from "axios";

const FAQPage = () => {
  // State bawaan Anda untuk melacak akordeon aktif
  const [activeIndex, setActiveIndex] = useState(null);

  // State baru untuk menampung data FAQ yang diambil dari API luar
  const [faqData, setFaqData] = useState([]);

  // State untuk menangani efek visual pemuatan data (Loading State)
  const [isLoading, setIsLoading] = useState(true);

  // State untuk menangani skenario jika server API error
  const [isError, setIsError] = useState(false);

  // 3. REACT LOGIC: useEffect untuk memicu pengambilan data saat komponen dimuat
  useEffect(() => {
    // Simulasi penembakan endpoint API menggunakan Axios
    // Catatan: Ganti URL dengan endpoint API asli backend STYLA Anda nantinya
    axios
      .get("https://dummyjson.com/comments?limit=5") // Menggunakan API publik tiruan sebagai penampung sementara
      .then((response) => {
        // Pemetaan (Mapping) data dari API ke format objek { q, a } sesuai struktur komponen Anda
        const formattedData = response.data.comments.map((item, index) => {
          // Fallback data: jika API tiruan berhasil ditembus, kita ubah teksnya agar tetap bertema STYLA
          const staticQuestions = [
            "How do I place an order?",
            "How long does shipping take?",
            "Can I return or exchange items?",
            "How do I track my order?",
            "What payment methods are accepted?"
          ];
          const staticAnswers = [
            "Pilih produk STYLA pilihanmu, masukkan ke keranjang belanja, lakukan pengisian alamat, pilih kurir, dan selesaikan pembayaran.",
            "Pengiriman reguler memakan waktu 2-5 hari kerja tergantung pada lokasi kota tujuan pengiriman Anda.",
            "Ya, kami menerima penukaran barang maksimal 7 hari setelah barang diterima dengan syarat tag STYLA masih terpasang rapi.",
            "Anda dapat melacak pesanan melalui halaman 'Order Tracking' dengan memasukkan nomor invoice unik Anda.",
            "Kami menerima Transfer Bank otomatis, Kartu Kredit, serta E-Wallet favorit Anda (Gopay, OVO, ShopeePay)."
          ];

          return {
            q: staticQuestions[index] || `Pertanyaan Sistem #${item.id}`,
            a: staticAnswers[index] || item.body
          };
        });

        // Memasukkan data hasil kurasi Axios ke dalam State utama
        setFaqData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Gagal memuat data FAQ STYLA melalui Axios:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []); // Array kosong [] menjamin fungsi ini hanya berjalan 1 kali saat halaman dibuka

  return (
    <div className="max-w-6xl mx-auto px-8 py-24 bg-white text-gray-900 font-sans">
      {/* Judul FAQ menggunakan gaya Font Serif Persis Nama Produk */}
      <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block text-center mb-2">Help Center</span>
      <h1 className="text-4xl md:text-5xl font-serif tracking-normal text-center mb-20 text-gray-900">
        Frequently Asked Questions
      </h1>

      {/* 3. CONDITIONAL RENDERING: Menampilkan indikator loading saat Axios bekerja */}
      {isLoading && (
        <div className="text-center py-12 text-sm font-medium tracking-widest text-gray-400 uppercase animate-pulse">
          Memuat Pusat Bantuan STYLA...
        </div>
      )}

      {/* 3. CONDITIONAL RENDERING: Menampilkan pesan error jika request Axios gagal */}
      {isError && (
        <div className="text-center py-12 text-sm font-medium text-red-500 tracking-wide border border-dashed border-red-200 rounded-2xl">
          Gagal memuat pertanyaan. Silakan periksa koneksi internet Anda atau coba beberapa saat lagi.
        </div>
      )}

      {/* Pembatas Garis Tipis Sesuai Gambar 14 (Hanya dirender jika data berhasil dimuat) */}
      {!isLoading && !isError && (
        <div className="divide-y divide-gray-200 border-t border-b border-gray-100">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="py-6">
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group"
                >
                  {/* Teks Pertanyaan tipis berkelas */}
                  <span className="text-lg font-medium text-gray-800 group-hover:text-black transition-colors tracking-wide">
                    {item.q}
                  </span>
                  {/* Plus minus tipis */}
                  <span className="text-2xl font-light text-gray-300 ml-6 transition-colors group-hover:text-gray-600">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Teks Jawaban abu-abu tipis */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                  <p className="text-sm text-gray-500 leading-relaxed tracking-wide pl-1">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FAQPage;