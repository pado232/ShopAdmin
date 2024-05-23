import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import Container from "../Container";
import MyButton from "../MyButton";

import "../../styles/OrderProduct.css";
import EditAdminRole from "./EditAdminRole";

const AdminDetails = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const [adminDetails, setAdminDetails] = useState({
    adminId: "",
    loginId: "",
    email: "",
    name: 0,
    roles: "",
  });

  const fetchAdminDetails = () => {
    axiosInstance
      .get(`/admin/admin?adminId=${adminId}`)
      .then((res) => {
        const admindata = res.data;

        setAdminDetails(admindata);

        console.log("AdminDetails GET ", res);
      })
      .catch((error) => {
        console.error("AdminDetails GET Error:", error);
      });
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const onChangeRole = () => {
    fetchAdminDetails();
  };

  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axiosInstance
        .patch(`/admin/admin`, {
          adminId: adminId,
        })
        .then((res) => {
          console.log("AdminDetails DELETE", res);
          navigate(-1);
        })
        .catch((error) => {
          console.log("AdminDetails DELETE Error", error);
        });
    } else {
    }
  };

  return (
    <div className="OrderProduct">
      <Container>
        <h2>직원 상세 보기</h2>
        {adminDetails && (
          <table>
            <colgroup>
              <col style={{ width: 120 }} />
              <col style={{ width: 1000 }} />
            </colgroup>
            <tbody>
              <tr>
                <th>직원 번호</th>
                <td>{adminDetails.adminId}</td>
              </tr>
              <tr>
                <th>아이디</th>
                <td>{adminDetails.loginId}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{adminDetails.email}</td>
              </tr>
              <tr>
                <th>이름</th>
                <td>{adminDetails.name}</td>
              </tr>
              <tr>
                <th>담당 (권한)</th>
                <td>
                  <div style={{ padding: 10 }}>{adminDetails.roles}</div>
                  <div>
                    <EditAdminRole
                      adminId={adminId}
                      onChangeRole={onChangeRole}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="btn">
          <MyButton buttonText={"삭제하기"} onClick={onRemove} />
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

export default AdminDetails;
