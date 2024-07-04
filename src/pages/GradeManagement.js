import { useState, useEffect } from "react";
import Container from "../components/Container";
import axiosInstance from "../api/AxiosInstance";
import MyButton from "../components/MyButton";

import { FaPlus } from "react-icons/fa";

import "../styles/ItemList.css";

const GradeManagement = () => {
  const [gradeList, setGradeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempGrade, setTempGrade] = useState({});
  const [addGrade, setAddGrade] = useState({
    newGradeName: "",
    newGradePrice: "",
    newRewardRate: "",
  });

  const fetchGradeList = () => {
    axiosInstance
      .get(`/admin/gradeList`)
      .then((res) => {
        const gradeListData = res.data;
        setGradeList(gradeListData);
        console.log("GradeList GET", res);
      })
      .catch((error) => {
        console.log("GradeList Error", error);
      });
  };

  useEffect(() => {
    fetchGradeList();
  }, []);

  const fetchEditGrade = (editedGrade) => {
    const { gradeId, gradeName, rewardRate } = editedGrade;

    axiosInstance
      .patch(`/admin/grade`, {
        gradeId: gradeId,
        gradeName: gradeName,
        rewardRate: rewardRate,
      })
      .then((res) => {
        console.log("EditGrade PATCH", res);
        fetchGradeList();
      })
      .catch((error) => {
        console.log("EditGrade PATCH Error", error);
      });
  };

  const fetchAddGrade = () => {
    axiosInstance
      .post(`/admin/grade`, {
        gradeName: addGrade.newGradeName,
        gradePrice: addGrade.newGradePrice.replace(/,/g, ""),
        rewardRate: addGrade.newRewardRate,
      })
      .then((res) => {
        console.log("AddGrade POST", res);
        fetchGradeList();
        setAddGrade({
          newGradeName: "",
          newGradePrice: "",
          newRewardRate: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          if (
            error.response.data ===
            "이미 존재하는 등급 기준 금액입니다. 다른 등급 기준 금액을 사용해주세요"
          ) {
            window.alert(
              "이미 존재하는 등급 기준 금액입니다. 다른 등급 기준 금액을 사용해주세요."
            );
          } else {
            window.alert("연 구매 금액이 0인 값은 추가할 수 없습니다.");
          }
        } else {
          window.alert("새 등급 추가 도중 오류가 발생했습니다.");
        }
        console.log("AddGrade POST Error", error);
      });
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTempGrade({ ...gradeList[index] });
  };

  const handleSaveClick = () => {
    // 할인율이 100을 초과하는지 확인하고 초과하는 경우에는 경고를 띄움
    if (parseInt(tempGrade.rewardRate) > 100) {
      window.alert("할인율은 100을 초과할 수 없습니다.");
    } else {
      fetchEditGrade(tempGrade);
      setEditingIndex(null);
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setTempGrade({});
  };

  const handleRemoveClick = (gradeId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axiosInstance
        .delete(`/admin/grade?gradeId=${gradeId}`)
        .then((res) => {
          console.log("DeleteGrade DELETE", res);
          fetchGradeList();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            window.alert("해당 등급은 삭제할 수 없습니다.");
          } else {
            window.alert("삭제 도중 오류가 발생했습니다.");
          }
          console.log("DeleteGrade DELETE Error", error);
        });
    } else {
    }
  };

  const handleAddGrade = () => {
    // 할인율이 100을 초과하는지 확인하고 초과하는 경우에는 경고를 띄움
    if (parseInt(addGrade.newRewardRate) > 100) {
      window.alert("할인율은 100을 초과할 수 없습니다.");
    } else {
      fetchAddGrade();
    }
  };

  const valueStateChange = (e) => {
    const { name, value } = e.target;

    if (name === "rewardRate") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      const numericValue = parseInt(value, 10);
      if (numericValue > 100) {
        setTempGrade((prevAddGrade) => ({
          ...prevAddGrade,
          [name]: "100",
        }));
        return;
      }
    }

    setTempGrade({
      ...tempGrade,
      [name]: value,
    });
  };

  const addValueStateChange = (e) => {
    const { name, value } = e.target;

    // newRewardRate는 숫자만 허용하고, 0에서 100 사이의 값만 허용
    if (name === "newRewardRate") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      const numericValue = parseInt(value, 10);
      if (numericValue > 100) {
        setAddGrade((prevAddGrade) => ({
          ...prevAddGrade,
          [name]: "100",
        }));
        return;
      }
    }

    if (name === "newGradePrice") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      setAddGrade((prevAddGrade) => ({
        ...prevAddGrade,
        [name]: formattedValue,
      }));
    } else {
      setAddGrade((prevAddGrade) => ({
        ...prevAddGrade,
        [name]: value,
      }));
    }
  };

  return (
    <div className="ItemList">
      <Container>
        <h2>고객 등급 관리</h2>
        <div className="table">
          <h3>새 등급 추가하기</h3>
          <table className="addtable">
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
            </colgroup>
            <thead>
              <tr>
                <th></th>
                <th>등급명</th>
                <th>등급별 연 구매금액</th>
                <th>등급별 적립률</th>
                <th>수정하기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FaPlus size={11 * 2} />
                </td>
                <td>
                  <div>
                    <input
                      type="text"
                      placeholder="등급명 입력"
                      name="newGradeName"
                      value={addGrade.newGradeName}
                      onChange={addValueStateChange}
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <input
                      type="text"
                      placeholder="연 구매금액 입력"
                      name="newGradePrice"
                      value={addGrade.newGradePrice}
                      onChange={addValueStateChange}
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <input
                      type="text"
                      placeholder="할인률 입력"
                      name="newRewardRate"
                      value={addGrade.newRewardRate}
                      onChange={addValueStateChange}
                    />{" "}
                    %
                  </div>
                </td>
                <td>
                  <div className="btnbox">
                    <MyButton
                      buttonText={"새 등급 저장하기"}
                      onClick={handleAddGrade}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table">
          <h3>등급 LIST</h3>
          <table>
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 200 }} />
              <col style={{ width: 250 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>등급아이디</th>
                <th>등급명</th>
                <th>등급별 연 구매금액</th>
                <th>등급별 적립률</th>
                <th>수정하기</th>
              </tr>
            </thead>
            <tbody>
              {gradeList.map((grade, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{grade.gradeId}</td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name="gradeName"
                        value={tempGrade.gradeName}
                        onChange={valueStateChange}
                      />
                    ) : (
                      grade.gradeName
                    )}
                  </td>
                  <td>{grade.gradePrice.toLocaleString()}</td>
                  <td>
                    {editingIndex === index ? (
                      <div>
                        <input
                          type="text"
                          name="rewardRate"
                          value={tempGrade.rewardRate}
                          onChange={valueStateChange}
                        />
                        {" %"}
                      </div>
                    ) : (
                      <div>{grade.rewardRate} %</div>
                    )}
                  </td>
                  <td>
                    <div>
                      {editingIndex === index ? (
                        <div className="btnbox">
                          <MyButton
                            buttonText={"저장하기"}
                            onClick={handleSaveClick}
                          />
                          <MyButton
                            buttonText={"취소"}
                            onClick={handleCancelClick}
                          />
                        </div>
                      ) : (
                        <div className="btnbox">
                          <MyButton
                            buttonText={"수정하기"}
                            onClick={() => handleEditClick(index)}
                          />
                          <MyButton
                            buttonText={"삭제하기"}
                            onClick={() => handleRemoveClick(grade.gradeId)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default GradeManagement;
