import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import DateFormat from "../util/DateFormat";
import { BsFillPinAngleFill } from "react-icons/bs";

import "../styles/Announcement.css";

const Announcement = () => {
  const navigate = useNavigate();
  const [announcementList, setAnnouncementList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchAnnouncementList = () => {
    axiosInstance
      .get(`/admin/announcementList/view?nowPage=${nowPage}`)
      .then((res) => {
        const announcementListData = res.data.announcementList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        setAnnouncementList(announcementListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);
        console.log("fetchAnnouncementList GET", res);
      })
      .catch((error) => {
        console.log("fetchAnnouncementList Error", error);
      });
  };

  useEffect(() => {
    fetchAnnouncementList();
  }, []);

  return (
    <div className="Announcement">
      <Container>
        <div>
          <h2>공지사항 조회 목록</h2>

          <div className="write_btn">
            <MyButton
              buttonText={"공지사항 작성하기"}
              onClick={() => navigate(`/myannouncement/write`)}
            />
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>고정</th>
                  <th>번호</th>
                  <th>고유번호</th>
                  <th>관리자 이름</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>조회수</th>
                  <th>작성 날짜</th>
                  <th>상세 보기</th>
                </tr>
              </thead>
              <tbody>
                {announcementList.map((announce, index) => (
                  <tr key={index}>
                    <td>
                      {announce.fix.toLocaleString() === "true" ? (
                        <div>
                          <BsFillPinAngleFill />
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{index + 1}</td>
                    <td>{announce.announcementId}</td>
                    <td>{announce.adminName}</td>
                    <td>{announce.title}</td>
                    <td>
                      {announce.content.length > 20
                        ? announce.content.slice(0, 20) + "..."
                        : announce.content}
                    </td>

                    <td>{announce.viewCount}</td>
                    <td>
                      <div>
                        [작성 날짜] :
                        <DateFormat dateString={announce.createdDate} />
                      </div>
                      <div>
                        [수정 날짜] :
                        <DateFormat dateString={announce.lastModifiedDate} />
                      </div>
                    </td>

                    <td>
                      <div className="btnbox">
                        <MyButton
                          buttonText={"상세보기"}
                          onClick={() =>
                            navigate(`/announcement/${announce.announcementId}`)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination">
          <Pagination
            setNowPage={setNowPage}
            nowPage={nowPage}
            totalPage={totalPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default Announcement;
