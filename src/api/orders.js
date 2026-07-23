import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("styla_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new order (checkout)
export const createOrder = async (orderPayload) => {
  const response = await axios.post(API_URL, orderPayload, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Get all orders for the logged-in user
export const getOrders = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Track an order by its unique order number (public)
export const trackOrderByNumber = async (orderNumber) => {
  const response = await axios.get(`${API_URL}/${orderNumber}/track`);
  return response.data;
};
