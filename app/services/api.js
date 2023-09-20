import axios from "axios";

export const requester = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://172.20.20.246:5000/api"
      : "https://shopit-etn6.onrender.com/api",
});
