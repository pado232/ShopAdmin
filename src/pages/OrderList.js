import Container from "../components/Container";

const OrderList = () => {
  return (
    <div className="OrderList">
      <Container>
        <h2>주문내역 조회 목록</h2>
        <div className="select_box">
          <select>
            <option>결제 준비</option>
            <option>결제 완료</option>
            <option>배송 준비</option>
            <option>배송 중</option>
            <option>배송 완료</option>
            <option>결제 취소</option>
            <option>환불 요청</option>
            <option>환불 완료</option>
            <option>구매 확정</option>
          </select>
        </div>

        <div className="table">
          <table>
            <thead>
              <th>번호</th>
              <th>주문번호</th>
              <th>주문날짜</th>
              <th>배송지</th>
              <th>주문자</th>
              <th>주문자 전화번호</th>
              <th>구매가격</th>
              <th>주문상태</th>
              <th>주문 상세</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2018230131</td>
                <td>2024.04.01.</td>
                <td>대전광역시 유성구 원신흥동, 어쩌구 아파트 101동 908호</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>39200</td>
                <td>배송 중</td>
                <td>
                  <button>상세보기</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div> </div>
      </Container>
    </div>
  );
};
export default OrderList;
