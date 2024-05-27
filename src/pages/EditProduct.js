import React, { useCallback, useEffect, useState } from "react";

import Container from "../components/Container";
import EditProductTableOne from "../components/EditProduct/EditProductTableOne";
import EditProductTableTwo from "../components/EditProduct/EditProductTableTwo";

import "../styles/EditProduct.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import CheckPermissions from "../api/CheckPermissions";

const EditProduct = () => {
  const [authError, setAuthError] = useState(false);
  const { itemId } = useParams();

  const fetchItemDetails = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/admin/item/data?itemId=${itemId}`);
    } catch (error) {
      if (error.response?.data?.message === "NOT_AUTHORIZATION") {
        setAuthError(true);
        CheckPermissions();
      } else {
        console.error("AdminDetails GET Error:", error);
      }
    }
  }, [itemId]);

  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  if (authError) {
    return (
      <div>
        <CheckPermissions />
      </div>
    );
  }

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
