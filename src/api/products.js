import axios from "axios";

//All products
export const getAllProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/products");
  return response.data;
};

//Women products
export const getWomenProducts = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/products/women"
  );

  return response.data;
};

//Men Products
export const getMenProducts = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/products/men"
  );

  return response.data;
};

//Recommendation
export const getRecommendationProducts = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/products/recommendation"
  );

  return response.data;
};

//Detail Product
export const getDetailProduct = async (productId) => {
  const response = await axios.get(
    `http://localhost:5000/api/products/${productId}`
  );

  return response.data;
};

