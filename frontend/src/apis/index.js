import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const getProducts = async (filter) => API.get("/products", { params: filter });
const createProduct = async (newProduct) => API.post("/products", newProduct);
const updateProduct = async (productId, updatedProduct) => {
  API.patch(`/products/${productId}`, updatedProduct);
};

const getCart = async () => API.get("/cart");
const addToCart = async (id, newCartItem) =>
  API.post(`/cart/${id}`, newCartItem);
const updateCart = async (id, updatedCartItem) =>
  API.patch(`/cart/${id}`, updatedCartItem);

export {
  getProducts,
  createProduct,
  updateProduct,
  getCart,
  addToCart,
  updateCart,
};
