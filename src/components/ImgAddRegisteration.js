import React, { useState } from "react";
import ImgAddMain from "./ImgAddMain";
import MyButton from "./MyButton";
import "../styles/ImgAddRegisteration.css";

const ImgAddRegisteration = ({ handleImageChange }) => {
  const [mainimg, setMainImg] = useState([""]);

  const handleImageSelect = (imgName, index) => {
    // 새로운 이미지를 선택할 때마다 mainimg 상태 업데이트
    const newMainImg = [...mainimg]; // 기존 상태 복사
    newMainImg[index] = imgName; // 새 이미지 이름으로 업데이트
    setMainImg(newMainImg); // mainimg 상태 업데이트

    // 새로운 이미지 목록을 부모 컴포넌트로 전달
    handleImageChange(newMainImg);
  };

  const handleAddImage = () => {
    const hasEmptyString = mainimg.includes("");
    if (hasEmptyString) {
      alert("이미지를 선택해야 다른 이미지를 추가할 수 있습니다.");
      return;
    }
    // 추가 버튼을 누를 때마다 빈 문자열을 mainimg 배열에 추가
    setMainImg([...mainimg, ""]);
  };

  return (
    <div className="ImgAddRegisteration">
      <div className="select_img">
        {mainimg.map((imgName, index) => (
          <ImgAddMain
            key={index}
            onImageSelect={(imgName) => handleImageSelect(imgName, index)}
            imgTitle={`이미지 ${index + 1}`}
          />
        ))}
        <MyButton buttonText={"이미지 추가하기"} onClick={handleAddImage} />
      </div>
    </div>
  );
};

export default ImgAddRegisteration;
