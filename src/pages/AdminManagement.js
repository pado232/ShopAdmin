import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import Pagination from "../components/Pagination";

import "../styles/OrderList.css";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);

  const [adminName, setAdminName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [roles, setRoles] = useState("");

  const fetchAdminList = () => {
    const queryParams = new URLSearchParams({
      loginId: loginId,
      name: adminName,
      roles: roles,
      nowPage: nowPage,
    });

    console.log("Request URL:", queryParams.toString());

    axiosInstance
      .get(`/admin/adminList?${queryParams.toString()}`)
      .then((response) => {
        const data = response.data;
        const adminListData = data.adminList; // 주문 목록 데이터
        const totalPageData = data.totalPage;
        const nowPageData = data.nowPage;

        setAdminList(adminListData);
        setTotalPage(totalPageData);
        setNowPage(nowPageData);

        console.log("adminList GET ", response);
      })
      .catch((error) => {
        console.error("adminList GET Error:", error);
      });
  };

  useEffect(() => {
    fetchAdminList();
  }, [roles, nowPage]);

  const handleSearchSubmit = () => {
    console.log("이름:", adminName);
    console.log("아이디:", loginId);

    fetchAdminList();
  };

  const handleSearchCancelSubmit = () => {
    setAdminName("");
    setLoginId("");

    console.log("이름:", adminName);
    console.log("아이디:", loginId);

    fetchAdminList();
  };

  return (
    <div className="OrderList">
      <Container>
        <h2>직원 조회 목록</h2>
        <div className="select_box">
          <div
            className="select_status"
            style={{ marginRight: 300, width: "15%" }}
          >
            <select
              name="roles"
              value={roles}
              onChange={(e) => {
                setRoles(e.target.value);
                console.log(roles);
              }}
            >
              <option value={""}>담당 전체</option>
              <option value={"ROLE_ADMIN"}>ADMIN</option>
              <option value={"ROLE_CUSTOMER"}>CUSTOMER</option>
              <option value={"ROLE_OPERATOR"}>OPERATOR</option>
              <option value={"ROLE_REPRESENTATIVE"}>REPRESENTATIVE</option>
            </select>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="이름 검색"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />

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
            <thead>
              <tr>
                <th>번호</th>
                <th>직원 번호</th>
                <th>이름</th>
                <th>담당 (권한)</th>
                <th>아이디</th>
                <th>이메일</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.adminId}</td>
                  <td>{admin.name}</td>
                  <td>{admin.roles}</td>
                  <td>{admin.loginId}</td>
                  <td>{admin.email}</td>
                  <td>
                    <div className="btnbox">
                      <MyButton
                        buttonText={"상세보기"}
                        onClick={() => navigate(`/admin/${admin.adminId}`)}
                      />
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
export default AdminManagement;
