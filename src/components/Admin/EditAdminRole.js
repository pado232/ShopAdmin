import { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

import "../../styles/EditOrderStatus.css";
const EditAdminRole = ({ adminId, onChangeRole }) => {
  const [roles, setRoles] = useState("");

  const fetchEditAdminRole = () => {
    axiosInstance
      .patch(`/admin/admin/roles`, {
        adminId: adminId,
        roles: roles,
      })
      .then((response) => {
        console.log("EditAdminRole PATCH ", response);
        onChangeRole();
        window.alert("권한(담당)이 변경되었습니다.");
      })
      .catch((error) => {
        console.error("EditAdminRole PATCH Error:", error);
      });
  };

  const handleSubmit = () => {
    console.log(adminId);
    console.log(roles);

    fetchEditAdminRole();
  };

  return (
    <div className="EditOrderStatus">
      <div> 담당(권한) 변경하기 :</div>
      <div className="select_status">
        <select
          name="roles"
          value={roles}
          onChange={(e) => {
            setRoles(e.target.value);
            console.log(roles);
          }}
          style={{ width: 210 }}
        >
          <option value={"ROLE_ADMIN"}>ROLE_ADMIN</option>
          <option value={"ROLE_CUSTOMER"}>ROLE_CUSTOMER</option>
          <option value={"ROLE_OPERATOR"}>ROLE_OPERATOR</option>
          <option value={"ROLE_REPRESENTATIVE"}>ROLE_REPRESENTATIVE</option>
        </select>
      </div>
      <div>
        <MyButton buttonText={`선택 완료`} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditAdminRole;
