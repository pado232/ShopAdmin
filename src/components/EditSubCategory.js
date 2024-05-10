import { useState, useEffect } from "react";
import { getCookie } from "../util/Cookies";
import MyButton from "../components/MyButton";
import axiosInstance from "../api/AxiosInstance";
import "../styles/EditSubCategory.css";

const filterChildCategories = (categories, parentId) => {
  return categories.filter((category) => category.parentId === parentId);
};

const EditSubCategory = ({ fetchCategories, childCategories, parentId }) => {
  const [editToggle, setEditToggle] = useState({});
  const [categoryStates, setCategoryStates] = useState([]);

  useEffect(() => {
    setCategoryStates([...childCategories]);
  }, [childCategories]);

  const EditCategoryChange = (e, index) => {
    const filteredChildCategories = filterChildCategories(
      categoryStates,
      parentId
    );

    const { name, value } = e.target;
    const updatedCategories = [...filteredChildCategories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [name]: value,
    };
    updatedCategories[index].parentId = parentId;
    setCategoryStates(updatedCategories);
  };

  const onUpdate = (index) => {
    const editedCategory = categoryStates[index];
    setEditToggle(false);

    axiosInstance
      .patch(
        `/admin/category`,
        {
          categoryId: editedCategory.categoryId,
          name: editedCategory.name,
          parentId: editedCategory.parentId,
        },
        {
          headers: {
            "Content-Type": "application/json;",
            Authorization: `${getCookie("Authorization")}`,
          },
        }
      )
      .then((response) => {
        console.log("Success:", response);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDelete = (index) => {
    const filteredChildCategories = filterChildCategories(
      categoryStates,
      parentId
    );

    const categoryToDelete = filteredChildCategories[index];
    console.log("삭제 - categoryId 숫자 : ", categoryToDelete.categoryId);

    axiosInstance
      .delete(`/admin/category?categoryId=${categoryToDelete.categoryId}`, {
        headers: {
          Authorization: `${getCookie("Authorization")}`,
        },
      })
      .then((response) => {
        console.log("Success:", response);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditToggle = (index) => {
    const updatedToggle = { ...editToggle };
    updatedToggle[index] = !updatedToggle[index];
    setEditToggle(updatedToggle);
  };

  const filteredChildCategories = filterChildCategories(
    categoryStates,
    parentId
  );

  return (
    <div className="EditSubCategory">
      <div className="edit">
        {categoryStates &&
          filteredChildCategories.map((category, index) => (
            <div key={index}>
              <div className="content">
                <p style={{ fontSize: 12, marginRight: 5 }}>{index + 1}.</p>
                {editToggle[index] ? (
                  <>
                    <div className="contentbox">
                      <input
                        name="name"
                        value={filteredChildCategories[index].name}
                        onChange={(e) => EditCategoryChange(e, index)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="contentbox">
                      <p style={{ paddingLeft: 11 }}>{category.name}</p>
                    </div>
                  </>
                )}
                {editToggle[index] ? (
                  <div className="buttonbox">
                    <div className="button">
                      <MyButton
                        buttonText={"수정 완료"}
                        onClick={() => onUpdate(index)}
                      />
                    </div>
                    <div className="button">
                      <MyButton
                        buttonText={"수정 취소"}
                        onClick={() => handleEditToggle(index)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="buttonbox">
                    <div className="button">
                      <MyButton
                        buttonText={"수정하기"}
                        onClick={() => handleEditToggle(index)}
                      />
                    </div>
                    <div className="button">
                      <MyButton
                        buttonText={"삭제하기"}
                        onClick={() => onDelete(index)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditSubCategory;
