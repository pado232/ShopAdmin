import { useState } from "react";
import MyButton from "../MyButton";
import "../../styles/EditSomething.css";
import CreateSubCategory from "./CreateSubCategory";
import EditSubCategory from "./EditSubCategory";
import axiosInstance from "../../api/AxiosInstance";

const EditSomething = ({ fetchCategories, getData }) => {
  const [editToggle, setEditToggle] = useState({});
  const [editCategory, setEditCategory] = useState({
    name: "",
    categoryId: 0,
  });
  // const [variableToPass, setVariableToPass] = useState("");

  const EditCategoryChange = (e) => {
    const { name, value } = e.target;
    setEditCategory({
      ...editCategory,
      [name]: value,
    });
  };

  const parentCategories = getData.filter((category) => !category.parentId);

  const childCategories = getData.filter(
    (category) => category.parentId !== null
  );

  const onUpdate = () => {
    let unauthorizedMessageDisplayed = false;
    setEditToggle(false);
    axiosInstance
      .patch(`/admin/category`, {
        categoryId: editCategory.categoryId,
        name: editCategory.name,
      })
      .then((data) => {
        console.log("Success:", data);
        fetchCategories();
      })
      .catch((error) => {
        if (
          error.response?.data?.message === "NOT_AUTHORIZATION" &&
          !unauthorizedMessageDisplayed
        ) {
          window.alert("카테고리를 수정할 수 있는 권한이 없습니다.");
          unauthorizedMessageDisplayed = true;
        } else {
          console.error("Error:", error);
        }
      });
  };

  const onDelete = async (index) => {
    const categoryToDelete = parentCategories[index];

    // 자식 카테고리 찾기 (부모의 categryId와 같은 parentId 값을 가지는 자식)
    const childCategories = getData.filter(
      (category) => category.parentId === categoryToDelete.categoryId
    );

    // 먼저 자식 카테고리 삭제
    for (const childCategory of childCategories) {
      await deleteCategory(childCategory);
    }

    // 그 다음 부모 카테고리 삭제
    await deleteCategory(categoryToDelete);
  };

  let unauthorizedMessageDisplayed = false;

  const deleteCategory = async (category) => {
    try {
      await axiosInstance.delete(
        `/admin/category?categoryId=${category.categoryId}`
      );
      console.log("Category deleted successfully:", category);
      fetchCategories();
    } catch (error) {
      if (
        error.response?.data?.message === "NOT_AUTHORIZATION" &&
        !unauthorizedMessageDisplayed
      ) {
        window.alert("카테고리를 삭제할 수 있는 권한이 없습니다.");
        unauthorizedMessageDisplayed = true;
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleEditToggle = (index) => {
    const categoryToEdit = getData[index];
    setEditCategory({
      name: categoryToEdit.name,
      categoryId: categoryToEdit.categoryId,
    });
    setEditToggle({ [index]: !editToggle[index] });
  };

  // getData 배열이 null인 경우 조건부 렌더링
  if (!getData) return null;

  // 부모 카테고리만 필터링

  return (
    <div className="EditSomething">
      <div className="edit">
        {parentCategories.map((parentCategory, index) => (
          <div key={index}>
            <div
              style={{
                margin: 10,
                fontSize: 13,
              }}
            >
              <strong>{index + 1}</strong>번 메인 카테고리
            </div>
            <div className="content">
              {editToggle[index] ? (
                <>
                  <div className="contentbox">
                    <input
                      name="name"
                      value={editCategory.name}
                      onChange={EditCategoryChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="contentbox">
                    <p style={{ paddingLeft: 11 }}>{parentCategory.name}</p>
                  </div>
                </>
              )}

              {editToggle[index] ? (
                <div className="buttonbox">
                  <div className="button">
                    <MyButton buttonText={"수정 완료"} onClick={onUpdate} />
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
            <div className="subbox">
              <EditSubCategory
                parentId={parentCategory.categoryId}
                fetchCategories={fetchCategories}
                childCategories={childCategories}
                getData={getData}
                index={index}
              />
              <CreateSubCategory
                fetchCategories={fetchCategories}
                parentId={parentCategory.categoryId}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSomething;
