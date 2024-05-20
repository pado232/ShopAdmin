import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BsFillPinAngleFill } from "react-icons/bs";

import DateFormat from "../../util/DateFormat";
import Container from "../Container";
import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

import "../../styles/AnnouncementDetail.css";
import { getCookie } from "../../util/Cookies";

const AnnouncementDetail = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState([]);

  const fetchAnnouncement = () => {
    axiosInstance
      .get(`/admin/announcement/view?announcementId=${announcementId}`)
      .then((res) => {
        const announcementData = res.data;

        setAnnouncement(announcementData);
        console.log("fetchAnnouncement GET", res);
      })
      .catch((error) => {
        console.log("fetchAnnouncement Error", error);
      });
  };

  useEffect(() => {
    fetchAnnouncement();
  }, [announcementId]);

  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axiosInstance
        .delete(
          `/admin/${getCookie(
            "Id"
          )}/announcement?announcementId=${announcementId}`
        )
        .then((res) => {
          const announcementData = res.data;

          setAnnouncement(announcementData);
          console.log("fetchAnnouncement GET", res);
          navigate(-1);
        })
        .catch((error) => {
          console.log("fetchAnnouncement Error", error);
        });
    } else {
    }
  };

  return (
    <div className="AnnouncementDetail">
      <Container>
        <div>
          <h2>공지사항 상세</h2>
          <div className="box">
            <div className="fix">
              {announcement.fix ? (
                <div>
                  <BsFillPinAngleFill size={11 * 2} />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="views">조회수 {announcement.viewCount}</div>
          </div>

          <div>
            {announcement && (
              <table>
                <colgroup style={{ width: 120 }} />
                <colgroup style={{ width: 1000 }} />
                <tbody>
                  <tr>
                    <th>공지사항 번호</th>
                    <td>{announcement.announcementId}</td>
                  </tr>
                  <tr>
                    <th>작성자 아이디</th>
                    <td>{announcement.adminName}</td>
                  </tr>
                  <tr>
                    <th>작성 날짜</th>
                    <td>
                      <div>
                        <DateFormat dateString={announcement.createdDate} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>수정 날짜</th>
                    <td>
                      <div>
                        <DateFormat
                          dateString={announcement.lastModifiedDate}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>제목</th>
                    <td>{announcement.title}</td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td>
                      <div className="content">{announcement.content}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="btn">
            <MyButton
              buttonText={"수정하기"}
              onClick={() =>
                navigate(`/announcement/edit/${announcement.announcementId}`)
              }
            />
            <MyButton buttonText={"삭제하기"} onClick={onRemove} />
            <MyButton
              buttonText={"나가기"}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnnouncementDetail;
