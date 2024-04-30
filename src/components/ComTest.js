import Container from "./Container";
import React, { useState } from "react";

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter subcategory"
      />
      <button type="submit">Add</button>
    </form>
  );
};
const ComTest = () => {
  const [categories, setCategories] = useState([]);

  const handleSubmit = (name) => {
    // 새로운 하위 카테고리를 추가할 때마다 새로운 객체를 생성하여 상태를 업데이트합니다.
    setCategories((prevCategories) => [
      ...prevCategories,
      {
        name,
        subCategories: [],
      },
    ]);
  };

  const handleSubcategorySubmit = (index, subcategory) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      updatedCategories[index].subCategories.push(subcategory);
      return updatedCategories;
    });
  };
  return (
    <div className="ComTest">
      <Container>
        <div>
          <h1>Add Categories</h1>
          <CategoryForm onSubmit={handleSubmit} />
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                {category.name}
                <CategoryForm
                  onSubmit={(subcategory) =>
                    handleSubcategorySubmit(index, subcategory)
                  }
                />
                <ul>
                  {category.subCategories.map((subCategory, subIndex) => (
                    <li key={subIndex}>{subCategory}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};
export default ComTest;
