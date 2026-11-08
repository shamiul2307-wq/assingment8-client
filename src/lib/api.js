import axios from "axios";
import { authClient } from "./auth-client";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000",
});

api.interceptors.request.use(async (config) => {
  const isProtected = [
    "POST",
    "PATCH",
    "DELETE",
  ].includes(config.method?.toUpperCase());

  // GET /borrows also requires authentication.
  const protectedGet = config.url?.startsWith("/borrows");

  if (isProtected || protectedGet) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Please login to continue");
    }

    config.headers.Authorization = `Bearer ${data.token}`;
  }

  return config;
});

export default api;