import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";

import Container from "../components/Container";
import Pagination from "../components/Pagination";
import MyButton from "../components/MyButton";
import CategoryChooseAll from "../components/CategoryChooseAll";

import "../styles/ItemList.css";

const ItemList = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isSell, setIsSell] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [itemSort, setItemSort] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchItemList = () => {
      const queryParams = new URLSearchParams({
        itemSort: itemSort,
        categoryId: selectedCategoryId ? parseInt(selectedCategoryId) : "",
        itemName: searchTerm,
        isSell: isSell,
        delete: false,
        nowPage,
      });

      console.log(queryParams.toString());
      axiosInstance
        .get(`/admin/itemList/view?${queryParams.toString()}`) // axios로 변경
        .then((response) => {
          const data = response.data;
          setItemList(data.itemList);
          setTotalPage(data.totalPage);
          setNowPage(data.nowPage);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchItemList();
  }, [nowPage, isDelete, searchTerm, selectedCategoryId, itemSort, isSell]);

  const handleDelete = (itemId, itemName) => {
    const shouldDelete = window.confirm(
      `${itemName}(을)를 정말 삭제하시겠습니까?`
    );
    if (shouldDelete) {
      axiosInstance
        .delete(`/admin/item?itemId=${itemId}`) // axios로 변경
        .then((response) => {
          if (response.status === 200) {
            setIsDelete(!isDelete); // Delete 후 상태 변경
            console.log("Item deleted successfully.");
          } else {
            throw new Error("Failed to delete item.");
          }
        })
        .catch((error) => {
          if (error.response?.data?.message === "NOT_AUTHORIZATION") {
            window.alert("상품을 삭제할 수 있는 권한이 없습니다.");
          } else {
            console.error("Error:", error);
          }
        });
    } else {
      console.log("삭제가 취소되었습니다.");
    }
  };

  return (
    <div className="ItemList">
      <Container>
        <h2>상품 목록 조회</h2>
        <div className="select_box">
          <div className="select_sort">
            <select
              name="sort"
              value={itemSort}
              onChange={(e) => setItemSort(e.target.value)}
            >
              <option value="new">최신순</option>
              <option value="sell">판매량순</option>
              <option value="low">낮은 가격순</option>
              <option value="high">높은 가격순</option>
              <option value="sale">할인률순</option>
            </select>
          </div>

          <div className="select_category">
            <CategoryChooseAll
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </div>

          <div className="select_delete">
            <select
              name="sell"
              value={isSell}
              onChange={(e) => {
                setIsSell(e.target.value);
                console.log(isSell);
              }}
            >
              <option value={true}>진열 상품</option>
              <option value={false}>진열 대기 상품</option>
            </select>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="상품명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>검색</button>
          </div>
        </div>

        <div className="table">
          <table>
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 150 }} />
              <col style={{ width: 350 }} />
              <col style={{ width: 100 }} />

              <col style={{ width: 80 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 300 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>상품번호</th>
                <th>대표 이미지</th>
                <th>상품명</th>
                <th>가격</th>

                <th>할인률</th>
                <th>할인가</th>
                <th>판매 가격</th>
                <th>판매 여부</th>
                <th>수익</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, index) => (
                <tr key={index}>
                  <td>{10 * nowPage + index - 9}</td>
                  <td>{item.itemId}</td>
                  <td>
                    <div>
                      <div>
                        <img
                          style={{
                            margin: 10,
                            width: 80,
                            height: 80,
                          }}
                          src={item.mainImg}
                          alt="상품 대표 이미지"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>{item.discountRate}%</td>
                  <td>{item.discountPrice.toLocaleString()}</td>
                  <td>{item.sellPrice.toLocaleString()}</td>
                  <td>{item.sell ? "판매 중" : "판매 중지"}</td>
                  <td>{item.revenue.toLocaleString()}</td>
                  <td>
                    <div className="btnbox">
                      <div>
                        <MyButton
                          buttonText={"상세보기"}
                          onClick={() =>
                            navigate(`/editproduct/${item.itemId}`)
                          } // 프로그래밍 방식 라우팅
                        />
                      </div>
                      <div>
                        <MyButton
                          buttonText={"삭제하기"}
                          onClick={() => handleDelete(item.itemId, item.name)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <Pagination
            setNowPage={setNowPage}
            nowPage={nowPage}
            totalPage={totalPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default ItemList;
