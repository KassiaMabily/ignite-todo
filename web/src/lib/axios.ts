import axios from 'axios'
import { parseCookies } from 'nookies'
const https = require('https');

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

api.interceptors.request.use((config) => {
  const cookies = parseCookies()
  const token = cookies[process.env.NEXT_PUBLIC_TOKEN as string];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.timeout = 30000;

  return config;
})

export default api;
