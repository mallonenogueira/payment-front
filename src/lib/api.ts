import axios from "axios";

export const api = axios.create({
  baseURL: "https://desenv.mallone.dev",
});
