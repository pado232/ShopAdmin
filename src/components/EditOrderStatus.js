import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import MyButton from "./MyButton";

import "../styles/EditOrderStatus.css";

const statusOptions = {
  결제완료: ["배송준비", "배송중", "배송완료", "결제취소"],
  배송준비: ["결제완료", "배송중", "배송완료", "결제취소"],
  배송중: ["결제완료", "배송준비", "배송완료", "결제취소"],
  배송완료: ["결제완료", "배송준비", "배송중", "결제취소", "환불완료"],
  환불완료: [],
  결제취소: [],
  환불요청: ["환불완료"],
  구매확정: [],
};

const EditOrderStatus = ({
  orderStatus,
  orderId,
  onStatusChange,
  costomerReasonText,
}) => {
  const [status, setStatus] = useState("");
  const [reasonText, setReasonText] = useState(costomerReasonText);

  useEffect(() => {
    if (orderStatus && statusOptions[orderStatus]) {
      setStatus(statusOptions[orderStatus][0]);
    }
  }, [orderStatus]);

  useEffect(() => {
    setReasonText(costomerReasonText);
  }, [costomerReasonText]);

  console.log("orderStatus 주문 상태 - ", orderStatus);
  console.log("status 주문 상태 - ", status);

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

  const fetchEditOrderStatusRefund = () => {
    axiosInstance
      .post(`/admin/order/refund`, {
        orderId: orderId,
        reasonText: reasonText,
      })
      .then((response) => {
        console.log("fetchEditOrderStatusRefund PATCH ", response);
        onStatusChange(status);
        window.alert("주문 상태가 변경되었습니다.");
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("주문 상태를 변경할 권한이 없습니다.");
          setStatus(orderStatus);
        } else {
          console.error("fetchEditOrderStatusRefund PATCH Error:", error);
        }
      });
  };

  const fetchEditOrderStatusCancel = () => {
    axiosInstance
      .post(`/admin/order/cancel`, {
        orderId: orderId,
        reasonText: "관리자 측에서 결제를 취소하였습니다.",
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

    switch (status) {
      case "결제취소":
        fetchEditOrderStatusCancel();
        break;
      case "환불완료":
        fetchEditOrderStatusRefund();
        break;
      default:
        fetchEditOrderStatus();
        break;
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
          style={{ width: 200 }}
        >
          {statusOptions[orderStatus]?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <MyButton buttonText={`선택 완료`} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditOrderStatus;
