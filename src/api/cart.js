import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("styla_token");
  if (!token) throw new Error("No authentication token found");
  return { Authorization: `Bearer ${token}` };
};

// Get cart items (Authenticated only)
export const getCart = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Add item to cart
export const addToCart = async (variant_id, quantity) => {
  const response = await axios.post(
    `${API_URL}`,
    { variant_id, quantity },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axios.put(
    `${API_URL}/item/${cartItemId}`,
    { quantity },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Remove cart item
export const removeCartItem = async (cartItemId) => {
  const response = await axios.delete(`${API_URL}/item/${cartItemId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
