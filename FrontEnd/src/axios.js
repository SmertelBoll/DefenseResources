import axios from "axios";

const instance = axios.create({
  baseURL: "https://defense-resources.onrender.com/", //https://defense-resources.onrender.com/    http://localhost:4444
});

// При кожному запросі вшивати токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
