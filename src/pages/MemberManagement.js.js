import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";

import Container from "../components/Container";
import Pagination from "../components/Pagination";
import MyButton from "../components/MyButton";

import "../styles/ItemList.css";
import DateFormat from "../util/DateFormat";

const MemberManagement = () => {
  const navigate = useNavigate();

  const [memberList, setMemberList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);

  const [loginId, setLoginId] = useState("");
  const [isDelete, setIsDelete] = useState("");
  const [memberSort, setMemberSort] = useState("");
  const [gradeId, setGradeId] = useState("");

  const fetchMemberList = () => {
    const queryParams = new URLSearchParams({
      memberSort: memberSort,
      loginId: loginId,
      gradeId: gradeId,
      isDelete: isDelete,
      nowPage,
    });

    axiosInstance
      .get(`/admin/memberList/view?${queryParams.toString()}`) // axios로 변경
      .then((response) => {
        const data = response.data;
        setMemberList(data.memberList);
        setTotalPage(data.totalPage);
        setNowPage(data.nowPage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchMemberList();
  }, [nowPage, isDelete, memberSort, gradeId]);

  const handleSearchSubmit = () => {
    console.log("아이디:", loginId);

    fetchMemberList();
  };

  const handleSearchCancelSubmit = () => {
    setLoginId("");
    console.log("아이디:", loginId);
    fetchMemberList();
  };
  useEffect(() => {
    if (loginId === "") {
      console.log("아이디가 초기화되었습니다.");
      fetchMemberList();
    }
  }, [loginId]);

  return (
    <div className="ItemList">
      <Container>
        <h2>회원 목록 조회</h2>
        <div className="select_box">
          <div className="select_sort">
            <select
              name="sort"
              value={memberSort}
              onChange={(e) => setMemberSort(e.target.value)}
            >
              <option value="day">가입일순</option>
              <option value="totalPay">금년 구매총액순 </option>
            </select>
          </div>

          <div className="select_delete">
            <select
              name="delete"
              value={isDelete}
              onChange={(e) => {
                setIsDelete(e.target.value);
                console.log(isDelete);
              }}
            >
              <option value={""}>계정 전체</option>
              <option value={"false"}>사용 계정</option>
              <option value={"true"}>탈퇴 계정</option>
            </select>
          </div>

          <div className="select_delete">
            <select
              name="delete"
              value={gradeId}
              onChange={(e) => {
                setGradeId(e.target.value);
                console.log(gradeId);
              }}
            >
              <option value={""}>등급 전체</option>
              <option value={"5"}>VVIP</option>
              <option value={"4"}>VIP</option>
              <option value={"3"}>GOLD</option>
              <option value={"2"}>SILVER</option>
              <option value={"1"}>BRONZE</option>
            </select>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="아이디 검색"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <button onClick={handleSearchSubmit}>검색</button>
            <button onClick={handleSearchCancelSubmit}>취소</button>
          </div>
        </div>

        <div className="table">
          <table>
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 150 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 150 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 100 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>회원번호</th>
                <th>등급</th>
                <th>등급별 구매금액</th>
                <th>할인률</th>
                <th>아이디</th>
                <th>이름</th>
                <th>계정 여부</th>
                <th>가입일</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.memberId}</td>
                  <td>{member.grade.gradeName}</td>
                  <td>{member.grade.gradePrice.toLocaleString()}</td>
                  <td>{member.grade.rewardRate}%</td>
                  <td>{member.loginId}</td>
                  <td>{member.name}</td>
                  <td>{member.delete ? "탈퇴" : "사용중"}</td>
                  <td>
                    <DateFormat dateString={member.createdDate} />
                  </td>
                  <td>
                    <div className="btnbox">
                      <div>
                        <MyButton
                          buttonText={"상세보기"}
                          onClick={() => navigate(`/member/${member.memberId}`)} // 프로그래밍 방식 라우팅
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default MemberManagement;
