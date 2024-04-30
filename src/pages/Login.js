import { useState } from "react";
import "../styles/Login.css";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

const Login = () => {
  const [state, setState] = useState({ id: "", pw: "" });
  const navigate = useNavigate();

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    setState({
      id: "",
      pw: "",
    });
    alert("로그인이 완료되었습니다.");
    navigate("/");
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
