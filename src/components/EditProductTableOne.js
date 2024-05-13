import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
import CategoryChoose from "../components/CategoryChoose";
import MyButton from "../components/MyButton";
import CategoryChooseEdit from "../components/CategoryChooseEdit";

const EditProductTableOne = () => {
  const selectRef = useRef([]);

  const { itemId } = useParams();
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

    if (
      (name === "price" || name === "discountRate" || name === "stock") &&
      isNaN(value)
    ) {
      // 입력값이 숫자가 아닌 경우 무시
      return;
    }

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

    window.confirm("수정된 상세정보가 저장되었습니다.");
    // 저장 로직 구현
  };

  const handleCancel = () => {
    fetchItemDetails(); // 취소 버튼 클릭 시 서버에서 아이템 데이터를 다시 불러옴
  };

  return (
    <div className="EditProduct">
      {inputValue && (
        <table>
          <colgroup style={{ width: 200 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>카테고리</th>
              <td>
                <div>
                  <CategoryChooseEdit
                    selectRef={selectRef}
                    item={inputValue}
                    setItem={setInputValue}
                  />
                  <CategoryChoose
                    selectRef={selectRef}
                    item={inputValue}
                    setItem={setInputValue}
                  />
                </div>

                {/* <input
                    name="category"
                    value={inputValue.subcategory}
                    onChange={ChangeInputValue}
                  /> */}
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
                        <div style={{ color: "red" }}>
                          할인금액이 서버로부터 변동이되지 않고 들어오는 듯
                        </div>
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
