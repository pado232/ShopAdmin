import { useState } from "react";

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "../styles/Pagination.css";

const Pagination = ({ setNowPage, nowPage, totalPage }) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(1); // 현재 페이지 그룹

  const goToPreviousPageGroup = () => {
    if (currentPageGroup > 1) {
      setCurrentPageGroup(currentPageGroup - 1);
      setNowPage((currentPageGroup - 2) * 5 + 5);
    }
  };

  const goToNextPageGroup = () => {
    const lastPageOfCurrentGroup = currentPageGroup * 5;
    if (lastPageOfCurrentGroup < totalPage) {
      setCurrentPageGroup(currentPageGroup + 1);
      setNowPage(currentPageGroup * 5 + 1);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const startPage = (currentPageGroup - 1) * 5 + 1; // 현재 페이지 그룹의 시작 페이지

    for (
      let i = startPage;
      i <= Math.min(totalPage, startPage + totalPagesToShow - 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const iconSize = 13 * 2;

  return (
    <div className="Pagination">
      <ul>
        <div className="arrowIcon">
          {currentPageGroup > 1 && (
            <li className="listicon" onClick={goToPreviousPageGroup}>
              <div className="arrowIcon">
                <MdKeyboardDoubleArrowLeft size={iconSize} />
              </div>
            </li>
          )}
        </div>
        {generatePageNumbers().map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => setNowPage(pageNumber)}
            style={{
              color: pageNumber === nowPage ? "black" : "rgb(153, 153, 153)", // 현재 페이지인 경우 빨간색으로 변경
            }}
          >
            {pageNumber}
          </li>
        ))}
        <div className="arrowIcon">
          {currentPageGroup < Math.ceil(totalPage / 5) && (
            <li onClick={goToNextPageGroup}>
              <div className="arrowIcon">
                <MdKeyboardDoubleArrowRight size={iconSize} />
              </div>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};
export default Pagination;
