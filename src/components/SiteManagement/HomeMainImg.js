import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import ImageSlider from "./ImageSlider";
import ImageUpload from "./ImageUpload";
import ImageOrderChanger from "./ImageOrderChanger";
import MyButton from "../../components/MyButton";
import "../../styles/SiteImg.css";
import LookImage from "./LookImage";

const HomeMainImg = () => {
  const [homeImgs, setHomeImgs] = useState([]);
  const [homeLogos, setHomeLogos] = useState([]);
  const [newImgs, setNewImgs] = useState([]);
  const [saleImgs, setSaleImgs] = useState([]);
  const [backgroundImgs, setBackgroundImgs] = useState([]);
  const [imgChangeButton, setImgChangeButton] = useState(false);
  const [current, setCurrent] = useState(0);

  const length = homeImgs.length;

  useEffect(() => {
    // console.log("length", current);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const fetchHomeImg = () => {
    const param = "홍보";
    axiosInstance
      .get(`/admin/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setHomeImgs(imgData);
        console.log("fetchHomeImg GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeImg Error", error);
      });
  };

  const fetchHomeLogo = () => {
    const param = "로고";
    axiosInstance
      .get(`/admin/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setHomeLogos(imgData);
        console.log("fetchHomeLogo GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeLogo Error", error);
      });
  };

  const fetchNew = () => {
    const param = "신상";
    axiosInstance
      .get(`/admin/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setNewImgs(imgData);
        console.log("fetchNew GET", res);
      })
      .catch((error) => {
        console.log("fetchNew Error", error);
      });
  };

  const fetchSale = () => {
    const param = "세일";
    axiosInstance
      .get(`/admin/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setSaleImgs(imgData);
        console.log("fetchSale GET", res);
      })
      .catch((error) => {
        console.log("fetchSale Error", error);
      });
  };

  const fetchBackgroundImgs = () => {
    const param = "배경";
    axiosInstance
      .get(`/admin/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setBackgroundImgs(imgData);
        console.log("fetchBackgroundImgs GET", res);
      })
      .catch((error) => {
        console.log("fetchBackgroundImgs Error", error);
      });
  };

  useEffect(() => {
    fetchHomeImg();
    fetchHomeLogo();
    fetchNew();
    fetchSale();
    fetchBackgroundImgs();
  }, []);

  useEffect(() => {
    let interval = null;

    if (length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [current, length, nextSlide]);

  const imgChange = () => {
    setImgChangeButton(!imgChangeButton);
    if (imgChangeButton) {
      fetchHomeImg();
    }
  };

  const onDragEnd = (updatedImages) => {
    setHomeImgs(updatedImages);
  };

  const onEdit = () => {
    axiosInstance
      .post(`/admin/change/image`, { changeNumberImageList: homeImgs })
      .then((res) => {
        fetchHomeImg();
        console.log("ChangeOrder POST", res);
      })
      .catch((error) => {
        console.log("ChangeOrder POST Error", error);
      });
  };
  return (
    <div className="HomeMainImg">
      <h3>홈 메인 이미지 설정</h3>
      <div className="warning">
        <div>이미지 순서 변경 시 추가/삭제가 불가능 합니다.</div>
        <div>이미지 순서 변경 후 꼭!! 저장하세요.</div>
      </div>
      {!imgChangeButton && (
        <ImageUpload param={"홍보"} fetchImages={fetchHomeImg} />
      )}
      <ImageSlider
        images={homeImgs}
        current={current}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />

      <div className="btn_warpper">
        {imgChangeButton && (
          <MyButton buttonText={"이미지 순서 저장"} onClick={onEdit} />
        )}
        <MyButton
          buttonText={!imgChangeButton ? "이미지 순서 변경" : "변경 취소"}
          onClick={imgChange}
        />
      </div>
      {!imgChangeButton ? (
        <LookImage images={homeImgs} fetchImages={fetchHomeImg} />
      ) : (
        <ImageOrderChanger images={homeImgs} onDragEnd={onDragEnd} />
      )}

      <h3>헤더 로고 이미지</h3>
      <ImageUpload param={"로고"} fetchImages={fetchHomeLogo} />
      <LookImage images={homeLogos} fetchImages={fetchHomeLogo} />

      <h3>신상품(New) 이미지</h3>
      <ImageUpload param={"신상"} fetchImages={fetchNew} />
      <LookImage images={newImgs} fetchImages={fetchNew} />

      <h3>세일(Sale) 이미지</h3>
      <ImageUpload param={"세일"} fetchImages={fetchSale} />
      <LookImage images={saleImgs} fetchImages={fetchSale} />

      <h3>홈 배경 이미지</h3>
      <ImageUpload param={"배경"} fetchImages={fetchBackgroundImgs} />
      <LookImage images={backgroundImgs} fetchImages={fetchBackgroundImgs} />
    </div>
  );
};

export default HomeMainImg;
