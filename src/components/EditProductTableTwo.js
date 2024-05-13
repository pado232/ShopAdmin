import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
import ImgRegistration from "../components/ImgRegisteration";
import MyButton from "../components/MyButton";

import "../styles/EditProduct.css";

const EditProductTableTwo = () => {
  const { itemId } = useParams();

  const [mainImages, setMainImages] = useState({
    main_img: [],
    sub_img: [],
  });

  const fetchItemDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/item/data?itemId=${itemId}`
      );
      const itemData = response.data;

      setMainImages({
        main_img: itemData.mainImgDataList,
        sub_img: itemData.subImgDataList,
      });
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  }, [itemId]);

  useEffect(() => {
    fetchItemDetails();
  }, [itemId, fetchItemDetails]);

  const handleMainImageNamesChange = (mainImage) => {
    setMainImages((prevItem) => ({
      ...prevItem,
      main_img: mainImage,
    }));
  };

  const handleImageUpload = (index) => async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imgFile", file);
        formData.append("number", index + 1);

        // axiosInstance.post가 FormData를 처리할 수 있도록 설정되어 있는지 확인하세요
        const response = await axiosInstance.patch(
          "/admin/item/subImg/add",
          formData
        );

        // 응답에 필요한 데이터가 있는 경우 처리하세요
        console.log("이미지 업로드 응답:", response.data);
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
      }

      // 이미지 업로드 후에 상태를 업데이트하거나 필요한 작업을 수행할 수 있습니다
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = {
          fileUrl: event.target.result,
        };
        setMainImages((prevItem) => {
          const updatedSubImages = [...prevItem.sub_img];
          updatedSubImages.splice(index + 1, 0, image);
          return {
            ...prevItem,
            sub_img: updatedSubImages,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  //   const handleSave = () => {
  //     // 저장 로직 구현
  //   };

  return (
    <div className="EditProduct">
      <h2>상품 수정</h2>
      {mainImages && (
        <table>
          <colgroup style={{ width: 200 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>상품메인 이미지</th>
              <td>
                <ImgRegistration
                  handleImageChange={handleMainImageNamesChange}
                  mainImgs={mainImages.main_img}
                  setMainImgs={setMainImages}
                />
                <p style={{ fontSize: 14 }}>
                  선택하지 않은 이미지는 그 다음 이미지로 순차 저장됩니다.
                </p>
              </td>
            </tr>

            <tr>
              <th>
                <div>상품상세 이미지</div>
                <div>{`(홈페이지 미리보기)`}</div>
              </th>
              <td>
                <div className="sub_images">
                  {mainImages.sub_img.map((imgData, index) => (
                    <div className="sub_part" key={imgData.fileUrl}>
                      <div className="delete">
                        <MyButton buttonText={`${index + 1}번 이미지 삭제`} />
                      </div>
                      <div>
                        <img
                          key={index}
                          src={imgData.fileUrl}
                          alt={`이미지 ${index}`}
                        />
                      </div>
                      <div className="add">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditProductTableTwo;
