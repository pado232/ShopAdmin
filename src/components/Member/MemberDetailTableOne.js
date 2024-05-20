import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DateFormat from "../../util/DateFormat";
import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

import "../../styles/AnnouncementDetail.css";

const MemberDetailTableOne = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [memberDetails, setMemberDetails] = useState([]);

  const fetchMemberDetails = () => {
    axiosInstance
      .get(`/admin/member/view?memberId=${memberId}`)
      .then((res) => {
        const memberDtailsData = res.data;

        setMemberDetails(memberDtailsData);
        console.log("fetchMemberDetails GET", res);
      })
      .catch((error) => {
        console.log("fetchMemberDetails Error", error);
      });
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  return (
    <div className="AnnouncementDetail">
      <div>
        <h2>회원 상세 정보</h2>
        <div>
          {memberDetails && (
            <table>
              <colgroup style={{ width: 130 }} />
              <colgroup style={{ width: 1000 }} />
              <tbody>
                <tr>
                  <th>회원 번호</th>
                  <td>{memberDetails.memberId}</td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td>
                    <div style={{ padding: 5 }}>
                      {memberDetails.grade.gradeName}
                    </div>
                    <div>
                      [해당 등급 연간 달성 금액] :{" "}
                      {memberDetails.grade.gradePrice.toLocaleString()} 원
                    </div>
                    <div>[적립률] : {memberDetails.grade.rewardRate} %</div>
                  </td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>{memberDetails.loginId}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{memberDetails.email}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{memberDetails.name}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{memberDetails.tel}</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>{memberDetails.gender}</td>
                </tr>
                <tr>
                  <th>보유 적립금</th>
                  <td>
                    {memberDetails.point
                      ? memberDetails.point.toLocaleString()
                      : ""}{" "}
                    P
                  </td>
                </tr>
                <tr>
                  <th>계정 여부</th>
                  <td>{memberDetails.delete ? "탈퇴" : "사용중"}</td>
                </tr>
                <tr>
                  <th>최근 접속일</th>
                  <td>
                    <div>
                      <DateFormat dateString={memberDetails.recentlyLogin} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>가입일</th>
                  <td>
                    <div>
                      <DateFormat dateString={memberDetails.createdDate} />
                    </div>
                  </td>
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
      </div>
    </div>
  );
};

export default MemberDetailTableOne;
