import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import MyButton from "./MyButton";

import "../styles/EditOrderStatus.css";
const EditOrderStatus = ({ orderStatus, orderId, onStatusChange }) => {
  const [status, setStatus] = useState(orderStatus);
  const [cancelText, setCancelText] = useState("");

  useEffect(() => {
    setStatus(orderStatus);
  }, [orderStatus]);

  const fetchEditOrderStatus = () => {
    axiosInstance
      .patch(`/admin/order`, {
        orderId: orderId,
        status: status,
      })
      .then((response) => {
        console.log("fetchEditOrderStatus PATCH ", response);
        onStatusChange(status);
        window.alert("주문 상태가 변경되었습니다.");
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("주문 상태를 변경할 권한이 없습니다.");
          setStatus(orderStatus);
        } else {
          console.error("fetchEditOrderStatus PATCH Error:", error);
        }
      });
  };

  const fetchEditOrderStatusCancel = () => {
    axiosInstance
      .patch(`/admin/order/cancel`, {
        orderId: orderId,
        reasonText: cancelText,
      })
      .then((response) => {
        console.log("fetchEditOrderStatus PATCH ", response);
        onStatusChange(status);
        window.alert("결제가 취소 되었습니다.");
      })
      .catch((error) => {
        console.error("fetchEditOrderStatus PATCH Error:", error);
      });
  };

  const handleSubmit = () => {
    console.log(orderId);
    console.log(orderStatus);
    console.log(status);

    if (status === "결제취소") {
      fetchEditOrderStatusCancel();
    } else {
      fetchEditOrderStatus();
    }
  };

  return (
    <div className="EditOrderStatus">
      <div>주문 상태 변경하기 :</div>
      <div className="select_status">
        <select
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            console.log(status);
          }}
        >
          {orderStatus === "결제준비" || orderStatus === "결제완료" ? (
            <option value={"결제취소"}>결제 취소</option>
          ) : null}
          <option value={"배송준비"}>배송 준비</option>
          <option value={"배송중"}>배송 중</option>
          <option value={"배송완료"}>배송 완료</option>

          {orderStatus === "환불요청" ? (
            <option value={"환불완료"}>결제 취소</option>
          ) : null}
        </select>
      </div>
      {status === "결제취소" ? (
        <div>
          <textarea
            placeholder="결제 취소 사유를 작성하세요."
            value={cancelText}
            onChange={(e) => {
              setCancelText(e.target.value);
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div>
        <MyButton buttonText={`선택 완료`} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditOrderStatus;
