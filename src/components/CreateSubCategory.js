import { useRef, useState } from "react";
import MyButton from "./MyButton";
import "../styles/CreateSubCategory.css";
import useCookies from "../util/Cookies";

const CreateSubCategory = ({ fetchCategories, parentId }) => {
  const { getCookie} = useCookies(); // useCookies 훅 사용
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

    console.log(subCategory);
    fetch("http://localhost:8080/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        "Authorization": `${getCookie("AuthorCookie")}`,
        "Refresh_Token": `${getCookie("RefCookie")}`,
      },
      body: JSON.stringify({
        name: subCategory.main,
        parentId: subCategory.parentId,
      }),
    })
      .then((data) => {
        console.log("POST Success:", data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error);
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
