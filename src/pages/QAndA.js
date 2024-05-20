import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import Pagination from "../components/Pagination";

import "../styles/OrderList.css";
import { getCookie } from "../util/Cookies";

const QAndA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemId, setItemId] = useState(location.state?.itemId);
  const [itemName, setItemName] = useState(location.state?.name);

  const [itemQAList, setItemQAList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [status, setStatus] = useState("");

  const [qaCommentId, setQaCommentId] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [createIndex, setCreateIndex] = useState(null);
  const [addContent, setAddContent] = useState("");

  const fetchQAndAList = () => {
    const queryParams = new URLSearchParams({
      itemId: itemId === undefined ? "" : itemId,
      isAnswer: status,
      nowPage: nowPage,
    });

    axiosInstance
      .get(`/admin/QAList/view?${queryParams.toString()}`)
      .then((response) => {
        const data = response.data;
        const itemQAListData = data.itemQAList;
        const totalPageData = data.totalPage;
        const nowPageData = data.nowPage;

        setItemQAList(itemQAListData);
        setTotalPage(totalPageData);
        setNowPage(nowPageData);

        console.log("itemQAList GET ", response);
      })
      .catch((error) => {
        console.error("itemQAList GET Error:", error);
      });
  };

  const fetchQAndAEdit = (id) => {
    axiosInstance
      .get(`/admin/${getCookie("Id")}/QAComment/data?qaCommentId=${id}`)
      .then((response) => {
        const data = response.data;
        const setQaCommentIdData = data.qaCommentId;
        const contentData = data.content;

        setQaCommentId(setQaCommentIdData);
        setContent(contentData);

        console.log("QAComment GET ", response);
      })
      .catch((error) => {
        console.error("QAComment GET Error:", error);
      });
  };

  useEffect(() => {
    fetchQAndAList();
  }, [status, nowPage, itemId]);

  const handleResetItemId = () => {
    setItemId("");
    setItemName("");
  };

  const handleEdit = (index) => {
    const qa = itemQAList[index];
    const id = qa.qaComment.qaCommentId;

    if (editIndex === index) {
      setEditIndex(null);
      setContent("");
    } else {
      setEditIndex(index);
      fetchQAndAEdit(id);
    }
  };

  const handleEditSubmit = () => {
    axiosInstance
      .patch(`/admin/${getCookie("Id")}/QAComment`, {
        qaCommentId: qaCommentId,
        content: content,
      })
      .then((response) => {
        fetchQAndAList();
        setEditIndex(null);
        setContent("");
        console.log("QAComment PUT ", response);
      })
      .catch((error) => {
        console.error("QAComment PUT Error:", error);
      });
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/admin/${getCookie("Id")}/QAComment?qaCommentId=${id}`)
      .then((response) => {
        fetchQAndAList();
        console.log("QAComment DELETE ", response);
      })
      .catch((error) => {
        console.error("QAComment DELETE Error:", error);
      });
  };

  const handleCreate = (index) => {
    if (createIndex === index) {
      setCreateIndex(null);
      setAddContent("");
    } else {
      setCreateIndex(index);
    }
  };

  const handleCreateSubmit = (itemQAId) => {
    axiosInstance
      .post(`/admin/${getCookie("Id")}/QAComment`, {
        itemQAId: itemQAId,
        content: addContent,
      })
      .then((response) => {
        fetchQAndAList();
        setCreateIndex(null);
        setAddContent("");
        console.log("QAComment create POST", response);
      })
      .catch((error) => {
        console.error("QAComment create POST Error:", error);
      });
  };

  const contentChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  const addContentChange = (e) => {
    const { value } = e.target;
    setAddContent(value);
  };

  return (
    <div className="OrderList">
      <Container>
        <h2>Q&A 목록 조회</h2>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          {itemId === "" ? (
            ""
          ) : (
            <div>
              <div style={{ marginBottom: 20, fontSize: 17 }}>
                <strong>{itemName}</strong>에 대한 Q&A
              </div>
              <div className="btnbox">
                <MyButton
                  buttonText={"상품 전체에 대한 Q&A 보기"}
                  onClick={handleResetItemId}
                />
                <MyButton
                  buttonText={"상품 수정으로 돌아가기"}
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="select_box">
          <div className="select_status">
            <select
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                console.log(status);
              }}
            >
              <option value={""}>전체 답변</option>
              <option value={"false"}>답변 없음</option>
              <option value={"true"}>답변 완료</option>
            </select>
          </div>
        </div>

        <div className="table">
          <table>
            <colgroup>
              <col style={{ width: 50 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 400 }} />
              <col style={{ width: 400 }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>고유번호</th>
                <th>아이디</th>
                <th>제목 / 내용</th>
                <th>관리자 답변</th>
              </tr>
            </thead>
            <tbody>
              {itemQAList.map((QA, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{QA.itemQAId}</div>
                  </td>
                  <td>
                    <div>{QA.loginId}</div>
                  </td>
                  <td>
                    <div className="title">{QA.title}</div>
                    <div className="answer">{QA.content}</div>
                  </td>
                  <td>
                    {QA.qaComment ? (
                      <div style={{ marginBottom: 10 }}>
                        {editIndex !== index ? (
                          <div>
                            <div className="answer">
                              <div>{QA.qaComment.content}</div>
                            </div>
                            <div className="btnbox">
                              <MyButton
                                buttonText={"수정하기"}
                                onClick={() => handleEdit(index)}
                              />
                              <MyButton
                                buttonText={"삭제하기"}
                                onClick={() =>
                                  handleDelete(QA.qaComment.qaCommentId)
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="answer">
                              <div>
                                <textarea
                                  name="content"
                                  value={content}
                                  onChange={contentChange}
                                />
                              </div>
                            </div>
                            <div className="btnbox">
                              <MyButton
                                buttonText={"저장하기"}
                                onClick={handleEditSubmit}
                              />
                              <MyButton
                                buttonText={"취소"}
                                onClick={() => handleEdit(index)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {createIndex !== index ? (
                          <div className="btnbox">
                            <MyButton
                              buttonText={"작성하기"}
                              onClick={() => handleCreate(index)}
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="answer">
                              <div>
                                <textarea
                                  name="addContent"
                                  value={addContent}
                                  onChange={addContentChange}
                                />
                              </div>
                            </div>
                            <div className="btnbox">
                              <MyButton
                                buttonText={"저장하기"}
                                onClick={() => handleCreateSubmit(QA.itemQAId)}
                              />
                              <MyButton
                                buttonText={"취소"}
                                onClick={() => handleCreate(index)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
export default QAndA;
