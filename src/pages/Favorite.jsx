import React, { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { getFavorites as fetchFavorites } from "../api/favorites";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./Favorite.css";

const Favorite = ({ onNavigate, onSelectProduct }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, refreshFavorites } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();

  // Fetch favorites from backend
  const loadFavorites = async () => {
    if (!isLoggedIn) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchFavorites();
      setFavoriteProducts(data);
    } catch (error) {
      console.error("Gagal memuat produk favorit:", error);
      setFavoriteProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [isLoggedIn]);

  const removeFavorite = async (productId) => {
    try {
      await toggleFavorite(productId);
      // Remove from local list immediately
      setFavoriteProducts((prev) =>
        prev.filter((product) => product.product_id !== productId)
      );
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("Rp", "IDR ");
  };

  if (!isLoggedIn) {
    return (
      <div className="favorite-page">
        <div className="favorite-header">
          <div className="favorite-header-left">
            <Heart className="favorite-header-icon" />
            <h1 className="favorite-header-title">My Wishlist</h1>
          </div>
          <p className="favorite-header-count">0 Items Saved</p>
        </div>
        <div className="favorite-empty">
          <Heart className="favorite-empty-icon" />
          <p className="favorite-empty-title">Login untuk melihat wishlist</p>
          <p className="favorite-empty-text">
            Silakan login untuk menyimpan dan melihat fashion item favoritmu.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favorite-loading">
        Loading Fashion Wishlist...
      </div>
    );
  }

  return (
    <div className="favorite-page">
      {/* Header Wishlist */}
      <div className="favorite-header">
        <div className="favorite-header-left">
          <Heart className="favorite-header-icon" />
          <h1 className="favorite-header-title">My Wishlist</h1>
        </div>
        <p className="favorite-header-count">
          {favoriteProducts.length} Items Saved
        </p>
      </div>

      {/* Grid Katalog Produk Favorit Fashion */}
      {favoriteProducts.length > 0 ? (
        <div className="favorite-grid">
          {favoriteProducts.map((product) => (
            <div key={product.favorite_id} className="favorite-card">

              {/* Tombol Hapus / Remove */}
              <button
                onClick={() => removeFavorite(product.product_id)}
                className="favorite-remove-btn"
                title="Hapus dari favorit"
              >
                <Trash2 className="favorite-remove-icon" />
              </button>

              {/* Gambar dengan Rasio Vertikal Premium (3:4) */}
              <div
                className="favorite-image-wrapper"
                onClick={() => onSelectProduct && onSelectProduct(product.product_id)}
                style={{ cursor: onSelectProduct ? "pointer" : "default" }}
              >
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="favorite-image"
                />
              </div>

              {/* Info Detail Produk STYLA */}
              <div className="favorite-info">
                <span className="favorite-category">
                  {product.category}
                </span>

                {/* Nama Produk - Font Serif */}
                <h3 className="favorite-name">
                  {product.product_name}
                </h3>

                {/* Harga */}
                {product.sale_price ? (
                  <div>
                    <span style={{ textDecoration: "line-through", color: "#999", marginRight: 8, fontSize: "0.85rem" }}>
                      {formatPrice(product.price)}
                    </span>
                    <span className="favorite-price" style={{ color: "#b52b27" }}>
                      {formatPrice(product.sale_price)}
                    </span>
                    {product.discount && (
                      <span style={{ marginLeft: 8, fontSize: "0.75rem", color: "#b52b27", fontWeight: 600 }}>
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="favorite-price">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>

              {/* Tombol Add to Cart */}
              <div className="favorite-cart-wrapper">
                <button
                  className="favorite-cart-btn"
                  onClick={() => onSelectProduct && onSelectProduct(product.product_id)}
                >
                  <ShoppingBag className="favorite-cart-icon" />
                  View Product
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Jika Kosong */
        <div className="favorite-empty">
          <Heart className="favorite-empty-icon" />
          <p className="favorite-empty-title">Wishlist Anda kosong</p>
          <p className="favorite-empty-text">Jelajahi toko STYLA dan temukan fashion item favoritmu.</p>
        </div>
      )}
    </div>
  );
};

export default Favorite;
