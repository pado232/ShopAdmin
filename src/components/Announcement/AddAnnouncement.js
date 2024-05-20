import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../util/Cookies";
import axiosInstance from "../../api/AxiosInstance";

import MyButton from "../../components/MyButton";
import Container from "../../components/Container";

import { BsFillPinAngleFill } from "react-icons/bs";

import "../../styles/AddAnnouncement.css";

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [fixToggle, setFixToggle] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const fixToggleChange = () => {
    setFixToggle(!fixToggle);
  };

  const handleSubmit = () => {
    // 각 항목 유효성 검사
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value.length < 1) {
        inputRef.current[i].focus();
        return;
      }
    }

    axiosInstance
      .post(`/admin/${getCookie("Id")}/announcement`, {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        fix: fixToggle,
      })
      .then((response) => {
        console.log("POST Success:", response);

        setNewAnnouncement({
          title: "",
          content: "",
        });
        setFixToggle(false);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="EditAddAnnouncement">
      <Container>
        <h2>공지사항 등록하기</h2>

        <table>
          <colgroup style={{ width: 120 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>고정 여부</th>
              <td>
                <div>
                  {fixToggle ? (
                    <div className="fix_box">
                      <div className="fix_icon">
                        <BsFillPinAngleFill size={11 * 2} />
                      </div>
                      <div className="fix_btn">
                        <MyButton
                          buttonText={"고정 해제"}
                          onClick={fixToggleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <MyButton
                        buttonText={"고정하기"}
                        onClick={fixToggleChange}
                      />
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input
                  name="title"
                  value={newAnnouncement.title}
                  ref={(el) => (inputRef.current[0] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  name="content"
                  value={newAnnouncement.content}
                  ref={(el) => (inputRef.current[1] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn">
          <MyButton buttonText={"등록하기"} onClick={handleSubmit} />
          <MyButton
            buttonText={"취소"}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </Container>
    </div>
  );
};
export default AddAnnouncement;
