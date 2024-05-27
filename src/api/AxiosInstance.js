import axios from "axios";
import { getCookie, setCookie } from "../util/Cookies.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("Authorization");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      response: { status, data },
    } = error;

    console.log("에러 받기", data.message);

    if (data.message === "NOT_AUTHORIZATION") {
    } else if (status === 403) {
      try {
        // 재발급 요청을 보내기 전에 이전 토큰과 리프레시 토큰을 가져옴
        // const oldAuthorization = getCookie("Authorization");
        const oldRefreshToken = getCookie("Refresh_Token");

        const res = await axiosInstance.post(
          "/admin/reissue/accessToken",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `${oldAuthorization}`,
              Refresh_Token: `${oldRefreshToken}`,
            },
          }
        );

        console.log("재발급 성공", res.data);

        // 새로운 토큰 및 만료 시간 저장

        const AuthorizationToken = res.headers.get("Authorization");
        const RefreshToken = res.headers.get("Refresh_Token");

        setCookie("Authorization", AuthorizationToken);
        setCookie("Refresh_Token", RefreshToken);

        error.config.headers.Authorization = `${AuthorizationToken}`;
        return axiosInstance(error.config);
      } catch (error) {
        console.error("재발급 실패", error);
        throw new Error("토큰 갱신 실패");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
