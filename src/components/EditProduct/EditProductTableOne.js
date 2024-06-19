import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

const EditProductTableOne = () => {
  const navigate = useNavigate();

  const { itemId } = useParams();
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState({
    category: "",
    subcategory: "",
    name: "",
    price: "",
    content: "",
    discountPrice: "",
    discountRate: "",
    sellPrice: "",
    stock: "",
    sell: false,
  });

  useEffect(() => {
    // 카테고리 목록을 가져오는 함수
    const fetchCategories = () => {
      axiosInstance
        .get("/admin/category/view")
        .then((response) => {
          const data = response.data;
          const sortedData = [...data].sort(
            (a, b) => a.categoryId - b.categoryId
          );
          setCategories(sortedData);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };

    fetchCategories(); // 페이지 로드 시 카테고리 목록 가져오기
  }, []);

  const fetchItemDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/item/data?itemId=${itemId}`
      );
      const itemData = response.data;

      setInputValue({
        category: "",
        subcategory: itemData.categoryId,
        name: itemData.name,
        price: itemData.price,
        content: itemData.content,
        discountPrice: itemData.discountPrice,
        discountRate: itemData.discountRate,
        sellPrice: itemData.sellPrice,
        stock: itemData.stock,
        sell: itemData.sell,
      });
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  }, [itemId]);

  useEffect(() => {
    fetchItemDetails();
  }, [itemId, fetchItemDetails]);

  const ChangeInputValue = (e) => {
    const { name, value } = e.target;
    // 숫자가 아닌 경우 입력 막기
    if (
      (name === "price" ||
        name === "discountRate" ||
        name === "stock" ||
        name === "sellPrice") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    // 모든 숫자를 지우면 해당 필드에 0 표시
    if (value.trim() === "") {
      setInputValue((prevState) => ({
        ...prevState,
        [name]:
          name === "price" ||
          name === "discountRate" ||
          name === "stock" ||
          name === "sellPrice"
            ? "0"
            : prevState.value,

        discountRate: name === "price" ? "0" : prevState.discountRate,
        discountPrice: name === "price" ? "0" : prevState.discountPrice,
        sellPrice: name === "price" ? "0" : prevState.sellPrice,
      }));
      return;
    }

    // 0으로 시작하는 숫자 입력 방지
    if (value[0] === "0") {
      setInputValue((prevState) => ({
        ...prevState,
        [name]:
          name === "price" ||
          name === "discountRate" ||
          name === "stock" ||
          name === "sellPrice"
            ? value.slice(1)
            : prevState.value,
      }));
      return;
    }

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // 0으로 시작하지 않는 경우에만 값 설정

    // if (name === "discountRate") {
    //   const price = parseFloat(inputValue.price);
    //   const discountRate = parseFloat(value);
    //   const discountPrice = price * (discountRate / 100);
    //   setInputValue({
    //     ...inputValue,
    //     [name]: value,
    //     discountPrice: Math.floor(discountPrice), // 할인가를 내림하여 표시
    //     sellPrice: Math.floor(price - discountPrice), // 할인가를 원가에서 빼고 내림하여 할인가 계산
    //   });
    // } else {
    //   setInputValue({
    //     ...inputValue,
    //     [name]: value,
    //   });
    // }

    setInputValue((prevState) => {
      let updatedState = { ...prevState, [name]: value };
      if (name === "discountRate" || name === "price") {
        const price = parseFloat(name === "price" ? value : prevState.price);
        const discountRate = parseFloat(
          name === "discountRate" ? value : prevState.discountRate
        );
        const discountPrice = price * (discountRate / 100);
        updatedState = {
          ...updatedState,
          discountPrice: Math.floor(discountPrice), // 할인가를 내림하여 표시
          sellPrice: Math.floor(price - discountPrice), // 할인가를 원가에서 빼고 내림하여 할인가 계산
        };
      }
      return updatedState;
    });
  };

  const sellToggle = () => {
    const value = !inputValue.sell;
    setInputValue({ ...inputValue, sell: value });
  };

  const handleSave = () => {
    axiosInstance
      .patch("/admin/item/data", {
        itemId: itemId,
        categoryId: inputValue.subcategory,
        name: inputValue.name,
        content: inputValue.content,
        price: inputValue.price,
        discountRate: inputValue.discountRate,
        discountPrice: inputValue.discountPrice,
        sellPrice: inputValue.sellPrice,
        stock: inputValue.stock,
        sell: inputValue.sell,
      }) // fetch 대신 axios 사용
      .then((response) => {
        console.log("POST Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.alert("작업이 저장되었습니다.");
    // 저장 로직 구현
  };

  const handleCancel = () => {
    if (window.confirm("작업이 취소됩니다.")) {
      fetchItemDetails();
    } else {
    }
  };

  const handleViewReview = () => {
    navigate(`/Reviews`, { state: { itemId, name: inputValue.name } });
  };

  const handleViewQA = () => {
    navigate(`/QandA`, { state: { itemId, name: inputValue.name } });
  };

  return (
    <div>
      {inputValue && (
        <div>
          <div style={{ marginBottom: 40 }}>
            <h3>상품 후기</h3>
            <MyButton
              buttonText={"해당 상품 후기 보기"}
              onClick={handleViewReview}
            />
          </div>
          <div style={{ marginBottom: 40 }}>
            <h3>상품 Q&A</h3>
            <MyButton
              buttonText={"해당 상품 Q&A 보기"}
              onClick={handleViewQA}
            />
          </div>
          <h3>상품 상세정보 수정하기</h3>
          <table>
            <colgroup style={{ width: 200 }} />
            <colgroup style={{ width: 1000 }} />
            <tbody>
              <tr>
                <th>카테고리</th>
                <td>
                  <div>
                    <div>
                      <select
                        name="subcategory"
                        value={inputValue.subcategory} // <select> 요소의 value 속성에 전달되는 값이 문자열이어야 한다
                        onChange={(e) => {
                          setInputValue({
                            ...inputValue,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        {categories.map((category) => (
                          <optgroup
                            label={category.name}
                            key={category.categoryId}
                          >
                            {category.child.map((subcategory, index) => (
                              <option
                                key={index}
                                value={subcategory.categoryId}
                              >
                                {subcategory.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>상품명</th>
                <td>
                  <input
                    name="name"
                    value={inputValue.name}
                    onChange={ChangeInputValue}
                  />
                </td>
              </tr>
              <tr>
                <th>가격</th>
                <td>
                  <table className="sub">
                    <colgroup style={{ width: 90 }} />
                    <colgroup style={{ width: 500 }} />
                    <tbody>
                      <tr>
                        <th>원가</th>
                        <td>
                          <input
                            name="price"
                            value={inputValue.price}
                            onChange={ChangeInputValue}
                          />
                          원
                        </td>
                      </tr>
                      <tr>
                        <th>할인률</th>
                        <td>
                          <input
                            name="discountRate"
                            value={inputValue.discountRate}
                            onChange={ChangeInputValue}
                          />
                          %
                          <div>{`(할인 금액: ${inputValue.discountPrice}원)`}</div>
                        </td>
                      </tr>
                      <tr>
                        <th>할인가</th>
                        <td>
                          <div>{inputValue.sellPrice}원</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>상품 설명</th>
                <td>
                  <textarea
                    name="content"
                    value={inputValue.content}
                    onChange={ChangeInputValue}
                  />
                </td>
              </tr>
              <tr>
                <th>재고</th>
                <td>
                  <input
                    name="stock"
                    value={inputValue.stock}
                    onChange={ChangeInputValue}
                  />
                </td>
              </tr>
              <tr>
                <th>판매 현황</th>
                <td>
                  <div>
                    {inputValue.sell ? (
                      <div className="sell_state">
                        <div className="state">판매 중</div>
                        <div>
                          <MyButton
                            buttonText={"판매 중지하기"}
                            onClick={sellToggle}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="sell_state">
                        <div className="state">판매 중지</div>
                        <div>
                          <MyButton
                            buttonText={"판매 하기"}
                            onClick={sellToggle}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="stored">
        <div className="btn">
          <MyButton buttonText={"취소"} onClick={handleCancel} />
        </div>
        <div className="btn">
          <MyButton buttonText={"저장하기"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditProductTableOne;
