import axios from "axios";

const BASE_URL = 'http://localhost:3000/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

export default apiClient