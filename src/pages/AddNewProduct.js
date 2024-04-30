import { useRef, useState } from "react";

import "../styles/Header.css";
import "../styles/Menu.css";
import "../styles/AddNewProduct.css";
import "../styles/Container.css";
import MyButton from "../components/MyButton";
import ImgRegistration from "../components/ImgRegisteration";
import Container from "../components/Container";
import CategoryChoose from "../components/CategoryChoose";
import ImgAddRegisteration from "../components/ImgAddRegisteration";

const AddNewProduct = () => {
  const inputRef = useRef([]);
  const selectRef = useRef([]);
  const [sellPrice, setSellPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [item, setItem] = useState({
    category: "",
    subcategory: "",
    name: "",
    content: "",
    sale: "",
    price: "",
    stock: "",
    main_img: [""],
    sub_img: [""],
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    if (
      (name === "price" || name === "sale" || name === "stock") &&
      isNaN(value)
    ) {
      // 입력값이 숫자가 아닌 경우 무시
      return;
    }

    const processedValue =
      name === "price" || name === "sale" || name === "stock"
        ? parseInt(value, 10)
        : value;

    setItem((prevItem) => {
      const updatedItem = { ...prevItem, [name]: processedValue };

      const calculatedSellPrice =
        updatedItem.price - updatedItem.price * updatedItem.sale * 0.01;
      const calculatedSalePrice = updatedItem.price - calculatedSellPrice;
      setSellPrice(Math.floor(calculatedSellPrice));
      setSalePrice(Math.floor(calculatedSalePrice));
      return updatedItem;
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
      if (inputRef.current[i].value === "") {
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
    formData.append("discountRate", item.sale);
    formData.append("discountPrice", salePrice);
    formData.append("sellPrice", sellPrice);
    formData.append("stock", item.stock);
    formData.append("isSell", false);

    // mainImg와 serveImg에 대한 FormData를 추가
    for (let i = 0; i < item.main_img.length; i++) {
      formData.append("mainImgList", item.main_img[i]);
    }
    for (let i = 0; i < item.sub_img.length; i++) {
      formData.append("serveImgList", item.sub_img[i]);
    }

    // ❗❗❕❗❗❕아직 이미지 안넣은 상태입니다.
    fetch("http://localhost:8080/admin/item", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log("POST Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(item);
    console.log("sellPrice :", sellPrice);
    console.log("salePrice :", salePrice);
    setItem({
      category: "",
      subcategory: "",
      name: "",
      content: "",
      sale: "",
      price: "",
      stock: "",
      main_img: [""],
      sub_img: [""],
    });
    setSalePrice(0);
    setSellPrice(0);
  };

  return (
    <div className="AddNewProduct">
      <Container>
        <h2>새 제품 등록하기</h2>
        <table>
          <colgroup style={{ width: 200 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>상품 이미지</th>
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
                  name="sale"
                  value={item.sale}
                  ref={(el) => (inputRef.current[2] = el)}
                  onChange={handleChangeState}
                />
                <p style={{ textAlign: "start" }}>
                  {`(${item.sale}% : ${salePrice}원)`}
                </p>
                <p style={{ textAlign: "start" }}>
                  할인된 가격 : <strong>{sellPrice}</strong>원
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
              <th>상품상세 이미지</th>
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
