import { useState, useRef } from "react";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import axiosInstance from "../api/AxiosInstance";

import "../styles/SignUp.css";

const SignUp = () => {
  const inputRef = useRef([]);
  const [pwValid, setPwValid] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [state, setState] = useState({
    id: "",
    pw: "",
    pwcheck: "",
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    if (name === "pw") {
      setPwValid(validatePassword(value));
    }

    // 다른 입력 유형을 처리
    setState({
      ...state,
      [name]: value,
    });
  };

  const validatePassword = (value) => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return pwReg.test(value);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    // 비밀번호 유효성 검사
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!pwReg.test(state.pw)) {
      inputRef.current[1].focus();
      return;
    }

    // 비밀번호 확인 유효성 검사
    if (state.pw !== state.pwcheck) {
      inputRef.current[2].focus();
      return;
    }
    // // 이메일 유효성 검사
    // const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    // if (!emailReg.test(state.email)) {
    //   inputRef.current[3].focus();
    //   return; // 이메일 형식이 유효하지 않으면 전송을 막음
    // }

    console.log(state);

    axiosInstance
      .post(`/adminJoin`, {
        loginId: state.id,
        loginPassword: state.pw,
      })
      .then((res) => {
        window.alert("새로운 관리자(직원)가 정상적으로 가입되었습니다.");
        setState({
          id: "",
          pw: "",
          pwcheck: "",
        });
        console.log("관리자 가입 저장 성공", res);
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("관리자 가입에 대한 권한이 없습니다.");
          setState({ id: "", pw: "", pwcheck: "" });
        } else {
          console.log("관리자 가입 저장 실패", error);
        }
      });
  };

  const idDoubleCheck = (event) => {
    event.preventDefault();
    axiosInstance
      .post(`/adminIdCheck`, {
        loginId: state.id,
      })
      .then((res) => {
        const loginCheckBoolean = res.data;

        if (loginCheckBoolean === true) {
          setIdCheckMessage("중복없음");
        } else {
          setIdCheckMessage("중복");
        }
        console.log("중복 확인 성공", res);
      })

      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("관리자 가입에 대한 권한이 없습니다.");
          setState({ id: "", pw: "", pwcheck: "" });
        } else {
          console.log("중복 확인 실패 (아이디 중복)", error);
        }
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="SignUp">
      <Container>
        <h2>관리자 가입</h2>
        <div>
          <div className="SignUpContent">
            <div className="signup_content">
              <form>
                <div className="signup_title">아이디</div>
                <input
                  name="id"
                  value={state.id}
                  onChange={handleChangeState}
                  ref={(el) => (inputRef.current[0] = el)}
                  onKeyPress={handleKeyPress}
                  autoComplete="username"
                />
                {idCheckMessage && (
                  <div>
                    {idCheckMessage === "중복없음" ? (
                      <div className="pw_error" style={{ color: "black" }}>
                        사용 가능한 아이디입니다.
                      </div>
                    ) : (
                      <div className="pw_error">
                        이미 존재하는 아이디입니다. 다시 작성해주세요.
                      </div>
                    )}
                  </div>
                )}
                <div className="ckbtnbox">
                  <button className="ckbtn" onClick={idDoubleCheck}>
                    중복 확인
                  </button>
                </div>

                <div className="signup_title">비밀번호</div>
                <input
                  name="pw"
                  value={state.pw}
                  type="password"
                  maxLength="20"
                  onChange={handleChangeState}
                  ref={(el) => (inputRef.current[1] = el)}
                  onKeyPress={handleKeyPress}
                  autoComplete="password"
                />
                {!pwValid && state.pw.length > 0 && (
                  <div className="pw_error">
                    영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                  </div>
                )}

                <div className="signup_title">비밀번호 확인</div>
                <input
                  name="pwcheck"
                  value={state.pwcheck}
                  type="password"
                  maxLength="20"
                  onChange={handleChangeState}
                  ref={(el) => (inputRef.current[2] = el)}
                  onKeyPress={handleKeyPress}
                  autoComplete="password-check"
                />
                {state.pwcheck.length > 0 && state.pw !== state.pwcheck && (
                  <div className="pw_error">비밀번호가 일치하지 않습니다.</div>
                )}
              </form>

              <div className="btnbox">
                <MyButton
                  buttonText={"관리자 가입하기"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
