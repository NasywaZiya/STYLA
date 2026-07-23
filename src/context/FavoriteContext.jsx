import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getFavorites as fetchAllFavorites, addFavorite, removeFavorite } from "../api/favorites";

const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Fetch all favorite IDs when user logs in
  const refreshFavorites = useCallback(async () => {
    if (!isLoggedIn) {
      setFavoriteIds(new Set());
      return;
    }

    try {
      const favorites = await fetchAllFavorites();
      const ids = new Set(favorites.map((f) => f.product_id));
      setFavoriteIds(ids);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavoriteIds(new Set());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  // Check if a product is favorited
  const isFavorite = useCallback(
    (productId) => {
      return favoriteIds.has(Number(productId));
    },
    [favoriteIds]
  );

  // Toggle favorite: add if not favorited, remove if favorited
  const toggleFavorite = useCallback(
    async (productId) => {
      if (!isLoggedIn) return;

      const pid = Number(productId);

      try {
        if (favoriteIds.has(pid)) {
          // Optimistic update — remove immediately
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(pid);
            return next;
          });
          await removeFavorite(pid);
        } else {
          // Optimistic update — add immediately
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.add(pid);
            return next;
          });
          await addFavorite(pid);
        }
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        // Revert on error
        refreshFavorites();
      }
    },
    [isLoggedIn, favoriteIds, refreshFavorites]
  );

  return (
    <FavoriteContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
