import React from "react";

import Container from "../components/Container";
import EditProductTableOne from "../components/EditProduct/EditProductTableOne";
import EditProductTableTwo from "../components/EditProduct/EditProductTableTwo";

import "../styles/EditProduct.css";

const EditProduct = () => {
  return (
    <div className="EditProduct">
      <Container>
        <h2>상품 수정</h2>
        <EditProductTableOne />
        <EditProductTableTwo />
      </Container>
    </div>
  );
};

export default EditProduct;
