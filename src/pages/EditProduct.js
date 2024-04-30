import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImgRegistration from "../components/ImgRegisteration";
import CategoryChoose from "../components/CategoryChoose";
import Container from "../components/Container";
import MyButton from "../components/MyButton";

import "../styles/EditProduct.css";

const EditProduct = () => {
  const selectRef = useRef([]);
  const navigate = useNavigate();
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
    main_img: [],
    sub_img: [],
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/item/data?itemId=${itemId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch item details");
        }
        const itemData = await response.json();

        // input 값 초기화 해주기
        setInputValue({
          subcategory: itemData.categoryId,
          name: itemData.name,
          price: itemData.price,
          content: itemData.content,
          discountPrice: itemData.discountPrice,
          discountRate: itemData.discountRate,
          sellPrice: itemData.sellPrice,
          stock: itemData.stock,
          sell: itemData.sell,
          // main_img: itemData.main_img,
          // sub_img: itemData.sub_img,
          main_img: itemData.imgDataDataListResponse,
          sub_img: itemData.serveImgDataResponseList,
        });
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const ChangeInputValue = (e) => {
    const { name, value } = e.target;

    if (
      (name === "price" ||
        name === "discontRate" ||
        name === "sellPrice" ||
        name === "stock") &&
      isNaN(value)
    ) {
      // 입력값이 숫자가 아닌 경우 무시
      return;
    }

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const sellToggle = () => {
    const value = !inputValue.sell;
    setInputValue({ ...inputValue, sell: value });
  };

  const handleMainImageNamesChange = (mainImage) => {
    setInputValue((prevItem) => ({
      ...prevItem,
      main_img: mainImage,
    }));
  };

  return (
    <div className="EditProduct">
      <Container>
        <h2>상품 수정</h2>
        {inputValue && (
          <table>
            <colgroup style={{ width: 200 }} />
            <colgroup style={{ width: 1000 }} />
            <tbody>
              <tr>
                <th>카테고리</th>
                <td>
                  <CategoryChoose
                    selectRef={selectRef}
                    item={inputValue}
                    setItem={setInputValue}
                  />

                  <input
                    name="category"
                    value={inputValue.subcategory}
                    onChange={ChangeInputValue}
                  />
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
                          <div>{`(할인 금액: ${inputValue.discountPrice}원)`}</div>
                        </td>
                      </tr>
                      <tr>
                        <th>할인가</th>
                        <td>
                          <input
                            name="sellPrice"
                            value={inputValue.sellPrice}
                            onChange={ChangeInputValue}
                          />
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

              <tr>
                <th>상품메인 이미지</th>
                <td>
                  <ImgRegistration
                    handleImageChange={handleMainImageNamesChange}
                    mainImgs={inputValue.main_img}
                    setMainImgs={setInputValue}
                  />
                  <p style={{ fontSize: 14 }}>
                    선택하지 않은 이미지는 그 다음 이미지로 순차 저장됩니다.
                  </p>
                </td>
              </tr>

              <tr>
                <th>
                  <div>상품상세 이미지</div>
                  <div>{`(홈페이지 미리보기)`}</div>
                </th>
                <td>
                  <div className="sub_images">
                    {inputValue.sub_img.map((imgData, index) => (
                      <div className="sub_part">
                        <div className="delete">
                          <MyButton buttonText={`${index + 1}번 이미지 삭제`} />
                        </div>
                        <div>
                          <img
                            key={index}
                            src={imgData.fileUrl}
                            alt={`이미지 ${index}`}
                          />
                        </div>
                        <div className="add">
                          <MyButton
                            buttonText={`${index + 1}번 이미지 뒤에 추가`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="stored">
          <div className="btn">
            <MyButton buttonText={"취소"} onClick={() => navigate(-1)} />
          </div>
          <div className="btn">
            <MyButton buttonText={"저장하기"} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditProduct;
