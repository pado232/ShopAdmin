import { useRef, useState } from "react";
import MyButton from "../components/MyButton";
import "../styles/CreateSomething.css";
import useCookies from "../util/Cookies";

const CreateSomething = ({ fetchCategories }) => {
  const {getCookie} = useCookies(); // useCookies 훅 사용
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
    fetch("http://localhost:8080/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        "Authorization": `${getCookie("AuthorCookie")}`,
        "Refresh_Token": `${getCookie("RefCookie")}`,
      },
      body: JSON.stringify({
        name: mainCategory.main,
      }),
    })
      .then((data) => {
        console.log("POST Success:", data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error);
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
