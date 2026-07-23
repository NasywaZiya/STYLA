import React, { useState, useEffect, useMemo } from "react";
import { Heart, Search } from "lucide-react";
import { getAllProducts } from "../api/products";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./Search.css";

const ProductSearch = ({ onNavigate, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        console.log("Products:", data);
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Compute dynamic filter options from fetched data
  const categories = useMemo(() => {
    const catSet = new Set(products.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(catSet)];
  }, [products]);

  // Combined Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search matching
      const matchesSearch =
        (product.product_name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Category matching
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    toggleFavorite(id);
  };

  const formatPrice = (price) => {
    return `IDR ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <div className="search-page">
      <div className="search-container">

        {/* Bagian Input Pencarian Utama */}
        <div className="search-input-wrapper">
          <label className="search-label">Product Search</label>

          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              placeholder="Cari produk (misal: Blazer, Dress)..."
            />
            <div className="search-icon-btn">
              <Search className="search-icon" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h2 className="search-results-heading">
          Showing results for {searchTerm ? `"${searchTerm}"` : "All Products"}
        </h2>
        <p className="search-results-count">
          {filteredProducts.length} items found
        </p>

        {/* Konten Utama */}
        <div className="search-layout">
          {/* Sidebar Filter */}
          <div className="search-sidebar">
            <h3 className="search-label">Filter</h3>

            <div className="mb-10" style={{ marginBottom: '2.5rem' }}>
              <h4 className="search-filter-title">Category</h4>
              <ul className="search-category-list">
                {categories.map(category => (
                  <li
                    key={category}
                    className={selectedCategory === category ? "active" : ""}
                    onClick={() => setSelectedCategory(category)}
                    style={{ cursor: 'pointer' }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid Katalog Produk */}
          <div className="search-grid-wrapper">
            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem 0", color: "#6b7280" }}>
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                <div className="search-grid">
                  {filteredProducts.map((product) => {
                    const isLiked = isFavorite(product.product_id);
                    return (
                      <div
                        key={product.product_id}
                        className="product-card"
                        onClick={() => onSelectProduct && onSelectProduct(product.product_id)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        <div className="product-image-wrapper" style={{ position: 'relative' }}>
                          {product.sale_price && (
                            <span className="category-discount-badge" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, backgroundColor: '#b52b27', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: 'bold' }}>
                              -{product.discount}%
                            </span>
                          )}
                          <img src={product.image} alt={product.product_name} />

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => handleToggleFavorite(product.product_id, e)}
                            style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10 }}
                            aria-label="Wishlist"
                          >
                            <Heart
                              size={18}
                              fill={isLiked ? "#b52b27" : "none"}
                              color={isLiked ? "#b52b27" : "#000"}
                            />
                          </button>
                        </div>

                        <span className="search-label" style={{ display: 'block', marginTop: '12px', marginBottom: '4px', textTransform: 'capitalize' }}>
                          {product.gender} Collection
                        </span>

                        <h3 className="product-title" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                          {product.product_name}
                        </h3>

                        {product.sale_price ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                              {formatPrice(product.price)}
                            </span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#b52b27' }}>
                              {formatPrice(product.sale_price)}
                            </span>
                          </div>
                        ) : (
                          <p className="product-price" style={{ fontSize: '14px', fontWeight: 600 }}>
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="no-results">
                    <p>Produk tidak ditemukan</p>
                    <span>Coba gunakan kata kunci pencarian atau filter lainnya.</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;