import axios from "axios";
import { cookies } from "../helpers/cookies";

export const axiosApi = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Authorization": `Bearer ${cookies().token}`,
    "Content-Type": "application/json",
  },
});