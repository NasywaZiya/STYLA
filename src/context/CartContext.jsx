import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart, addToCart as apiAddToCart, updateCartItem, removeCartItem } from "../api/cart";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isLoggedIn, openLogin } = useAuth();
  const [cartData, setCartData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCartData({ items: [], total: 0 });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getCart();
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartData({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (variant_id, quantity) => {
    if (!isLoggedIn) {
      openLogin("cart");
      return;
    }

    try {
      await apiAddToCart(variant_id, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      const message = error.response?.data?.message || "Failed to add to cart";
      return { success: false, message };
    }
  };

  const increaseQty = async (cartItemId, currentQty, stock) => {
    const newQty = currentQty + 1;
    if (newQty > stock) return;

    try {
      await updateCartItem(cartItemId, newQty);
      // Optimistic update
      setCartData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.cart_item_id === cartItemId
            ? { ...item, quantity: newQty, subtotal: item.effective_price * newQty }
            : item
        ),
        total: prev.items.reduce(
          (sum, item) =>
            item.cart_item_id === cartItemId
              ? sum + item.effective_price * newQty
              : sum + item.subtotal,
          0
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQty = async (cartItemId, currentQty) => {
    if (currentQty <= 1) return;
    const newQty = currentQty - 1;

    try {
      await updateCartItem(cartItemId, newQty);
      // Optimistic update
      setCartData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.cart_item_id === cartItemId
            ? { ...item, quantity: newQty, subtotal: item.effective_price * newQty }
            : item
        ),
        total: prev.items.reduce(
          (sum, item) =>
            item.cart_item_id === cartItemId
              ? sum + item.effective_price * newQty
              : sum + item.subtotal,
          0
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      // Optimistic update
      setCartData((prev) => {
        const newItems = prev.items.filter((item) => item.cart_item_id !== cartItemId);
        return {
          ...prev,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.subtotal, 0),
        };
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        loading,
        fetchCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
