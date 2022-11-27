import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_URL || "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});