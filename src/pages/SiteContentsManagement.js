import { useState, useEffect } from "react";
import Container from "../components/Container";
import CreateSomething from "../components/CreateSomething.js";
import EditSomething from "../components/EditSomething.js";

const SiteContentsManagement = () => {
  const [getData, setGetData] = useState(null);

  const fetchCategories = () => {
    fetch("http://localhost:8080/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);

        // categoryId의 값으로 정렬
        // 수정하면 가장 마지막으로 데이터베이스에 저장되는 문제를 해결하기 위해
        const sortedData = [...data].sort((a, b) => {
          return a.categoryId - b.categoryId;
        });
        setGetData(sortedData);

        console.log("GET Success:", sortedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="SiteContentsManagement">
      <Container>
        <h3>카테고리 추가하기</h3>
        <div
          style={{
            fontSize: 13,
            border: "1px solid #ccc",
            padding: "30px 50px",
            marginBottom: 30,
          }}
        >
          <span>카테고리를 작성하기 전 </span>
          <strong style={{ fontSize: 27 }}>꼭!! </strong>
          <strong style={{ fontSize: 18 }}> 확인하세요.</strong>
          <div>
            <p>
              <strong style={{ fontSize: 15 }}>
                1. 서브 카테고리를 작성해주세요.
              </strong>
            </p>
            <p>
              메인 카테고리를 작성하고 서브 카테고리를 작성하지 않으면 새 상품을
              등록할 시 카테고리 항목을 선택할 수 없습니다.
            </p>
            <p>
              <strong style={{ fontSize: 15 }}>
                2. 카테고리에 속한 상품이 있다면 삭제되지 않습니다.
              </strong>
            </p>
            <p>
              카테고리를 삭제하고 싶다면 카테고리에 속한 상품을 삭제하셔야
              합니다.
            </p>
            <p>
              <strong style={{ fontSize: 15 }}>
                3. 이미 등록된 상품은 카테고리의 순서 그대로 위치합니다.
              </strong>
            </p>
            <div style={{ marginLeft: 50 }}>
              <div>▶ 변경 전</div>
              <div>메인 - 한식</div>
              <div>
                서브 - 1. <strong>떡볶이</strong>, 2. <strong>비빔밥</strong>,
                3. 불고기
              </div>
              <p></p>
              <div>▶ 변경 후</div>
              <div>메인 - 한식</div>
              <div>
                서브 - 1. <strong>비빔밥</strong>, 2. <strong>떡볶이</strong>,
                3. 불고기
              </div>
              <p>
                {` '떡볶이'(카테고리)에는 비빔밥이 들어있고 '비빔밥'(카테고리)에는 떡볶이가
                들어있음.`}
              </p>
            </div>

            <p>
              예를 들어, 1번 카테고리를 2번 카테고리와 서로 바꿔도 1번
              카테고리에는 이전에 설정한 1번 카테고리에 있는 상품이 그대로
              존재합니다.
            </p>
          </div>
        </div>

        {getData !== null && (
          <>
            <EditSomething
              fetchCategories={fetchCategories}
              getData={getData}
            />
            <strong>상위 카테고리</strong>
          </>
        )}
        <CreateSomething fetchCategories={fetchCategories} />
      </Container>
    </div>
  );
};

export default SiteContentsManagement;
