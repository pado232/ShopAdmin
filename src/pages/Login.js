import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import MyButton from "../components/MyButton";
import { setCookie } from "../util/Cookies";
import axiosInstance from "../api/AxiosInstance";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({ id: "", pw: "" });

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/adminLogin", {
        // axiosInstance 사용
        loginId: state.id,
        loginPassword: state.pw,
      })
      .then((response) => {
        const adminId = response.data.adminId;
        const AuthorizationToken = response.headers.get("Authorization");
        const RefreshToken = response.headers.get("Refresh_Token");

        // 토큰을 쿠키에 저장
        setCookie("Id", adminId);
        setCookie("Authorization", AuthorizationToken);
        setCookie("Refresh_Token", RefreshToken);

        // 로그인 성공 시 부모 컴포넌트로 토큰 전달
        onLogin(AuthorizationToken, RefreshToken);

        // 로그인 성공 알림
        alert("로그인이 완료되었습니다.");
        navigate(-1);

        console.log("로그인 서버 전송: ", response);
      })
      .catch((error) => {
        console.error("로그인 에러:", error);
        alert("유효하지 않은 회원정보입니다. 다시 입력해주세요.");
      })
      .finally(() => {
        // 로그인이 성공하든 실패하든 항상 호출되도록 합니다.
        setState({ id: "", pw: "" }); // 로그인 상태 초기화
      });
  };

  return (
    <div className="Login">
      <h2>LOGIN</h2>
      <div className="login_container">
        <div className="logoin_warpper">
          <form>
            <input
              name="id"
              placeholder="아이디"
              value={state.id}
              onChange={handleChangeState}
              autoComplete="username"
            />
            <input
              name="pw"
              type="password"
              placeholder="비밀번호"
              value={state.pw}
              onChange={handleChangeState}
              autoComplete="current-password"
            />
          </form>
        </div>
        <div className="button_warpper">
          <MyButton onClick={handleSubmit} buttonText={"로그인"} />
        </div>
      </div>
    </div>
  );
};
export default Login;
