import React, { useState, useEffect } from "react";
import "../../styles/ImgAddMain.css";
import MyButton from "../MyButton";

const ImgAddMain = ({ onImageSelect, imgTitle, initialImage }) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (initialImage) {
      if (initialImage instanceof File) {
        const imageURL = URL.createObjectURL(initialImage);
        setImageURL(imageURL);
      } else if (typeof initialImage === "string") {
        setImageURL(initialImage);
      }
    }
  }, [initialImage]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
      onImageSelect(file); // 부모 컴포넌트로 선택된 이미지 전달
    }
  };

  const handleDeleteImage = () => {
    setImageURL("");
    onImageSelect(""); // 이미지가 삭제되었음을 부모 컴포넌트에 알림

    // 이미지가 삭제되면 서버에서도 삭제
    // deleteImageFromServer();
  };

  return (
    <div className="ImgAddMain">
      <div className="img_select_box">
        <div style={{ marginBottom: 20 }}>
          <label>
            이미지 선택
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: 20 }}>
          <strong>{imgTitle}</strong>
        </div>
        {imageURL ? (
          <div className="select_img" style={{ marginBottom: 20 }}>
            <img src={imageURL} alt="User-specified" />
            <div>
              <MyButton buttonText={"삭제"} onClick={handleDeleteImage} />
            </div>
          </div>
        ) : (
          // 이미지가 없는 경우에는 이미지를 선택하는 창이 나오도록 수정
          <div className="unselect_img">
            <div>이미지를 선택해주세요</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgAddMain;
