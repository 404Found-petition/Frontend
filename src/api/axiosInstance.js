// src/api/axiosInstance.js
import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/`, // config.js 값 사용
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ 요청 시 access 토큰 자동 부착
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ 응답 시 토큰 만료 감지 → 자동 로그아웃
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data?.code === "token_not_valid"
        ) {
            console.warn("⛔️ JWT 만료: 자동 로그아웃 실행");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/login"; // or use navigate() if inside a React component
        }
        return Promise.reject(error);
    }
);

export default api;
