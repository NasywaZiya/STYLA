import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./Sale.css";

function Sale({ onNavigate, onSelectProduct }) {
  const [saleProducts, setSaleProducts] = useState([]);
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();
  const [activeTab, setActiveTab] = useState("All Sale");
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState(5000000);
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/sale")
      .then((res) => {
        const mapped = res.data.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          originalPrice: Number(item.original_price),
          salePrice: Number(item.sale_price),
          discount: `-${Number(item.discount)}%`,
          discountValue: Number(item.discount),
          image: item.image,
          category: item.category,
          gender: item.gender === "women" ? "Women" : "Men",
          size: item.sizes || [],
          createdAt: item.created_at,
        }));
        setSaleProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch sale products:", err);
        setSaleProducts([]);
        setLoading(false);
      });
  }, []);

  const handleToggleFavorite = (id) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    toggleFavorite(id);
  };

  const tabs = [
    "All Sale",
    "Women",
    "Men",
    "Dresses",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
  ];

  let filteredProducts = saleProducts.filter((p) => {
    let matchTab = activeTab === "All Sale";
    if (!matchTab) {
      if (activeTab === "Women" || activeTab === "Men") {
        matchTab = p.gender === activeTab;
      } else {
        matchTab = p.category === activeTab;
      }
    }
    const matchPrice = p.salePrice <= priceRange;
    const matchSize = selectedSize === "" || p.size?.includes(selectedSize);
    return matchTab && matchPrice && matchSize;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "discount-high") return b.discountValue - a.discountValue;
    if (sortOption === "price-low") return a.salePrice - b.salePrice;
    if (sortOption === "price-high") return b.salePrice - a.salePrice;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="sale-page">
      <header className="sale-hero-banner">
        <div className="hero-text-left">
          <h1 className="hero-title">Sale</h1>
          <p className="hero-subtitle">
            Style favorit, harga spesial. Jangan sampai kehabisan!
          </p>
          <button onClick={() => onNavigate('collection')} className="shop-now-btn">SHOP NOW</button>
        </div>
        <div className="hero-graphic-right">
          {/* Gambar Latar Belakang */}
          <img
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
            alt="Heels Sale"
            className="banner-bg-image image-heels"
          />
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"
            alt="Jeans Sale"
            className="banner-bg-image image-jeans"
          />

          {/* Lingkaran Diskon (Sekarang berada di paling depan gambar jeans) */}
          <div className="discount-circle">
            <span className="up-to">UP TO</span>
            <span className="percentage">50%</span>
            <span className="off">OFF</span>
          </div>
        </div>
      </header>

      <main className="sale-main">
        <div className="breadcrumb">Home &gt; Sale</div>

        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <div className="filter-left">
            <button className="filter-toggle-btn">
              <span>═</span> Filter
            </button>
            <div className="size-filter-inline">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`size-pill ${selectedSize === size ? "active" : ""}`}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <span className="items-count">{filteredProducts.length} items</span>
          <div className="sort-select">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="discount-high">Discount: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="price-range-bar">
          <label>
            Harga Sale Maks:{" "}
            <strong>Rp {priceRange.toLocaleString("id-ID")}</strong>
          </label>
          <input
            type="range"
            min="50000"
            max="5000000"
            step="50000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="range-input"
          />
          <div className="range-labels">
            <span>Rp 50.000</span>
            <span>Rp 5.000.000</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="product-card-skeleton"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>Tidak ada produk sale yang sesuai filter.</p>
            <button
              onClick={() => {
                setSelectedSize("");
                setPriceRange(5000000);
                setActiveTab("All Sale");
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const isLiked = isFavorite(product.id);
              return (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => onSelectProduct(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="product-image-container">
                    <span className="discount-tag">{product.discount}</span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <button
                      className={`wishlist-btn ${isLiked ? "liked" : ""}`}
                      onClick={(e) => { e.stopPropagation(); handleToggleFavorite(product.id); }}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={18}
                        className="heart-icon"
                        fill={isLiked ? "#b52b27" : "none"}
                        color={isLiked ? "#b52b27" : "#1a1a1a"}
                      />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="price-group">
                      <span className="original-price">
                        Rp {product.originalPrice.toLocaleString("id-ID")}
                      </span>
                      <span className="sale-price">
                        Rp {product.salePrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>


    </div>
  );
}

export default Sale;
