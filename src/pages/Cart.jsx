import React from "react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

const ShoppingCart = ({ onNavigate }) => {
  const { cartData, loading, increaseQty, decreaseQty, removeItem } = useCart();
  const { isLoggedIn, openLogin } = useAuth();

  const cartItems = cartData?.items || [];

  // 1. Hitung Subtotal berdasarkan harga asli produk (item.price)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // 2. Hitung Total Diskon (Selisih harga asli dengan harga efektif/sale)
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total + (item.price - item.effective_price) * item.quantity,
    0,
  );

  // 3. Total Akhir (Subtotal dikurangi diskon)
  const total = subtotal - totalDiscount;

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeItem(cartItemId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* TOP */}
        <div className="cart-top">
          <div>
            <h1 className="cart-title">Cart</h1>
            <p className="cart-subtitle">
              {cartItems.length} items in your cart
            </p>
          </div>
        </div>

        {/* MAIN */}
        <main className="cart-main">
          {/* LEFT: Items List */}
          <div className="cart-items-list">
            {loading ? (
              <div className="cart-loading">
                <p className="cart-loading-text">Loading cart...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={64} className="cart-empty-icon" />
                <h2 className="cart-empty-title">Oops, your cart is empty</h2>
                <p className="cart-empty-text">
                  Looks like you haven't added anything yet. Start shopping to
                  fill it with your favorite items.
                </p>
                <button
                  onClick={() => onNavigate("women")}
                  className="cart-empty-btn"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cart_item_id} className="cart-item-card">
                  <div className="cart-item-row">
                    {/* IMAGE */}
                    <div className="cart-item-image-wrapper">
                      <img
                        src={item.image}
                        className="cart-item-image"
                        alt={item.product_name}
                      />
                    </div>

                    {/* INFO */}
                    <div className="cart-item-info">
                      <div>
                        <div className="cart-item-header">
                          <div className="cart-item-header-text">
                            <h2 className="cart-item-name">
                              {item.product_name}
                            </h2>

                            <div className="cart-item-variant">
                              <div>
                                Size:{" "}
                                <span className="cart-item-variant-value">
                                  {item.size}
                                </span>
                              </div>

                              <div className="cart-item-color">
                                Color:{" "}
                                <span
                                  className="cart-item-color-dot"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                              </div>
                            </div>
                          </div>

                          {/* DELETE */}
                          <button
                            onClick={() => handleRemoveItem(item.cart_item_id)}
                            className="cart-item-delete-btn"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* PRICE */}
                        {item.sale_price ? (
                          <div className="cart-item-price-sale-wrapper">
                            <span className="cart-item-discount-badge">
                              -{item.discount}%
                            </span>
                            <span className="cart-item-price-old">
                              IDR {item.price.toLocaleString("id-ID")}
                            </span>
                            <p className="cart-item-price-sale">
                              IDR {item.sale_price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        ) : (
                          <p className="cart-item-price-normal">
                            IDR {item.price.toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>

                      {/* QTY */}
                      <div className="cart-item-qty-row">
                        <div className="cart-item-qty-control">
                          <button
                            onClick={() =>
                              decreaseQty(item.cart_item_id, item.quantity)
                            }
                            className="cart-item-qty-btn"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="cart-item-qty-value">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(
                                item.cart_item_id,
                                item.quantity,
                                item.stock,
                              )
                            }
                            className="cart-item-qty-btn"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* TOTAL PER ITEM */}
                        <p className="cart-item-subtotal">
                          IDR{" "}
                          {(
                            item.effective_price * item.quantity
                          ).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>IDR {subtotal.toLocaleString("id-ID")}</span>
              </div>

              <div className="cart-summary-row" style={{ color: "#b52b27" }}>
                <span>Diskon</span>
                <span>- IDR {totalDiscount.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="cart-summary-total">
              <span className="cart-summary-total-label">Total</span>
              <span className="cart-summary-total-value">
                IDR {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={() => onNavigate("checkout")}
              className="cart-checkout-btn"
              disabled={cartItems.length === 0}
            >
              Checkout
              <ArrowRight size={18} />
            </button>

            {/* NOTE */}
            <p className="cart-summary-note">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCart;
