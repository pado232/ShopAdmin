import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
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

  const handleMainImageUpload = (index) => async (e) => {
    console.log("인덱스 값", index);

    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imgFile", file);
        formData.append("number", index);

        // axiosInstance.post가 FormData를 처리할 수 있도록 설정되어 있는지 확인하세요
        const response = await axiosInstance.patch(
          "/admin/item/mainImg/add",
          formData
        );

        fetchItemDetails();
        console.log("이미지 업로드 응답:", response.data);
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
      }
    }
  };

  const handleSubImageUpload = (index) => async (e) => {
    console.log("인덱스 값", index);

    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imgFile", file);
        formData.append("number", index);

        // axiosInstance.post가 FormData를 처리할 수 있도록 설정되어 있는지 확인하세요
        const response = await axiosInstance.patch(
          "/admin/item/subImg/add",
          formData
        );

        fetchItemDetails();
        console.log("이미지 업로드 응답:", response.data);
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
      }
    }
  };

  const handleMainImageExchange = (index) => async (e) => {
    const imageToDelete = mainImages.main_img[index];
    const s3FileId = imageToDelete.s3FileId;

    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imgFile", file);
        formData.append("s3FileId", s3FileId);

        // axiosInstance.post가 FormData를 처리할 수 있도록 설정되어 있는지 확인하세요
        const response = await axiosInstance.patch(
          "/admin/item/mainImg/replace",
          formData
        );
        // 응답에 필요한 데이터가 있는 경우 처리하세요
        console.log("이미지 교체 응답:", response.data);
      } catch (error) {
        console.error("이미지 교체 오류:", error);
      }

      // 이미지 업로드 후에 상태를 업데이트하거나 필요한 작업을 수행할 수 있습니다
      fetchItemDetails();
    }
  };

  const handleSubImageExchange = (index) => async (e) => {
    const imageToDelete = mainImages.sub_img[index];
    const s3FileId = imageToDelete.s3FileId;

    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imgFile", file);
        formData.append("s3FileId", s3FileId);

        // axiosInstance.post가 FormData를 처리할 수 있도록 설정되어 있는지 확인하세요
        const response = await axiosInstance.patch(
          "/admin/item/subImg/replace",
          formData
        );
        // 응답에 필요한 데이터가 있는 경우 처리하세요
        console.log("이미지 교체 응답:", response.data);
      } catch (error) {
        console.error("이미지 교체 오류:", error);
      }

      // 이미지 업로드 후에 상태를 업데이트하거나 필요한 작업을 수행할 수 있습니다
      fetchItemDetails();
    }
  };

  const handleMainImageDelete = (index) => async () => {
    const imageToDelete = mainImages.main_img[index];
    const s3FileId = imageToDelete.s3FileId;

    try {
      const response = await axiosInstance.delete(
        `/admin/item/mainImg/delete?itemId=${itemId}&s3FileId=${s3FileId}`
      );

      fetchItemDetails();
      console.log("이미지 삭제 응답:", response.data);
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
    }
  };

  const handleSubImageDelete = (index) => async () => {
    const imageToDelete = mainImages.sub_img[index];
    const s3FileId = imageToDelete.s3FileId;

    try {
      const response = await axiosInstance.delete(
        `/admin/item/subImg/delete?itemId=${itemId}&s3FileId=${s3FileId}`
      );

      fetchItemDetails();
      console.log("이미지 삭제 응답:", response.data);
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
    }
  };

  return (
    <div>
      <h3>상품 이미지 수정하기</h3>
      {mainImages && (
        <table>
          <colgroup style={{ width: 200 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>
                <div>{`상품 대표 이미지`}</div>
                <div>{`(최대 4개)`}</div>
              </th>
              <td>
                <div className="main_images">
                  {mainImages.main_img.map((imgData, index) => (
                    <div className="main_part" key={imgData.fileUrl}>
                      <div className="delete">
                        {index === 0 ? (
                          <div>
                            <h4>{`대표 메인 이미지`}</h4>
                            <div style={{ padding: 12 }}>
                              메인 이미지는 삭제할 수 없습니다.
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4>{`대표 서브 이미지 ${index}`}</h4>
                            <MyButton
                              buttonText={`삭제`}
                              onClick={handleMainImageDelete(index)}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <img
                          key={index}
                          src={imgData.fileUrl}
                          alt={`이미지 ${index}`}
                        />
                      </div>
                      <div className="add" style={{ flexDirection: "row" }}>
                        {mainImages.main_img.length > 3 ? (
                          <div></div>
                        ) : (
                          <div style={{ paddingRight: 10 }}>
                            <label>
                              {`추가`}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMainImageUpload(index + 1)}
                              />
                            </label>
                          </div>
                        )}

                        <div>
                          <label>
                            {`교체`}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMainImageExchange(index)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>

            <tr>
              <th>
                <div>상품 상세 이미지</div>
                <div>{`(홈페이지 미리보기)`}</div>
              </th>
              <td>
                <div className="sub_images">
                  <div className="add">
                    <div>
                      <label>
                        {mainImages.sub_img.length === 0
                          ? "이미지 추가하기"
                          : "앞에 추가"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageUpload(0)}
                        />
                      </label>
                    </div>
                  </div>

                  {mainImages.sub_img.map((imgData, index) => (
                    <div className="sub_part" key={imgData.fileUrl}>
                      <div className="delete">
                        <MyButton
                          buttonText={`삭제`}
                          onClick={handleSubImageDelete(index)}
                        />
                      </div>
                      <div>
                        <img
                          key={index}
                          src={imgData.fileUrl}
                          alt={`이미지 ${index}`}
                        />
                      </div>
                      <div className="add">
                        <div>
                          <label>
                            {`교체`}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSubImageExchange(index)}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            {`뒤에 추가`}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSubImageUpload(index + 1)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sub_images">
                  {mainImages.sub_img.map((imgData, index) => (
                    <div className="sub_part" key={imgData.fileUrl}>
                      <div style={{ width: 100, height: 100 }}>
                        <img
                          key={index}
                          src={imgData.fileUrl}
                          alt={`이미지 ${index}`}
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
