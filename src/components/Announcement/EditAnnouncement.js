import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BsFillPinAngleFill } from "react-icons/bs";

import Container from "../Container";
import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

import "../../styles/AddAnnouncement.css";
import { getCookie } from "../../util/Cookies";
import CheckPermissions from "../../api/CheckPermissions";

const EditAnnouncement = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [fixToggle, setFixToggle] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
  });

  const fetchEditAnnouncement = () => {
    axiosInstance
      .get(
        `/admin/${getCookie(
          "Id"
        )}/announcement/data?announcementId=${announcementId}`
      )
      .then((res) => {
        const announcementData = res.data;
        const fixData = res.data.fix;
        setAnnouncement(announcementData);
        setFixToggle(fixData);
        console.log("fetchEditAnnouncement GET", res);
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          setAuthError(true);
        } else {
          console.log("fetchEditAnnouncement Error", error);
        }
      });
  };

  useEffect(() => {
    fetchEditAnnouncement();
  }, []);

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setAnnouncement({
      ...announcement,
      [name]: value,
    });
  };

  const fixToggleChange = () => {
    setFixToggle(!fixToggle);
  };

  const handleSubmit = () => {
    // 각 항목 유효성 검사

    axiosInstance
      .patch(`/admin/${getCookie("Id")}/announcement`, {
        announcementId: announcementId,
        title: announcement.title,
        content: announcement.content,
        fix: fixToggle,
      })
      .then((response) => {
        console.log("POST Success:", response);

        window.alert("공지사항이 수정되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = (e) => {
    if (
      window.confirm(
        "변경된 사항은 저장되지 않습니다. 정말로 작업을 취소하시겠습니까? "
      )
    ) {
      navigate(-1);
    } else {
    }
  };

  if (authError) {
    return (
      <div>
        <CheckPermissions />
      </div>
    );
  }

  return (
    <div className="EditAddAnnouncement">
      <Container>
        <div>
          <h2>공지사항 수정</h2>
          <div className="box"></div>

          <div>
            {announcement && (
              <table>
                <colgroup>
                  <col style={{ width: 120 }} />
                  <col style={{ width: 1000 }} />
                </colgroup>
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
                        value={announcement.title}
                        onChange={handleChangeState}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td>
                      <textarea
                        name="content"
                        value={announcement.content}
                        onChange={handleChangeState}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="btn">
            <MyButton buttonText={"저장하기"} onClick={handleSubmit} />
            <MyButton buttonText={"취소"} onClick={handleCancel} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditAnnouncement;
