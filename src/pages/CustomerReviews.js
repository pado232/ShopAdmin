import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Pagination from "../components/Pagination";
import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import DateFormat from "../util/DateFormat";
import CreateStars from "../components/CreateStars";

import "../styles/Announcement.css";
import MyButton from "../components/MyButton";

const CustomerReviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemId, setItemId] = useState(location.state?.itemId);
  const [itemName, setItemName] = useState(location.state?.name);
  const [stars, setStars] = useState("");
  const [reviews, setReviews] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchReviewsList = () => {
    const modiItemId = itemId === undefined ? "" : itemId;
    //itemId=${modiItemId}
    axiosInstance
      .get(
        `/admin/reviewList/view?itemId=${modiItemId}&star=${stars}&nowPage=${nowPage}`
      )
      .then((res) => {
        const reviewsListData = res.data.reviewList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        setReviews(reviewsListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);
        console.log("fetchReviewsList GET", res);
      })
      .catch((error) => {
        console.log("fetchReviewsList Error", error);
      });
  };

  useEffect(() => {
    fetchReviewsList();
  }, [itemId, stars]);

  const handleResetItemId = () => {
    setItemId("");
    setItemName("");
  };

  return (
    <div className="Announcement">
      <Container>
        <div>
          <h2 style={{ marginBottom: 40 }}> 고객 리뷰 및 평가 관리</h2>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            {itemId === undefined || itemId === "" ? (
              ""
            ) : (
              <div>
                <div style={{ marginBottom: 20, fontSize: 17 }}>
                  <strong>{itemName}</strong>에 대한 리뷰
                </div>
                <div className="btnbox">
                  <MyButton
                    buttonText={"상품 전체에 대한 리뷰 보기"}
                    onClick={handleResetItemId}
                  />
                  <MyButton
                    buttonText={"상품 수정으로 돌아가기"}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="select_box">
            <div className="select_status">
              <select
                name="stars"
                value={stars}
                onChange={(e) => {
                  setStars(e.target.value);
                  console.log(stars);
                }}
              >
                <option value={""}>전체 별점</option>
                <option value={"5"}>5점</option>
                <option value={"4"}>4점</option>
                <option value={"3"}>3점</option>
                <option value={"2"}>2점</option>
                <option value={"1"}>1점</option>
              </select>
            </div>
          </div>
          <div className="table">
            <table>
              <colgroup>
                <col style={{ width: 50 }} />
                <col style={{ width: 100 }} />
                <col style={{ width: 100 }} />
                <col style={{ width: 300 }} />
                <col style={{ width: 200 }} />

                <col style={{ width: 100 }} />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>고유번호</th>
                  <th>아이디</th>

                  <th>제목 / 내용</th>
                  <th>작성 날짜</th>
                  <th>별점</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.reviewId}</td>
                    <td>{review.loginId}</td>

                    <td>
                      <div className="review">
                        <div className="review_title">{review.title}</div>
                        <div className="review_content"> {review.content}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        [작성 날짜] :
                        <DateFormat dateString={review.createdDate} />
                      </div>
                      <div>
                        [수정 날짜] :
                        <DateFormat dateString={review.lastModifiedDate} />
                      </div>
                    </td>
                    <td>
                      <div className="star_box">
                        <div> {review.star}</div>
                        <div>
                          <CreateStars stars={review.star} />
                        </div>
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

export default CustomerReviews;
