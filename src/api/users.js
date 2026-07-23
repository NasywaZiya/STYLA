import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("styla_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get the profile of the currently logged in user
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Update the profile of the currently logged in user
export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    headers: getAuthHeader(),
  });
  return response.data;
};
