import axios from "axios";

const API_URL = "http://localhost:5000/api/favorites";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("styla_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all favorites for the logged-in user
export const getFavorites = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Add a product to favorites
export const addFavorite = async (productId) => {
  const response = await axios.post(
    API_URL,
    { product_id: productId },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Remove a product from favorites
export const removeFavorite = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Check if a product is in the user's favorites
export const getFavoriteStatus = async (productId) => {
  const response = await axios.get(`${API_URL}/status/${productId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
