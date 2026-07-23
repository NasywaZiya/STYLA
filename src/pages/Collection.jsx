import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./Collection.css";

function Collection({ onNavigate, onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState(5000000);
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        const mapped = res.data.map(item => ({
          id: item.product_id,
          name: item.product_name,

          price: Number(item.price),
          salePrice: Number(item.sale_price) || Number(item.price),
          discount: Number(item.discount) || 0,

          image: item.image,

          category: item.category,

          gender:
            item.gender === "women"
              ? "Women"
              : "Men",

          size: Array.isArray(item.sizes)
            ? item.sizes
            : item.sizes
              ? item.sizes.split(",")
              : [],

          createdAt: item.created_at,

          tag:
            new Date(item.created_at) >
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ? "NEW"
              : ""
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products for collection:", err);
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
    "All",
    "New In",
    "Women",
    "Men",
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Accessories",
  ];

  let filteredProducts = products.filter((p) => {
    let matchTab = activeTab === "All";

    if (!matchTab) {

      if (activeTab === "New In") {

        matchTab = p.tag === "NEW";

      } else if (
        activeTab === "Women" ||
        activeTab === "Men"
      ) {

        matchTab = p.gender === activeTab;

      } else {

        matchTab = p.category === activeTab;

      }

    }
    const currentPrice =
      p.discount > 0
        ? p.salePrice
        : p.price;

    const matchPrice = currentPrice <= priceRange;
    const matchSize = selectedSize === "" || p.size?.includes(selectedSize);
    return matchTab && matchPrice && matchSize;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {

    const priceA =
      a.discount > 0
        ? a.salePrice
        : a.price;

    const priceB =
      b.discount > 0
        ? b.salePrice
        : b.price;

    if (sortOption === "price-low")
      return priceA - priceB;

    if (sortOption === "price-high")
      return priceB - priceA;

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="collection-page">
      <header className="collection-hero-banner">
        <div className="hero-text-left">
          <h1 className="hero-title">Collection</h1>
          <p className="hero-subtitle">
            Temukan koleksi terbaru kami yang dirancang untuk menemani setiap
            momenmu.
          </p>
        </div>
        <div className="hero-graphic-right">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
            alt="Collection Model"
            className="banner-bg-model"
          />
        </div>
      </header>

      <main className="collection-main">
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
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="price-range-bar">
          <label>
            Harga Maks: <strong>Rp{priceRange.toLocaleString("id-ID")}</strong>
          </label>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="50000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="range-input"
          />
          <div className="range-labels">
            <span>Rp100.000</span>
            <span>Rp5.000.000</span>
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
            <p>Tidak ada produk yang sesuai filter.</p>
            <button
              onClick={() => {
                setSelectedSize("");
                setPriceRange(5000000);
                setActiveTab("All");
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
                <div key={product.id} className="product-card"
                  onClick={() => onSelectProduct(product.id)}
                  style={{ cursor: 'pointer' }}>
                  <div className="product-image-container">
                    {product.tag && (
                      <span className="new-tag">{product.tag}</span>
                    )}
                    {product.discount > 0 && (
                      <span className="discount-tag" style={{ top: product.tag ? '42px' : '12px' }}>
                        -{product.discount}%
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <button
                      className={`wishlist-btn ${isLiked ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(product.id);
                      }}
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

                      {product.discount > 0 ? (
                        <>
                          <span className="original-price">
                            Rp {product.price.toLocaleString("id-ID")}
                          </span>

                          <span className="sale-price">
                            Rp {product.salePrice.toLocaleString("id-ID")}
                          </span>
                        </>
                      ) : (
                        <span className="product-price">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      )}

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

export default Collection;
