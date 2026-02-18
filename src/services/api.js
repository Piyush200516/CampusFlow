import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-api.com/api", // replace with your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
