import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../util/Cookies";

import Container from "../components/Container";
import axiosInstance from "../api/AxiosInstance";
import MyButton from "../components/MyButton";

import "../styles/AnnouncementDetail.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [nameEditToggle, setNameEditToggle] = useState(false);
  const [emailEditToggle, setEmailEditToggle] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [myInfo, setMyInfo] = useState([]);

  const fetchMyInfo = () => {
    axiosInstance
      .get(`/admin/${getCookie("Id")}/myPage/view`)
      .then((res) => {
        const myInfoData = res.data;

        setMyInfo(myInfoData);
        setEditedName(myInfoData.name || "");
        setEditedEmail(myInfoData.email || "");

        console.log("MyInfo GET ", res);
      })
      .catch((error) => {
        console.error("MyInfo GET Error:", error);
      });
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const emailEditToggleChange = () => {
    if (emailEditToggle) {
      setEditedEmail(myInfo.email);
    }
    setEmailEditToggle(!emailEditToggle);
  };

  const nameEditToggleChange = () => {
    if (nameEditToggle) {
      setEditedName(myInfo.name);
    }
    setNameEditToggle(!nameEditToggle);
  };

  const fetchEditMyInfo = () => {
    axiosInstance
      .patch(`/admin/${getCookie("adminId")}`, {
        email: editedEmail,
        name: editedName,
      })
      .then((res) => {
        console.log("EditMyInfo GET ", res);
        setMyInfo({
          ...myInfo,
          email: editedEmail,
          name: editedName,
        });
        fetchMyInfo();
      })
      .catch((error) => {
        console.error("EditMyInfo GET Error:", error);
      });
  };

  const handleEmailSubmit = () => {
    fetchEditMyInfo();
    emailEditToggleChange();
  };

  const handleNameSubmit = () => {
    fetchEditMyInfo();
    nameEditToggleChange();
  };

  return (
    <div className="AnnouncementDetail">
      <Container>
        <h2>마이페이지</h2>
        <div>
          <h3>내 정보</h3>
          {myInfo && (
            <table>
              <colgroup>
                <col style={{ width: 120 }} />
                <col style={{ width: 1000 }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>직원 번호</th>
                  <td>{myInfo.adminId}</td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>{myInfo.loginId}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>
                    <div>
                      {!emailEditToggle ? (
                        <div className="edit_con">
                          <div>{myInfo.email}</div>
                          <MyButton
                            buttonText={"수정하기"}
                            onClick={emailEditToggleChange}
                          />
                        </div>
                      ) : (
                        <div className="edit_con">
                          <div>
                            <input
                              type="text"
                              name="email"
                              value={editedEmail}
                              onChange={(e) => {
                                setEditedEmail(e.target.value);
                              }}
                            />
                          </div>
                          <div className="btn">
                            <MyButton
                              buttonText={"저장하기"}
                              onClick={handleEmailSubmit}
                            />
                            <MyButton
                              buttonText={"취소"}
                              onClick={emailEditToggleChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>
                    <div>
                      {!nameEditToggle ? (
                        <div className="edit_con">
                          <div>{myInfo.name}</div>
                          <MyButton
                            buttonText={"수정하기"}
                            onClick={nameEditToggleChange}
                          />
                        </div>
                      ) : (
                        <div className="edit_con">
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                          </div>
                          <div className="btn">
                            <MyButton
                              buttonText={"저장하기"}
                              onClick={handleNameSubmit}
                            />
                            <MyButton
                              buttonText={"취소"}
                              onClick={nameEditToggleChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>담당 (권한)</th>
                  <td>{myInfo.roles}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="btn">
          <MyButton
            buttonText={"나가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
