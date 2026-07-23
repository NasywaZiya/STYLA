import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Footer } from "./components/Footer";

import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Favorite from "./pages/Favorite";
import Profile from "./pages/Profile";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Category from "./pages/Category";
import MenCategory from "./pages/MenCategory";
import Collection from "./pages/Collection";
import Sale from "./pages/Sale";
import Track from "./pages/Track";
import { DetailProduct } from "./pages/DetailProduct";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [page, setPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { isLoggedIn, openLogin, isLoginOpen, closeLogin, redirectPage, setRedirectPage } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page, selectedProductId]);

  // Navigate to redirect page after successful login
  useEffect(() => {
    if (isLoggedIn && redirectPage) {
      setPage(redirectPage);
      setRedirectPage(null);
    }
  }, [isLoggedIn, redirectPage, setRedirectPage]);

  // SIDEBAR
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setPage("detailProduct");
  };

  // Safe navigation that protects specific pages
  const handleNavigatePage = (targetPage) => {
    const protectedPages = ["profile", "track", "checkout"];
    if (protectedPages.includes(targetPage) && !isLoggedIn) {
      openLogin(targetPage);
    } else {
      setPage(targetPage);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNavigate={handleNavigatePage} />;

      case "women":
        return (
          <Category
            onNavigate={handleNavigatePage}
            onSelectProduct={navigateToProduct}
          />
        );

      case "men":
        return (
          <MenCategory
            onNavigate={handleNavigatePage}
            onSelectProduct={navigateToProduct}
          />
        );

      case "sale":
        return (
          <Sale
            onNavigate={setPage}
            onSelectProduct={navigateToProduct}
          />
        );

      case "collection":
        return (
          <Collection
            onNavigate={handleNavigatePage}
            onSelectProduct={navigateToProduct}
          />
        );

      case "about":
        return <About onNavigate={handleNavigatePage} />;

      case "favorite":
        return <Favorite onNavigate={handleNavigatePage} onSelectProduct={navigateToProduct} />;

      case "profile":
        return <Profile onNavigate={handleNavigatePage} />;

      case "faq":
        return <Faq onNavigate={handleNavigatePage} />;

      case "contact":
        return <Contact onNavigate={handleNavigatePage} />;

      case "search":
        return (
          <Search
            onNavigate={handleNavigatePage}
            onSelectProduct={navigateToProduct}
          />
        );

      case "cart":
        return <Cart onNavigate={handleNavigatePage} />;

      case "checkout":
        return <Checkout onNavigate={handleNavigatePage} />;

      case "track":
        return <Track onNavigate={handleNavigatePage} />;

      case "detailProduct":
        return (
          <DetailProduct
            onNavigate={handleNavigatePage}
            productId={selectedProductId}
            onSelectProduct={navigateToProduct}
          />
        );

      default:
        return <Home onNavigate={handleNavigatePage} />;
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onOpenLogin={openLogin}
        onShowPage={handleNavigatePage}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="pt-[70px] min-h-screen">
        <div className="flex">
          {/* SIDEBAR */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onShowPage={(selectedPage) => {
              handleNavigatePage(selectedPage);
              setIsSidebarOpen(false);
            }}
          />

          {/* DYNAMIC CONTENT */}
          <div className="flex-1">
            {renderPage()}
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />

      {/* FOOTER */}
      <Footer setCurrentPage={handleNavigatePage} />
    </div>
  );
};

export default App;