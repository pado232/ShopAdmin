import { useRef, useState } from "react";
import MyButton from "../MyButton";
import "../../styles/CreateSomething.css";
import axiosInstance from "../../api/AxiosInstance";

const CreateSomething = ({ fetchCategories }) => {
  const inputRef = useRef();
  const [mainCategory, setMainCategory] = useState({
    main: "",
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setMainCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const onCreate = () => {
    if (mainCategory.main.length < 1) {
      inputRef.current.focus();
      return;
    }
    console.log(mainCategory);
    axiosInstance
      .post(`/admin/category/view`, {
        name: mainCategory.main,
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

    setMainCategory({ main: "" });
  };

  return (
    <div className="CreateSomething">
      <div className="create">
        <div className="input">
          <input
            name="main"
            ref={inputRef}
            value={mainCategory.main}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="button">
          <MyButton buttonText={"추가하기"} onClick={onCreate} />
        </div>
      </div>
    </div>
  );
};

export default CreateSomething;
