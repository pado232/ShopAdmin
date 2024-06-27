import React, { useRef, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import MyButton from "../MyButton";

const ImageUpload = ({ fetchImages, param }) => {
  const [linkUrlInput, setLinkUrlInput] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [showToggle, setShowToggle] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
    }
  };

  const handleButtonClick = () => {
    if (!imgFile && fileInputRef.current) {
      fileInputRef.current.focus();
      fileInputRef.current.click();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    const formData = new FormData();
    formData.append("imageLocation", param);
    formData.append("img", imgFile);
    formData.append("linkUrl", linkUrlInput);
    formData.append("show", showToggle);
    axiosInstance
      .post(`/admin/add/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchImages();
        console.log("handleFileInputChange POST", res);
        resetForm();
      })
      .catch((error) => {
        console.log("handleFileInputChange POST Error", error);
      });
  };

  const resetForm = () => {
    setLinkUrlInput("");
    setImgFile(null);
    setShowToggle(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="add_img">
      <div className="addImg">
        <div className="input_box">
          <button
            className="toggleBtn"
            onClick={() => {
              setShowToggle(!showToggle);
            }}
          >
            {showToggle ? "보이기" : "감추기"} 상태
          </button>
          <div>
            <div>이미지 클릭 시 이동할 링크</div>
            <input
              name="linkUrl"
              placeholder="링크를 복사해서 붙여 넣어주세요."
              value={linkUrlInput}
              onChange={(e) => setLinkUrlInput(e.target.value)}
            />
          </div>
          <div>
            <label>
              <div>이미지 선택</div>
              <input
                className="add"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                ref={fileInputRef}
              />
            </label>
          </div>
        </div>
        <div className="btn_box">
          <MyButton
            buttonText={"이미지 추가하기"}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
