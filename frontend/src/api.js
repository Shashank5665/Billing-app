import axios from "axios";
export const api = axios.create({
  baseURL: "https://bill-app-backend.onrender.com/",
});
