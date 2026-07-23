import React, { useEffect, useState } from "react";
import { getMenProducts } from "../api/products";
import { Heart } from "lucide-react";
import { useFavorite } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import "./MenCategory.css";

const MenCategory = ({ onNavigate, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn, openLogin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Men");

  // PRICE
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const MIN = 0;
  const MAX = 5000000;

  const categories = [
    "All Men",
    "Tops",
    "Bottoms",
    "Sports",
    "Outerwear",
    "Sweatshirts",
    "Accessories",
    "Shoes",
    "Bags",
  ];

  // Size data
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    "#000000",
    "#ddcaa5",
    "#f39d79",
    "#f26a6a",
    "#d978c7",
    "#7b93ea",
    "#6f6f6f",
    "#67ad61",
    "#eadd64",
  ];

  // FETCH DATA AXIOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getMenProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggleFavorite = (id) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    toggleFavorite(id);
  };

  // Format price from number to "IDR xxx.xxx"
  const formatPrice = (price) => {
    return `IDR ${Number(price).toLocaleString("id-ID")}`;
  };

  //filter product
  const filteredProducts = products
    .filter((product) => {
      const effectivePrice = product.sale_price || Number(product.price);
      const matchesPrice =
        effectivePrice >= minPrice && effectivePrice <= maxPrice;

      const matchesCategory =
        selectedCategory === "All Men" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        product.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());

      const matchesColor =
        selectedColor === "" || product.colors?.includes(selectedColor);

      const matchesSize =
        selectedSize === "" ||
        product.sizes?.includes(selectedSize) ||
        product.sizes?.includes("One Size") ||
        product.sizes?.includes("one size") ||
        product.sizes?.includes("One size");

      return matchesPrice && matchesCategory && matchesColor && matchesSize;
    })
    .sort((a, b) => {
      const priceA = a.sale_price || Number(a.price);
      const priceB = b.sale_price || Number(b.price);

      switch (sortOption) {
        case "price-low":
          return priceA - priceB;

        case "price-high":
          return priceB - priceA;

        case "newest":
        default:
          return b.product_id - a.product_id;
      }
    });

  return (
    <div className="men-category-page">
      <div className="men-category-container">
        {/* Sidebar */}
        <aside className="men-category-sidebar">
          {/* CATEGORY */}
          <div className="men-category-category-section">
            <h3 className="men-category-section-title">Category</h3>

            <ul className="men-category-category-list">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`men-category-category-item ${
                    selectedCategory === category
                      ? "men-category-category-item-active"
                      : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="men-category-filter-title">Filter</h3>

            {/* Color */}
            <div className="men-category-filter-block">
              <h4 className="men-category-filter-label">Color</h4>

              <div className="men-category-color-list">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(selectedColor === color ? "" : color)
                    }
                    className={`men-category-color-swatch ${
                      selectedColor === color
                        ? "men-category-color-swatch-active"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="men-category-filter-block">
              <h4 className="men-category-filter-label">Size</h4>

              <div className="men-category-size-list">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(selectedSize === size ? "" : size)
                    }
                    className={`men-category-size-btn ${
                      selectedSize === size
                        ? "men-category-size-btn-active"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="men-category-filter-label men-category-price-label">
                Range Price
              </h4>

              <div className="men-category-price-wrapper">
                {/* SLIDER */}
                <div className="men-category-slider">
                  {/* LINE */}
                  <div className="men-category-slider-line"></div>

                  {/* ACTIVE LINE */}
                  <div
                    className="men-category-slider-line-active"
                    style={{
                      left: `${(minPrice / MAX) * 100}%`,
                      right: `${100 - (maxPrice / MAX) * 100}%`,
                    }}
                  ></div>

                  {/* MIN RANGE */}
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step="100000"
                    value={minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (value < maxPrice) {
                        setMinPrice(value);
                      }
                    }}
                    className="men-category-range-input"
                  />

                  {/* MAX RANGE */}
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step="100000"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (value > minPrice) {
                        setMaxPrice(value);
                      }
                    }}
                    className="men-category-range-input"
                  />
                </div>

                {/* Text price */}
                <div className="men-category-price-text">
                  <div>IDR {minPrice.toLocaleString("id-ID")}</div>

                  <div>IDR {maxPrice.toLocaleString("id-ID")}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="men-category-main">
          {/* TOP */}
          <div className="men-category-top">
            <div>
              <p className="men-category-collection-label">Men Collection</p>

              <h2 className="men-category-heading">Men</h2>

              <p className="men-category-showing-text">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* SORT */}
            <div className="men-category-sort-wrapper">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="men-category-sort-select"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Lowest Price</option>
                <option value="price-high">Highest Price</option>
              </select>

              {/* ARROW ICON */}
              <div className="men-category-sort-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="men-category-sort-arrow-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="men-category-loading">
              <p className="men-category-loading-text">Loading products...</p>
            </div>
          ) : (
            <div className="men-category-grid">
              {filteredProducts.map((product) => {
                const isLiked = isFavorite(product.product_id);
                return (
                  <div
                    key={product.product_id}
                    className="men-category-card"
                    onClick={() => onSelectProduct(product.product_id)}
                  >
                    {/* IMAGE */}
                    <div className="men-category-card-image-wrapper">
                      {product.sale_price && (
                        <span className="men-category-discount-badge">
                          -{product.discount}%
                        </span>
                      )}
                      <img
                        src={product.image}
                        className="men-category-card-image"
                      />

                      {/* HEART */}
                      <button
                        className="men-category-wishlist-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(product.product_id);
                        }}
                        aria-label="Wishlist"
                      >
                        <Heart
                          size={18}
                          fill={isLiked ? "#b52b27" : "none"}
                          className={!isLiked ? "men-category-heart-icon" : ""}
                          color={isLiked ? "#b52b27" : undefined}
                        />
                      </button>
                    </div>

                    {/* INFO */}
                    <div className="men-category-card-info">
                      <h3 className="men-category-card-name">
                        {product.product_name}
                      </h3>

                      {product.sale_price ? (
                        <div className="men-category-card-price-wrapper">
                          <span className="men-category-card-price-old">
                            {formatPrice(product.price)}
                          </span>
                          <span className="men-category-card-price-sale">
                            {formatPrice(product.sale_price)}
                          </span>
                        </div>
                      ) : (
                        <p className="men-category-card-price-normal">
                          {formatPrice(product.price)}
                        </p>
                      )}

                      {/* READY COLORS */}
                      <div className="men-category-card-colors">
                        {product.colors?.map((color, index) => (
                          <span
                            key={index}
                            className="men-category-card-color-dot"
                            style={{ backgroundColor: color }}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MenCategory;
