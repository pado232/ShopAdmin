import { useState, useEffect } from "react";
import axiosInstance from "../../api/AxiosInstance";
import "../../styles/SiteImg.css";
import MyButton from "../MyButton";

const LookImage = ({ images, fetchImages }) => {
  const [linkUrls, setLinkUrls] = useState({});

  useEffect(() => {
    setLinkUrls(
      images.reduce((acc, img) => {
        acc[img.pageFileId] = img.linkUrl || ""; // img.linkUrl 값을 초기값으로 설정
        return acc;
      }, {})
    );
  }, [images]);

  const handleLinkUrlChange = (pageFileId, newValue) => {
    setLinkUrls((prev) => ({
      ...prev,
      [pageFileId]: newValue,
    }));
  };

  const onRemove = (pageFileId) => {
    axiosInstance
      .delete(`/admin/delete/image?pageFileId=${pageFileId}`)
      .then((res) => {
        fetchImages();
        console.log("onRemove DELETE", res);
      })
      .catch((error) => {
        console.log("onRemove DELETE Error", error);
      });
  };

  const onShow = (pageFileId, show) => {
    axiosInstance
      .post(`/admin/change/image/show`, {
        pageFileId: pageFileId,
        show: !show,
      })
      .then((res) => {
        fetchImages();
        console.log("onShow post", res);
      })
      .catch((error) => {
        console.log("onShow post Error", error);
      });
  };

  const onLinkChange = (pageFileId) => {
    axiosInstance
      .post(`/admin/change/image/link`, {
        pageFileId: pageFileId,
        linkUrl: linkUrls[pageFileId], // 상태에서 링크 URL을 가져와서 전송
      })
      .then((res) => {
        fetchImages();
        alert("링크가 변경되었습니다.");
        console.log("onLinkChange post", res);
      })
      .catch((error) => {
        console.log("onLinkChange post Error", error);
      });
  };

  return (
    <div className="LookImage">
      {images.length > 0 ? (
        <div className="imgs_box">
          {images.map((img, index) => (
            <div className="list_container" key={index}>
              <div className="list_img">
                <div>
                  <img alt={`이미지 ${img.number}`} src={img.imgUrl} />
                </div>
              </div>
              <div>
                <div>
                  <button
                    className="toggleBtn"
                    onClick={() => onShow(img.pageFileId, img.show)}
                  >
                    {img.show ? "보이기 상태" : "감추기 상태"}
                  </button>
                </div>
                <div>
                  <input
                    className="linkchange"
                    type="text"
                    name="linkUrl"
                    value={linkUrls[img.pageFileId] || ""}
                    onChange={(e) =>
                      handleLinkUrlChange(img.pageFileId, e.target.value)
                    }
                  />
                  <button
                    className="linkchange"
                    onClick={() => onLinkChange(img.pageFileId)}
                  >
                    링크 변경
                  </button>
                </div>
                <div style={{ marginTop: 10 }}>
                  <MyButton
                    buttonText={"이미지 삭제"}
                    onClick={() => onRemove(img.pageFileId)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="site_total_img_none">
          이미지가 없습니다. 이미지를 추가하세요.
        </div>
      )}
    </div>
  );
};

export default LookImage;
