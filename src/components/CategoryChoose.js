import React, { useState, useEffect } from "react";

const CategoryChoose = ({ item, setItem, selectRef }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8080/admin/category")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
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
    const filteredSubcategories = categories.filter(
      (category) => category.parentId === selectedCategoryId
    );
    setSubcategories(filteredSubcategories);
    // 부모 카테고리만 변경, 하위 카테고리는 변경하지 않음
    setItem({ ...item, category: selectedCategoryId });
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = parseInt(e.target.value);
    setItem({ ...item, subcategory: selectedSubcategoryId });
  };

  return (
    <div className="CategoryChoose">
      {categories.length === 0 ||
      !categories.some((category) => category.parentId !== null) ? (
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
            {categories
              .filter((category) => category.parentId === null)
              .map((category) => (
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
