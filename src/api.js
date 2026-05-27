import axios from "axios";
import { loadingManager } from "./utils/loadingManager";
// import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Set global default as well
axios.defaults.withCredentials = true;

api.interceptors.request.use(
  (config) => {
    loadingManager.start();
    // const token = localStorage.getItem("token");
    // if (token && token !== "null" && token !== "undefined") {
    //   const actualToken = token.startsWith("Bearer ")
    //     ? token.split(" ")[1]
    //     : token;
    //   config.headers.Authorization = `Bearer ${actualToken}`;
    // }
    return config;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  },
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
  },
);

api.interceptors.response.use(
  (response) => {
    loadingManager.stop();
    return response;
  },
  (error) => {
    loadingManager.stop();
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || "";
      const isInitialAuthCheck = url.includes("/me") || url.includes("/has-address");
      if (!isInitialAuthCheck) {
        console.warn("Session expired or unauthorized. Logging out...");
      }
      window.dispatchEvent(new Event("loginStateChange"));
      // Optional: window.location.href = "/"; // Only if we want aggressive redirect
      // toast.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    loadingManager.stop();
    return response;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  },
);

export default api;
