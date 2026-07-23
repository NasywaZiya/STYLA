import React, { useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { getDetailProduct, getRecommendationProducts } from "../api/products";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./DetailProduct.css"; // Mengimpor file CSS eksternal

export const DetailProduct = ({ onNavigate, productId, onSelectProduct }) => {
  // Product data from API
  const [productData, setProductData] = useState(null);
  const [productLoading, setProductLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();

  // Recommendation
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // FETCH PRODUCT DETAIL
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setProductLoading(true);
        const data = await getDetailProduct(productId);
        setProductData(data);

        // Set initial selected image (display image)
        const displayImage = data.images?.find((img) => img.is_display === 1);
        setSelectedImage(
          displayImage?.image_url || data.images?.[0]?.image_url || "",
        );

        // Set initial color and size
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);

        setQuantity(1);
      } catch (error) {
        console.log("Error fetching product detail:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // FETCH RECOMMENDATION PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getRecommendationProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching recommendation products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Format price
  const formatPrice = (price) => {
    return `IDR ${Number(price).toLocaleString("id-ID")}`;
  };

  // Find current variant based on selected color + size
  const currentVariant = productData?.variants?.find(
    (v) => v.color_code === selectedColor && v.size === selectedSize,
  );

  const maxStock = currentVariant?.stock || 0;

  // QUANTITY
  const increaseQty = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Reset quantity when variant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);

  // Get sizes available for the selected color
  const availableSizes =
    productData?.variants
      ?.filter((v) => v.color_code === selectedColor)
      ?.map((v) => v.size) || [];

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!currentVariant) {
      alert("Selected variant is not available");
      return;
    }
    if (currentVariant.stock < 1) {
      alert("This variant is out of stock");
      return;
    }

    try {
      setAddingToCart(true);
      const res = await addToCart(currentVariant.variant_id, quantity);

      if (res && !res.success) {
        alert(res.message);
      } else {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleFavorite = (id) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    toggleFavorite(id);
  };

  const nextSlide = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    let stars = "";
    for (let i = 0; i < fullStars; i++) stars += "★";
    if (hasHalf) stars += "★";
    while (stars.length < 5) stars += "☆";
    return stars;
  };

  if (productLoading) {
    return (
      <section className="detail-product-page">
        <div className="detail-product-container">
          <div className="state-center-container">
            <p className="text-loading">Loading product...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!productData) {
    return (
      <section className="detail-product-page">
        <div className="detail-product-container">
          <div className="state-center-container">
            <p className="text-not-found">Product not found</p>
          </div>
        </div>
      </section>
    );
  }

  const thumbnails = productData.images || [];

  return (
    <section className="detail-product-page">
      <div className="detail-product-container">
        {/* MAIN PRODUCT SECTION */}
        <div className="main-product-wrapper">
          <div className="product-grid">
            {/* LEFT COLUMN: IMAGES */}
            <div className="image-section">
              {/* THUMBNAILS */}
              <div className="thumbnail-list">
                {thumbnails.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`thumbnail-item ${
                      selectedImage === img.image_url ? "active" : ""
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div className="main-image-box">
                <img
                  src={selectedImage}
                  className="main-image"
                  alt={productData.product_name}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: INFO & ACTIONS */}
            <div className="info-section">
              <p className="collection-tag">
                {productData.gender === "women" ? "Women" : "Men"} Collection
              </p>

              <h1 className="product-title">{productData.product_name}</h1>

              {/* PRICE & DISCOUNT */}
              {productData.sale ? (
                <div className="price-wrapper">
                  <div className="price-sale-container">
                    <span className="original-price line-through">
                      {formatPrice(productData.price)}
                    </span>
                    <span className="sale-price">
                      {formatPrice(productData.sale.sale_price)}
                    </span>
                    <span className="discount-badge">
                      -{productData.sale.discount}%
                    </span>
                  </div>
                  <p className="save-announcement">
                    You save{" "}
                    {formatPrice(
                      Number(productData.price) -
                        Number(productData.sale.sale_price),
                    )}
                  </p>
                </div>
              ) : (
                <p className="normal-price">{formatPrice(productData.price)}</p>
              )}

              {/* RATING */}
              <div className="rating-container">
                <div className="stars">{renderStars(productData.rating)}</div>
                <span className="review-count">
                  ({productData.reviewCount} Reviews)
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="product-description">{productData.description}</p>

              {/* COLOR SELECTOR */}
              <div className="selector-group">
                <h3 className="selector-title">Color</h3>
                <div className="color-buttons">
                  {productData.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        const sizesForColor =
                          productData.variants
                            ?.filter((v) => v.color_code === color)
                            ?.map((v) => v.size) || [];
                        if (
                          !sizesForColor.includes(selectedSize) &&
                          sizesForColor.length > 0
                        ) {
                          setSelectedSize(sizesForColor[0]);
                        }
                      }}
                      className={`color-btn ${selectedColor === color ? "active" : ""}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR */}
              <div className="selector-group">
                <h3 className="selector-title">Size</h3>
                <div className="size-buttons">
                  {productData.sizes?.map((size) => {
                    const isAvailable = availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`size-btn ${selectedSize === size ? "active" : ""} ${
                          !isAvailable ? "disabled" : ""
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {currentVariant && (
                  <p className="stock-info">Stock: {currentVariant.stock}</p>
                )}
              </div>

              {/* QUANTITY */}
              <div className="selector-group">
                <h3 className="selector-title">Quantity</h3>
                <div className="quantity-control">
                  <button onClick={decreaseQty} className="qty-btn">
                    <Minus size={18} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button onClick={increaseQty} className="qty-btn">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* BUTTON ACTIONS */}
              <div className="action-buttons-container">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !currentVariant || maxStock < 1}
                  className="btn-add-to-cart"
                >
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  onClick={() => handleToggleFavorite(productId)}
                  className="btn-favorite"
                >
                  <Heart
                    size={18}
                    fill={isFavorite(productId) ? "#b52b27" : "none"}
                    color={isFavorite(productId) ? "#b52b27" : "#1a1a1a"}
                  />
                  Favorite
                </button>
              </div>

              {/* DETAILS SPECIFICATION */}
              <div className="details-specifications">
                <div className="spec-row">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">
                    {productData.material || "-"}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">
                    {productData.category || "-"}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Shipping</span>
                  <span className="spec-value">Free Shipping</span>
                </div>

                <div className="more-detail-section">
                  <p className="spec-label mb-2">More Detail</p>
                  <p className="more-detail-text">
                    {productData.detail || "No additional details available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATION SECTION */}
        <div className="recommendation-section">
          <div className="recommendation-header">
            <h3 className="recommendation-title">You May Also Like</h3>
            <div className="slider-arrows">
              <button onClick={prevSlide} className="arrow-btn">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextSlide} className="arrow-btn">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="rec-loading-box">
              <p className="text-loading">Loading products...</p>
            </div>
          ) : (
            <>
              {/* MOBILE SLIDER (Horizontal Scroll) */}
              <div className="mobile-rec-slider">
                {products.map((product) => {
                  const isLiked = isFavorite(product.product_id);
                  return (
                    <div
                      key={product.product_id}
                      className="mobile-card-item"
                      onClick={() => onSelectProduct(product.product_id)}
                    >
                      <div className="card-image-box">
                        {product.sale_price && (
                          <span className="card-badge-discount">
                            -{product.discount}%
                          </span>
                        )}
                        <img
                          src={product.image}
                          className="card-image"
                          alt={product.product_name}
                        />
                        <button
                          className="card-wishlist-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(product.product_id);
                          }}
                          aria-label="Wishlist"
                        >
                          <Heart
                            size={16}
                            fill={isLiked ? "#b52b27" : "none"}
                            className={!isLiked ? "text-gray-800" : ""}
                            color={isLiked ? "#b52b27" : undefined}
                          />
                        </button>
                      </div>

                      <div className="card-info">
                        <h3 className="card-title">{product.product_name}</h3>
                        <p className="card-desc">{product.description}</p>
                        {product.sale_price ? (
                          <div className="card-price-row">
                            <span className="card-old-price">
                              {formatPrice(product.price)}
                            </span>
                            <span className="card-new-price">
                              {formatPrice(product.sale_price)}
                            </span>
                          </div>
                        ) : (
                          <p className="card-normal-price">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP SLIDER (Transform Based) */}
              <div className="desktop-rec-slider">
                <div
                  className="desktop-slider-track"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / 4)}%)`,
                  }}
                >
                  {products.map((product) => {
                    const isLiked = isFavorite(product.product_id);
                    return (
                      <div
                        key={product.product_id}
                        className="desktop-card-item"
                        onClick={() => onSelectProduct(product.product_id)}
                      >
                        <div className="card-image-box">
                          {product.sale_price && (
                            <span className="card-badge-discount">
                              -{product.discount}%
                            </span>
                          )}
                          <img
                            src={product.image}
                            className="card-image group-hover-zoom"
                            alt={product.product_name}
                          />
                          <button
                            className="card-wishlist-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(product.product_id);
                            }}
                            aria-label="Wishlist"
                          >
                            <Heart
                              size={18}
                              fill={isLiked ? "#b52b27" : "none"}
                              className={!isLiked ? "text-gray-800" : ""}
                              color={isLiked ? "#b52b27" : undefined}
                            />
                          </button>
                        </div>

                        <div className="card-info">
                          <h3 className="card-title">{product.product_name}</h3>
                          <p className="card-desc">{product.description}</p>
                          {product.sale_price ? (
                            <div className="card-price-row">
                              <span className="card-old-price">
                                {formatPrice(product.price)}
                              </span>
                              <span className="card-new-price">
                                {formatPrice(product.sale_price)}
                              </span>
                            </div>
                          ) : (
                            <p className="card-normal-price">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SUCCESS TOAST */}
      <div className={`toast-notification ${showToast ? "show" : ""}`}>
        <div className="toast-icon-box">
          <svg
            className="toast-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h4 className="toast-title">Added to Cart</h4>
          <p className="toast-desc">
            Product has been successfully added to your cart.
          </p>
        </div>
      </div>
    </section>
  );
};
