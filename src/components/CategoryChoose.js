import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";

const CategoryChoose = ({ item, setItem, selectRef }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    const selectedCategory = categories.find(
      (category) => category.categoryId === selectedCategoryId
    );
    const childCategories = selectedCategory.child || [];
    setItem({ ...item, category: selectedCategoryId });
    setSubcategories(childCategories); // 부모 카테고리에 해당하는 하위 카테고리 설정
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = parseInt(e.target.value);
    setItem({ ...item, subcategory: selectedSubcategoryId });
  };

  return (
    <div className="CategoryChoose">
      {categories.length === 0 ? (
        <div>
          <p style={{ fontSize: 14 }}>
            <strong>
              선택할 카테고리가 없어요. 카테고리를 먼저 설정해주세요!
            </strong>
          </p>
          <p style={{ fontSize: 14, color: "#aaa" }}>
            {`사이트관리 > 웹 사이트 콘텐츠 관리 > `}
            <a href="/sitecontent">카테고리 추가하기</a>
          </p>
        </div>
      ) : (
        <div>
          <select
            name="category"
            value={item.category}
            ref={(el) => (selectRef.current[0] = el)}
            onChange={handleCategoryChange}
          >
            {/* 선택되지 않은 경우에만 "부모 카테고리를 선택해주세요" 옵션을 표시 */}
            {!item.category && (
              <option value="" disabled hidden>
                부모 카테고리를 선택해주세요
              </option>
            )}
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="subcategory"
            value={item.subcategory}
            ref={(el) => (selectRef.current[1] = el)}
            onChange={handleSubcategoryChange}
          >
            {/* 선택되지 않은 경우에만 "하위 카테고리 선택" 옵션을 표시 */}
            {!item.subcategory && (
              <option value="" disabled hidden>
                하위 카테고리를 선택해주세요
              </option>
            )}
            {subcategories.map((subcategory) => (
              <option
                key={subcategory.categoryId}
                value={subcategory.categoryId}
              >
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CategoryChoose;
