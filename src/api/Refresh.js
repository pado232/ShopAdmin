import axiosInstance from "../api/AxiosInstance";
// import moment from "moment";
import { getCookie, setCookie } from "../util/Cookies";

const refresh = async () => {
  // const refreshToken = getCookie("Refresh_Token");

  // 토큰이 만료되었다면

  try {
    const res = await axiosInstance.post("/admin/reissue/accessToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("Authorization")}`,
        Refresh_Token: `${getCookie("Refresh_Token")}`,
      },
    });

    console.log("재발급 성공", res.data);

    // 새로운 토큰 및 만료 시간 저장
    const newAuthorization = res.data.Authorization;
    const newRefreshToken = res.data.Refresh_Token;

    setCookie("Authorization", newAuthorization);
    setCookie("Refresh_Token", newRefreshToken);

    // 토큰이 갱신되면 아무것도 반환하지 않습니다.
  } catch (error) {
    console.error("재발급 실패", error);

    // 토큰 갱신 실패 시 처리할 작업 (예: 로그아웃 등)
    // refreshErrorHandle();

    // 토큰이 만료된 경우 요청을 중단하고 에러 반환
    throw new Error("토큰 갱신 실패");
  }

  // 토큰이 만료되지 않은 경우 아무것도 반환하지 않습니다.
};

export { refresh };
