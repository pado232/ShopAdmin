import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";

const CategoryChooseEdit = ({ item, setItem }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axiosInstance
      .get("/admin/category/view")
      .then((response) => {
        const data = response.data;
        const sortedData = [...data].sort((a, b) => {
          return a.categoryId - b.categoryId;
        });
        setCategories(sortedData);
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    // item.category와 categories 배열을 비교하여 categoryName 설정
    categories.forEach((category) => {
      if (item.subcategory === category.categoryId) {
        setCategoryName(category.name);
      }
    });
  }, [categories, item.subcategory]);

  return (
    <div className="CategoryChoose">
      <div>
        <div style={{ padding: 5, fontSize: 16 }}>{categoryName}</div>
      </div>
    </div>
  );
};

export default CategoryChooseEdit;
