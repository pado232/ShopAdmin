import React from "react";
import Container from "../components/Container";
import EditProductTableOne from "../components/EditProductTableOne";

import "../styles/EditProduct.css";
import EditProductTableTwo from "../components/EditProductTableTwo";

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
