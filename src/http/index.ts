import axios, { AxiosInstance } from "axios";

const clientHttp: AxiosInstance = axios.create({
  baseURL: "https://alura-tracker-backend.vercel.app/api",
});

export default clientHttp;
