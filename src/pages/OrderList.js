import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import Pagination from "../components/Pagination";
import DateFormat from "../util/DateFormat";

import { AiFillHome } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";

import "../styles/OrderList.css";

const OrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);

  const [itemName, setItemName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [merchantUid, setMerchantUid] = useState(""); // 주문 고유번호

  const [selectedDuration, setSelectedDuration] = useState("36");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 3))
      .toISOString()
      .split("T")[0]
  ); // 기간별 주문 검색을 위한 시작점과 끝점
  const [lastDate, setLastDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState("");

  const fetchOrderList = () => {
    const queryParams = new URLSearchParams({
      itemName: itemName,
      loginId: loginId,
      merchantUid: merchantUid,
      startDate: startDate,
      lastDate: lastDate,
      status: status,
      nowPage: nowPage,
    });

    const url = `/admin/orderList/view?${queryParams.toString()}`;
    console.log("Request URL:", url);

    axiosInstance
      .get(url)
      .then((response) => {
        const data = response.data;
        const orderListData = data.orderList; // 주문 목록 데이터
        const totalPageData = data.totalPage;
        const nowPageData = data.nowPage;

        setOrderList(orderListData);
        setTotalPage(totalPageData);
        setNowPage(nowPageData);

        console.log("orderList GET ", response);
      })
      .catch((error) => {
        console.error("orderList GET Error:", error);
      });
  };
  useEffect(() => {
    fetchOrderList();
  }, [status, nowPage, startDate]);

  const durationOptions = [
    { value: "1", label: "1개월" },
    { value: "2", label: "2개월" },
    { value: "3", label: "3개월" },
    { value: "6", label: "6개월" },
    { value: "36", label: "전체" },
  ];

  const handleDurationChange = (e) => {
    const duration = e.target.value;
    setSelectedDuration(duration);

    // 시작 날짜를 오늘로 설정
    const today = new Date();
    setLastDate(today.toISOString().split("T")[0]);

    // 끝 날짜를 계산
    const lastDate = new Date(today);
    lastDate.setMonth(lastDate.getMonth() - parseInt(duration));
    setStartDate(lastDate.toISOString().split("T")[0]);
  };

  const handlePeriodSubmit = () => {
    // 서버에 startDate와 endDate를 전달하면 됩니다.
    console.log("시작 날짜:", startDate);
    console.log("끝 날짜:", lastDate);

    fetchOrderList();
  };

  const handleSearchSubmit = () => {
    // 서버에 startDate와 endDate를 전달하면 됩니다.
    console.log("상품명:", itemName);
    console.log("아이디:", loginId);
    console.log("주문 고유번호:", merchantUid);

    fetchOrderList();

    setItemName("");
    setLoginId("");
    setMerchantUid("");
  };

  const handleSearchCancelSubmit = () => {
    // 서버에 startDate와 endDate를 전달하면 됩니다.
    setItemName("");
    setLoginId("");
    setMerchantUid("");

    console.log("상품명:", itemName);
    console.log("아이디:", loginId);
    console.log("주문 고유번호:", merchantUid);

    fetchOrderList();
  };

  return (
    <div className="OrderList">
      <Container>
        <h2>주문내역 조회 목록</h2>
        <div className="select_box">
          <div className="select_status">
            <select
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                console.log(status);
              }}
            >
              <option value={""}>전체 상태</option>
              <option value={"결제준비"}>결제 준비</option>
              <option value={"결제완료"}>결제 완료</option>
              <option value={"배송준비"}>배송 준비</option>
              <option value={"배송중"}>배송 중</option>
              <option value={"배송완료"}>배송 완료</option>
              <option value={"결제취소"}>결제 취소</option>
              <option value={"환불요청"}>환불 요청</option>
              <option value={"환불완료"}>환불 완료</option>
              <option value={"구매확정"}>구매 확정</option>
            </select>
          </div>

          <div className="radio">
            {durationOptions.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={`duration_${option.value}`}
                  name="duration"
                  value={option.value}
                  checked={selectedDuration === option.value}
                  onChange={handleDurationChange}
                />
                <label htmlFor={`duration_${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
            <button onClick={handlePeriodSubmit}>검색</button>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="상품명 검색"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <input
              type="text"
              placeholder="아이디 검색"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />

            <input
              type="text"
              placeholder="주문 고유번호 검색"
              value={merchantUid}
              onChange={(e) => setMerchantUid(e.target.value)}
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
                <th>주문번호/고유번호</th>
                <th>주문 상품 내용</th>
                <th>배송정보</th>
                <th>구매 가격</th>
                <th>주문상태</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{order.orderId}</div>
                    <div>{order.merchantUid}</div>
                  </td>
                  <td className="uncenter">
                    <div className="orderitem">
                      {order.orderDetails.map((detail, index) => (
                        <div className="item_box" key={index}>
                          <div className="img">
                            <img src={detail.item.mainImg} alt="메인이미지" />
                          </div>

                          <div className="number">
                            <div>[주문 N] : {detail.orderDetailId}</div>

                            <div>[상품 N] : {detail.item.itemId}</div>
                            <div>[상품명] : {detail.item.name}</div>

                            <div className="price">
                              <span>[단가] :</span>
                              <span style={{ textDecoration: "line-through" }}>
                                {detail.price.toLocaleString()}
                              </span>
                              <span>{detail.discountRate}%</span>
                              <span>
                                {`(-${detail.discountPrice.toLocaleString()})`}
                              </span>
                              <span>{detail.sellPrice.toLocaleString()}</span>
                            </div>

                            <div>[수량] : {detail.itemCount}개 </div>
                            <div>
                              [합계] : {detail.totalPrice.toLocaleString()}
                            </div>
                            {/* <div>---------아이템 정보 ------------</div>
                            <div>할인률:{detail.item.discountRate}</div>
                            <div>
                              {detail.item.discountPrice.toLocaleString()}
                            </div>
                            <div>{detail.item.sellPrice.toLocaleString()}</div>
                            <div>{detail.item.sell.toLocaleString()}</div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="ordertime">
                      <DateFormat dateString={order.orderedDate} />
                    </div>
                  </td>
                  <td className="uncenter">
                    <div className="delivery">
                      <div>
                        <AiFillHome className="icon" />
                        {order.detAddress}
                      </div>
                      <div>
                        <CiMemoPad className="icon" />
                        {order.requestText}
                      </div>
                      <div>
                        <BsFillTelephoneFill className="icon" />
                        {order.tel}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{order.buyPrice.toLocaleString()}</div>
                  </td>
                  <td>{order.status}</td>
                  <td>
                    <div className="btnbox">
                      <MyButton
                        buttonText={"상세보기"}
                        onClick={() =>
                          navigate(`/orderproduct/${order.orderId}`)
                        }
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
export default OrderList;
