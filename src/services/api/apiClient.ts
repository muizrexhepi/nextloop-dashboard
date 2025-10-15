// src/services/api/apiClient.ts
import axios from "axios";

// Get the API URL from the environment variables
const API_BASE_URL = "https://gscwqtwd-5000.euw.devtunnels.ms/api";

if (!API_BASE_URL) {
  throw new Error("API_URL is not defined in your environment variables.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // You might add an Authorization header here if needed for authentication
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
  // You can also add a timeout for requests
  timeout: 10000,
});

export default apiClient;
