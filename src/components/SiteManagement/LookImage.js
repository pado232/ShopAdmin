import axiosInstance from "../../api/AxiosInstance";
import "../../styles/SiteImg.css";
import MyButton from "../MyButton";

const LookImage = ({ images, fetchHomeImg }) => {
  const onRemove = (pageFileId) => {
    axiosInstance
      .delete(`/admin/delete/image?pageFileId=${pageFileId}`)
      .then((res) => {
        fetchHomeImg();
        console.log("onRemove DELETE", res);
      })
      .catch((error) => {
        console.log("onRemove DELETE Error", error);
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
              <div style={{ marginTop: 10 }}>
                <MyButton
                  buttonText={"이미지 삭제"}
                  onClick={() => onRemove(img.pageFileId)}
                />
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
