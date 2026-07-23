import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 bg-white text-gray-900 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">

        {/* Sisi Kiri: Detail Informasi */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-2">Customer Service</span>
            {/* Judul Font Serif Besar */}
            <h1 className="text-5xl font-serif tracking-normal mb-4 text-gray-900">Contact Us</h1>
            <p className="text-sm text-gray-500 tracking-wide mb-16 leading-relaxed">Kami siap membantu menjawab pertanyaan Anda seputar koleksi STYLA.</p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <span className="text-xl text-gray-400 mt-0.5">✉</span>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-lg font-medium text-gray-900">hello@styla.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-xl text-gray-400 mt-0.5">📞</span>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-lg font-medium text-gray-900">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-xl text-gray-400 mt-0.5">📍</span>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Showroom Address</h4>
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">Jl. Fashion No. 123, Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Footer */}
          <div className="flex gap-8 text-[11px] font-bold tracking-widest text-gray-400 uppercase pt-12 border-t border-gray-100">
            <span className="cursor-pointer hover:text-black transition-colors">Facebook</span>
            <span className="cursor-pointer hover:text-black transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-black transition-colors">Twitter</span>
          </div>
        </div>

        {/* Sisi Kanan: Formulir Input Minimalis Slim */}
        <div className="bg-white p-12 border rounded-2xl shadow-sm border-gray-100">
          <form className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
              <input type="text" className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input type="email" className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="Your email address" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
              <textarea rows="5" className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gray-400 resize-none transition-colors" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white text-xs font-medium uppercase tracking-widest py-3.5 rounded-md transition shadow-sm">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;