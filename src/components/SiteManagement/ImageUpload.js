import React from "react";
import axiosInstance from "../../api/AxiosInstance";

const ImageUpload = ({ fetchHomeImg, param }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imageLocation", param);
      formData.append("img", file);

      axiosInstance
        .post(`/admin/add/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          fetchHomeImg();
          console.log("handleFileInputChange POST", res);
        })
        .catch((error) => {
          console.log("handleFileInputChange POST Error", error);
        });
    }
  };

  return (
    <div className="add_img">
      <label>
        이미지 추가
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
      </label>
    </div>
  );
};

export default ImageUpload;
