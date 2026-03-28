import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      config.headers.Authorization = `Bearer ${actualToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
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

export default api;
