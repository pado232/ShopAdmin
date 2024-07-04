import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../api/AxiosInstance.js";
import "../../styles/Category.css";

const Category = () => {
  const [getData, setGetData] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [addingSubcategory, setAddingSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newParentCategoryName, setNewParentCategoryName] = useState("");

  const fetchCategories = useCallback(() => {
    axiosInstance
      .get("/admin/category/view")
      .then((response) => {
        const getCategoryData = response.data;

        setGetData(getCategoryData);
        console.log("GET", response);
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchCategoriesEdit = (categoryId) => {
    axiosInstance
      .patch("/admin/category", {
        categoryId: categoryId,
        name: categoryName,
        parentId: parentId,
      })
      .then((response) => {
        console.log("Edit PATCH", response);
        fetchCategories(); // Refresh categories after editing
      })
      .catch((error) => {
        console.error("Edit PATCH Error:", error);
      });
  };

  const fetchCategoriesCreate = (name, parentId) => {
    axiosInstance
      .post("/admin/category", {
        name: name,
        parentId: parentId,
      })
      .then((response) => {
        console.log("Create POST", response);
        fetchCategories(); // Refresh categories after creating
      })
      .catch((error) => {
        console.error("Create POST Error:", error);
      });
  };

  const fetchCategoriesRemove = (categoryId) => {
    axiosInstance
      .delete(`/admin/category?categoryId=${categoryId}`)
      .then((response) => {
        console.log("Remove DELETE", response);
        fetchCategories(); // Refresh categories after deleting
      })
      .catch((error) => {
        console.error("Remove DELETE Error:", error);
      });
  };

  const handleEditClick = (category) => {
    setEditingCategory(category.categoryId);
    setCategoryName(category.name);
    setParentId(category.parentId || "");
  };

  const handleSaveClick = () => {
    fetchCategoriesEdit(editingCategory);
    setEditingCategory(null);
  };

  const handleCancelClick = () => {
    setEditingCategory(null);
    setCategoryName("");
    setParentId("");
  };

  const handleDeleteClick = (categoryId) => {
    fetchCategoriesRemove(categoryId);
  };

  const handleAddSubcategoryClick = (parentId) => {
    setAddingSubcategory(parentId);
    setNewSubcategoryName("");
  };

  const handleSaveSubcategoryClick = () => {
    fetchCategoriesCreate(newSubcategoryName, addingSubcategory);
    setAddingSubcategory(null);
    setNewSubcategoryName("");
  };

  const handleCancelSubcategoryClick = () => {
    setAddingSubcategory(null);
    setNewSubcategoryName("");
  };

  const handleSaveParentCategoryClick = () => {
    fetchCategoriesCreate(newParentCategoryName, "");
    setNewParentCategoryName("");
  };

  return (
    <div className="Category">
      <div className="title">메인 카테고리 추가</div>
      <div className="parent_add">
        <div>
          <div>
            <input
              type="text"
              value={newParentCategoryName}
              onChange={(e) => setNewParentCategoryName(e.target.value)}
            />
          </div>
          <div>
            <button className="addbtn" onClick={handleSaveParentCategoryClick}>
              추가하기
            </button>
          </div>
        </div>
      </div>

      {getData && getData.length > 0 ? (
        <ul>
          {getData
            .sort((a, b) => {
              return a.categoryId - b.categoryId;
            })
            .map((category, index) => (
              <div key={index}>
                <div className="title">No.{index + 1} 메인 카테고리</div>
                <li key={category.categoryId}>
                  {editingCategory === category.categoryId ? (
                    <div>
                      <div>
                        <input
                          type="text"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <div>
                        <button onClick={handleSaveClick}>저장하기</button>
                        <button onClick={handleCancelClick}>취소하기</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div> {category.name}</div>
                      <div>
                        <button onClick={() => handleEditClick(category)}>
                          수정하기
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category.categoryId)}
                        >
                          삭제하기
                        </button>
                        <button
                          className="addbtn"
                          onClick={() =>
                            handleAddSubcategoryClick(category.categoryId)
                          }
                        >
                          추가하기
                        </button>
                      </div>
                    </div>
                  )}
                  {addingSubcategory === category.categoryId && (
                    <div>
                      <div>
                        <input
                          type="text"
                          value={newSubcategoryName}
                          onChange={(e) =>
                            setNewSubcategoryName(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <button onClick={handleSaveSubcategoryClick}>
                          저장하기
                        </button>
                        <button onClick={handleCancelSubcategoryClick}>
                          취소하기
                        </button>
                      </div>
                    </div>
                  )}
                  {category.child && category.child.length > 0 && (
                    <ul>
                      {category.child
                        .sort((a, b) => {
                          return a.categoryId - b.categoryId;
                        })
                        .map((subCategory, index) => (
                          <li className="sub" key={subCategory.categoryId}>
                            {editingCategory === subCategory.categoryId ? (
                              <div>
                                <div>
                                  <span className="num">{index + 1}.</span>
                                  <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) =>
                                      setCategoryName(e.target.value)
                                    }
                                  />
                                </div>

                                <div>
                                  <button onClick={handleSaveClick}>
                                    저장하기
                                  </button>
                                  <button onClick={handleCancelClick}>
                                    취소하기
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div>
                                  <span className="num">{index + 1}.</span>
                                  {subCategory.name}
                                </div>

                                <div>
                                  <button
                                    onClick={() => handleEditClick(subCategory)}
                                  >
                                    수정하기
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteClick(subCategory.categoryId)
                                    }
                                  >
                                    삭제하기
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              </div>
            ))}
        </ul>
      ) : (
        <h3>카테고리를 작성해보세요 !!</h3>
      )}
    </div>
  );
};

export default Category;
