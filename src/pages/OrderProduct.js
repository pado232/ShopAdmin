import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import DateFormat from "../util/DateFormat";

import "../styles/OrderProduct.css";
import EditOrderStatus from "../components/EditOrderStatus";
const OrderProduct = () => {
  const { orderId } = useParams();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [usePoint, setUsePoint] = useState("");
  const [getPoint, setGetPoint] = useState("");
  const [order, setOrder] = useState({
    orderId: "",
    loginId: "",
    orderedDate: "",
    buyPrice: 0,
    mainAddress: "",
    detAddress: "",
    requestText: "",
    tel: "",
    status: "",
    merchantUid: "",
    orderDetails: [],
    totalPrice: "",
    totalDiscountPrice: "",
    usePoint: "",
    getPoint: "",
  });

  const fetchOrderProduct = () => {
    axiosInstance
      .get(`/admin/order/view?orderId=${orderId}`)
      .then((response) => {
        const data = response.data;
        const orderData = data.order; // 주문 목록 데이터
        const totalDiscountPriceData = data.totalDiscountPrice;
        const totalPriceData = data.totalPrice;
        const usePointData = data.usePoint;
        const getPointData = data.getPoint;

        setOrder(orderData);
        setTotalDiscountPrice(totalDiscountPriceData);
        setTotalPrice(totalPriceData);
        setUsePoint(usePointData);
        setGetPoint(getPointData);

        console.log("orderProduct GET ", response);
      })
      .catch((error) => {
        console.error("orderProduct GET Error:", error);
      });
  };

  useEffect(() => {
    fetchOrderProduct();
  }, []);

  const handleStatusChange = (newStatus) => {
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
  };

  return (
    <div className="OrderProduct">
      <Container>
        <h2>주문 상세 보기</h2>
        {order && (
          <table>
            <colgroup style={{ width: 120 }} />
            <colgroup style={{ width: 1000 }} />
            <tbody>
              <tr>
                <th>상품 아이디</th>
                <td>{order.orderId}</td>
              </tr>
              <tr>
                <th>로그인 아이디</th>
                <td>{order.loginId}</td>
              </tr>
              <tr>
                <th>주문 날짜</th>
                <td>
                  <DateFormat dateString={order.orderedDate} />
                </td>
              </tr>
              <tr>
                <th>구매 가격</th>
                <td>{order.buyPrice.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{order.mainAddress}</td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>{order.detAddress}</td>
              </tr>
              <tr>
                <th>요청 사항</th>
                <td>{order.requestText}</td>
              </tr>
              <tr>
                <th>주문 상태</th>
                <td>
                  <div style={{ padding: 10 }}>{order.status}</div>
                  {order?.reasonText && (
                    <div className="cancel_reason">
                      <strong>{order.status} 사유 : </strong>{" "}
                      {order?.reasonText}
                    </div>
                  )}

                  {/* <div className="cancel_reason">
                    {order.status} 사유 : {order?.reasonText}
                  </div> */}

                  {order.status === "결제취소" ||
                  order.status === "환불완료" ||
                  order.status === "구매확정" ? (
                    ""
                  ) : (
                    <div>
                      <EditOrderStatus
                        orderStatus={order.status}
                        orderId={order.orderId}
                        onStatusChange={handleStatusChange}
                        costomerReasonText={order.reasonText}
                      />
                    </div>
                  )}
                  {/* <div style={{ padding: 10 }}>{order.status}</div>
                  <div>
                    <EditOrderStatus
                      orderStatus={order.status}
                      orderId={order.orderId}
                      onStatusChange={handleStatusChange}
                    />
                  </div> */}
                </td>
              </tr>
              <tr>
                <th>주문 고유 번호</th>

                <td>{order.merchantUid}</td>
              </tr>
              <tr>
                <th>주문 상세 내역</th>
                <td>
                  <table className="sub_table">
                    <colgroup>
                      <col style={{ width: 100 }} />
                      <col style={{ width: 80 }} />
                      <col style={{ width: 100 }} />
                      <col style={{ width: 250 }} />
                      <col style={{ width: 80 }} />
                      <col style={{ width: 130 }} />
                      <col style={{ width: 80 }} />
                      <col style={{ width: 80 }} />
                      <col style={{ width: 80 }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>상품 아이디</th>
                        <th>판매 현황</th>
                        <th>대표 이미지</th>
                        <th>상품 이름</th>
                        <th>가격</th>
                        <th>할인율 (할인 금액)</th>
                        <th>판매 가격</th>
                        <th>수량</th>
                        <th>총 가격</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderDetails.map((detail, index) => (
                        <tr key={index}>
                          <td>{detail.item.itemId}</td>
                          <td>{detail.item.sell ? "판매 중" : "판매 중지"}</td>
                          <td>
                            <div>
                              <img
                                src={detail.item.mainImg}
                                alt="주문 상세 - 대표 이미지 "
                              />
                            </div>
                          </td>
                          <td>{detail.item.name}</td>
                          <td>{detail.item.price.toLocaleString()}</td>
                          <td>{`${
                            detail.item.discountRate
                          }% (-${detail.item.discountPrice.toLocaleString()})`}</td>
                          <td>{detail.item.sellPrice.toLocaleString()}</td>
                          <td>{detail.itemCount}</td>
                          <td>{detail.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>구매 총액</th>
                <td>{totalPrice.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>할인 총액</th>
                <td>{totalDiscountPrice.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>사용 포인트</th>
                <td>{usePoint.toLocaleString()} P</td>
              </tr>
              <tr>
                <th>적립 포인트</th>
                <td>{getPoint.toLocaleString()} P</td>
              </tr>
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
};

export default OrderProduct;
