import { useRef, useState } from "react";
import axiosInstance from "../api/AxiosInstance";

import "../styles/Header.css";
import "../styles/Menu.css";
import "../styles/AddNewProduct.css";
import "../styles/Container.css";
import MyButton from "../components/MyButton";
import ImgRegistration from "../components/imgCreate/ImgRegisteration";
import Container from "../components/Container";
import CategoryChoose from "../components/CategoryChoose";
import ImgAddRegisteration from "../components/imgCreate/ImgAddRegisteration";

const AddNewProduct = () => {
  const inputRef = useRef([]);
  const selectRef = useRef([]);
  // const [sellPrice, setSellPrice] = useState(0);
  // const [salePrice, setSalePrice] = useState(0);
  const [item, setItem] = useState({
    category: "",
    subcategory: "",
    name: "",
    content: "",
    discountRate: "0",
    discountPrice: "0",
    sellPrice: "0",
    price: "0",
    stock: "0",
    main_img: [""],
    sub_img: [""],
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;

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
      setItem((prevState) => ({
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
      setItem((prevState) => ({
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

    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setItem((prevState) => {
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

  const handleMainImageNamesChange = (mainImage) => {
    setItem((prevItem) => ({
      ...prevItem,
      main_img: mainImage,
    }));
  };

  const handleSubImageNamesChange = (mainImage) => {
    setItem((prevItem) => ({
      ...prevItem,
      sub_img: mainImage,
    }));
  };

  const handleSubmit = () => {
    // 각 항목 유효성 검사
    if (!item.main_img.some((img) => img !== "")) {
      alert("상품 이미지를 선택하세요.");
      return;
    }

    if (item.subcategory === "") {
      alert("카테고리를 선택하세요.");
      return;
    }

    for (let i = 0; i < selectRef.current.length; i++) {
      if (selectRef.current[i].value === "") {
        selectRef.current[i].focus();
        return;
      }
    }

    for (let i = 0; i < inputRef.current.length; i++) {
      if (
        inputRef.current[i].value === "" ||
        inputRef.current[i].value === "0"
      ) {
        inputRef.current[i].focus();
        return;
      }
    }

    if (!item.sub_img.some((img) => img !== "")) {
      alert("상품 상세 이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryId", item.subcategory);
    formData.append("name", item.name);
    formData.append("content", item.content);
    formData.append("price", item.price);
    formData.append("discountRate", item.discountRate);
    formData.append("discountPrice", item.discountPrice);
    formData.append("sellPrice", item.sellPrice);
    formData.append("stock", item.stock);
    formData.append("isSell", false);

    // mainImg와 serveImg에 대한 FormData를 추가
    for (let i = 0; i < item.main_img.length; i++) {
      formData.append("mainImgList", item.main_img[i]);
    }
    for (let i = 0; i < item.sub_img.length; i++) {
      formData.append("subImgList", item.sub_img[i]);
    }

    axiosInstance
      .post("/admin/item", formData)
      .then((response) => {
        console.log("POST Success:", response.data);

        window.alert("상품이 성공적으로 등록되었습니다!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="AddNewProduct">
      <Container>
        <h2>새 제품 등록하기</h2>
        <table>
          <colgroup>
            <col style={{ width: 120 }} />
            <col style={{ width: 1000 }} />
          </colgroup>
          <tbody>
            <tr>
              <th>상품 대표 이미지</th>
              <td>
                <ImgRegistration
                  mainImgs={item.main_img}
                  setMainImgs={setItem}
                  handleImageChange={handleMainImageNamesChange}
                />
                <p style={{ fontSize: 14 }}>
                  선택하지 않은 이미지는 그 다음 이미지로 순차 저장됩니다.
                </p>
              </td>
            </tr>
            <tr>
              <th>상품 카테고리</th>
              <td>
                <CategoryChoose
                  selectRef={selectRef}
                  item={item}
                  setItem={setItem}
                />
              </td>
            </tr>
            <tr>
              <th>상품명</th>
              <td>
                <input
                  name="name"
                  value={item.name}
                  ref={(el) => (inputRef.current[0] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
            <tr>
              <th>가격</th>
              <td>
                <input
                  name="price"
                  value={item.price}
                  ref={(el) => (inputRef.current[1] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
            <tr>
              <th>{`할인율(%)`}</th>
              <td>
                <input
                  name="discountRate"
                  value={item.discountRate}
                  ref={(el) => (inputRef.current[2] = el)}
                  onChange={handleChangeState}
                />
                <p style={{ textAlign: "start" }}>
                  {`(${item.discountRate}% : ${item.discountPrice}원)`}
                </p>
                <p style={{ textAlign: "start" }}>
                  할인된 가격 : <strong>{item.sellPrice}</strong>원
                </p>
              </td>
            </tr>
            <tr>
              <th>재고</th>
              <td>
                <input
                  name="stock"
                  value={item.stock}
                  ref={(el) => (inputRef.current[3] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
            <tr>
              <th>상품상세 설명</th>
              <td>
                <textarea
                  name="content"
                  value={item.content}
                  ref={(el) => (inputRef.current[4] = el)}
                  onChange={handleChangeState}
                />
              </td>
            </tr>
            <tr>
              <th>상품 상세 이미지</th>
              <td>
                <ImgAddRegisteration
                  handleImageChange={handleSubImageNamesChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button">
          <MyButton buttonText={"등록하기"} onClick={handleSubmit} />
        </div>
      </Container>
    </div>
  );
};
export default AddNewProduct;
