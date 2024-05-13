import React from "react";
import ImgAddMain from "./ImgAddMain";

const ImgRegistration = ({ mainImgs, setMainImgs, handleImageChange }) => {
  const handleImageSelect = (fileUrl, index) => {
    const newMainImgs = [...mainImgs];
    newMainImgs[index] = fileUrl ? fileUrl : ""; // 이미지를 삭제할 때는 빈 문자열을 설정
    setMainImgs((prevItem) => ({
      ...prevItem,
      main_img: newMainImgs, // 빈 배열 제거하지 않고 유지
    }));

    handleImageChange(newMainImgs.filter((img) => img !== "")); // 빈 배열 제거하지 않고 유지

    console.log("이미지 : ", JSON.stringify(newMainImgs));
  };

  const imgTitles = [
    "기본 이미지",
    "추가 이미지 1",
    "추가 이미지 2",
    "추가 이미지 3",
  ];

  // 이미지 선택 창을 항상 4개로 렌더링하기 위해 빈 이미지 항목 추가
  const imgElements = Array.from({ length: 4 }, (_, index) => {
    // mainImgs 배열에서 해당 인덱스의 fileUrl을 가져옵니다.
    const fileUrl = mainImgs[index] ? mainImgs[index].fileUrl : ""; // 이미지가 없는 경우 빈 문자열 전달

    // 각 이미지 선택 창이 렌더링될 때 콘솔 출력
    // console.log(`이미지 선택 창 렌더링 - index: ${index}, fileUrl: ${fileUrl}`);

    return (
      <ImgAddMain
        key={index}
        onImageSelect={(fileUrl) => handleImageSelect(fileUrl, index)} // 파일 URL 전달
        imgTitle={imgTitles[index]}
        initialImage={fileUrl} // 이미지 파일 URL 전달
      />
    );
  });

  return (
    <div className="ImgRegistration">
      <div className="select_img" style={{ display: "flex", width: "100%" }}>
        {imgElements}
      </div>
    </div>
  );
};

export default ImgRegistration;
