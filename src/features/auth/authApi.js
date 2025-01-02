import axios from "axios";

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registration(credentials) {
  return await api.post("/users", credentials);
}

export async function login(credentials) {
  return await api.post("/users/login", credentials);
}
