import axios from "axios";
import { loadingManager } from "./utils/loadingManager";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    loadingManager.start();
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      config.headers.Authorization = `Bearer ${actualToken}`;
    }
    return config;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  }
);

// Also apply to global axios if used directly in components
axios.interceptors.request.use(
  (config) => {
    loadingManager.start();
    return config;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    loadingManager.stop();
    return response;
  },
  (error) => {
    loadingManager.stop();
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized globally if needed
      console.error("Authentication Error: Token missing or invalid.");
      // optionally redirect to login or clear token
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    loadingManager.stop();
    return response;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  }
);


export default api;
