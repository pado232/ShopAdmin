import { useState } from "react";
import "../styles/Login.css";
import MyButton from "../components/MyButton";
import Container from "../components/Container";
import useCookies from "../util/Cookies"; // 쿠키 관리 컴포넌트 가져오기

const Login = ({onLogin}) => {
  const [state, setState] = useState({ id: "", pw: "" });
  const { setCookie } = useCookies(); // useCookies 훅 사용

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // < 관리자 정보 >
    // 아이디: admin111
    // 패스워드: Password@1

    // 로그인 처리
    fetch("http://localhost:8080/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: state.id,
        loginPassword: state.pw
      }),
    })
    .then((response) => {
      // console.log('서버 응답 확인하기: ',response);
      if (!response.ok) {
        throw new Error("로그인 실패");
      }
      // 서버로부터 받은 토큰
      const AuthorizationToken = response.headers.get('Authorization');   // 시간이 지나면 바뀌는 토큰
      const RefreshToken = response.headers.get('Refresh_Token');    // 바뀐 AuthorizationToken을 위해 인증하는 토큰

      // 토큰을 쿠키에 저장
      setCookie('AuthorCookie', AuthorizationToken);
      setCookie('RefCookie', RefreshToken);

      // 로그인 성공 시 부모 컴포넌트로 토큰 전달
      onLogin(AuthorizationToken);

      // 로그인 성공 알림
      alert("로그인이 완료되었습니다.");
         // navigate("/");
    })
    .catch((error) => {
      console.error("로그인 에러:", error);
      alert("유효하지 않은 회원정보입니다. 다시 입력해주세요.");
      setState({ id: "", pw: "" });
    });

      // setState({ id: "", pw: "" });
  };

  return (
    <div className="Login">
      <Container>
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
      </Container>
    </div>
  );
};
export default Login;