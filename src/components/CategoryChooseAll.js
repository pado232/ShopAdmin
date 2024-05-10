import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance"; // axios 임포트
import "../styles/CategoryChooseAll.css";

const CategoryChooseAll = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="CategoryChooseAll">
      <select
        name="category"
        value={selectedCategoryId} // <select> 요소의 value 속성에 전달되는 값이 문자열이어야 한다
        onChange={(e) => {
          setSelectedCategoryId(e.target.value);
          // 카테고리를 선택할 때마다 아이템 리스트를 새로 가져오도록 함
        }}
      >
        <option value="">전체</option>
        {categories
          .filter((category) => category.parentId === null) // 부모 카테고리만 필터링
          .map((parentCategory) => (
            <optgroup
              label={parentCategory.name}
              key={parentCategory.categoryId}
            >
              {categories
                .filter(
                  (category) => category.parentId === parentCategory.categoryId
                ) // 해당 부모 카테고리의 하위 카테고리 필터링
                .map((subcategory) => (
                  <option
                    key={subcategory.categoryId}
                    value={subcategory.categoryId}
                  >
                    {subcategory.name}
                  </option>
                ))}
            </optgroup>
          ))}
      </select>
    </div>
  );
};

export default CategoryChooseAll;
