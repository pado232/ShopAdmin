import { useRef, useState } from "react";
import MyButton from "../MyButton";
import "../../styles/CreateSubCategory.css";
import axiosInstance from "../../api/AxiosInstance";

const CreateSubCategory = ({ fetchCategories, parentId }) => {
  const inputRef = useRef();
  const [subCategory, setSubCategory] = useState({
    parentId: 0,
    main: "",
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    setSubCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
      parentId: parseInt(parentId),
    }));
  };

  const onSubCreate = () => {
    if (subCategory.main.length < 1) {
      inputRef.current.focus();
      return;
    }

    axiosInstance
      .post(`/admin/category`, {
        name: subCategory.main,
        parentId: subCategory.parentId,
      })
      .then((response) => {
        console.log("POST Success:", response);
        fetchCategories();
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("카테고리를 작성할 수 있는 권한이 없습니다.");
        } else {
          console.error("Error:", error);
        }
      });

    setSubCategory({ main: "" });
  };

  return (
    <div className="CreateSubCategory">
      <div className="create">
        <div className="input">
          <input
            name="main"
            ref={inputRef}
            value={subCategory.main}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="button">
          <MyButton buttonText={"추가하기"} onClick={onSubCreate} />
        </div>
      </div>
    </div>
  );
};
export default CreateSubCategory;
