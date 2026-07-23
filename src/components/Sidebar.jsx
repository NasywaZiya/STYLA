import React from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose, onShowPage }) => {
  const { isLoggedIn, logout, openLogin } = useAuth();

  const handlePage = (page) => {
    onShowPage(page);

    // otomatis tutup sidebar setelah klik menu
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed top-0 left-0
    h-screen w-[300px]
    bg-white
    shadow-2xl
    z-50
    transition-transform duration-300 ease-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between h-20 px-8 border-b border-gray-100">
          <h2 style={{ marginLeft: "12px" }} className="text-[20px] font-semibold uppercase tracking-[4px]">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto py-8 px-6">

          <nav className="flex flex-col gap-1">

            <button
              onClick={() => handlePage("home")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Home
            </button>

            <button
              onClick={() => handlePage("women")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Women
            </button>

            <button
              onClick={() => handlePage("men")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Men
            </button>

            <button
              onClick={() => handlePage("collection")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Collection
            </button>

            <button
              onClick={() => handlePage("sale")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-red-500 hover:bg-red-50 hover:text-red-600 transition"
            >
              Sale
            </button>

            <div className="my-5 border-t border-gray-100"></div>

            <button
              onClick={() => handlePage("favorite")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Favorite
            </button>

            <button
              onClick={() => handlePage("profile")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Profile
            </button>

            {isLoggedIn && (
              <button
                onClick={() => handlePage("track")}
                style={{ paddingLeft: "20px" }}
                className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
              >
                Lacak Paket
              </button>
            )}

            <button
              onClick={() => handlePage("contact")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              Contact
            </button>

            <button
              onClick={() => handlePage("faq")}
              style={{ paddingLeft: "20px" }}
              className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              FAQ
            </button>

            <div className="my-5 border-t border-gray-100"></div>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  handlePage("home");
                }}
                style={{ paddingLeft: "20px" }}
                className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  openLogin();
                }}
                style={{ paddingLeft: "20px" }}
                className="w-full h-11 px-4 rounded-lg text-left text-[14px] uppercase tracking-[2px] font-semibold text-black hover:bg-gray-50 transition"
              >
                Login
              </button>
            )}

          </nav>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;