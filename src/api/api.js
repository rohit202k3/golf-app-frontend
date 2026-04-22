import axios from "axios";

const API = axios.create({
  baseURL: "stunning-serenity-production-d6da.up.railway.app/api",
});

// 🔥 ADD THIS (VERY IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;