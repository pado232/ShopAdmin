import { useEffect, useState } from "react";

import axiosInstance from "../api/AxiosInstance";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import Pagination from "../components/Pagination";

import "../styles/OrderList.css";
import { getCookie } from "../util/Cookies";

const OneOnOne = () => {
  const [oneOnOneList, setOneOnOneList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [status, setStatus] = useState("");

  const [commentId, setCommentId] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [createIndex, setCreateIndex] = useState(null);
  const [addContent, setAddContent] = useState("");

  const fetchOneOnOneList = () => {
    const queryParams = new URLSearchParams({
      // loginId: ,
      isAnswer: status,
      nowPage: nowPage,
    });

    axiosInstance
      .get(`/admin/oneOnOneList/view?${queryParams.toString()}`)
      .then((response) => {
        const data = response.data;
        const oneOnOneListData = data.oneOnOneList;
        const totalPageData = data.totalPage;
        const nowPageData = data.nowPage;

        setOneOnOneList(oneOnOneListData);
        setTotalPage(totalPageData);
        setNowPage(nowPageData);

        console.log("oneOnOneList GET ", response);
      })
      .catch((error) => {
        console.error("oneOnOneList GET Error:", error);
      });
  };

  const fetchOneOnOneEdit = (id) => {
    axiosInstance
      .get(`/admin/${getCookie("Id")}/comment?commentId=${id}`)
      .then((response) => {
        const data = response.data;
        const commentIdData = data.commentId;
        const contentData = data.content;

        setCommentId(commentIdData);
        setContent(contentData);

        console.log("comment GET ", response);
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("문의에 답변할 수 있는 권한이 없습니다.");
          setEditIndex(null);
        } else {
          console.error("comment GET Error:", error);
        }
      });
  };

  useEffect(() => {
    fetchOneOnOneList();
  }, [status, nowPage]);

  const handleEdit = (index) => {
    const oneOnOne = oneOnOneList[index];
    const id = oneOnOne.comment.commentId;

    if (editIndex === index) {
      setEditIndex(null);
      setContent("");
    } else {
      setEditIndex(index);
      fetchOneOnOneEdit(id);
    }
  };

  const handleEditSubmit = () => {
    axiosInstance
      .patch(`/admin/${getCookie("Id")}/comment`, {
        commentId: commentId,
        content: content,
      })
      .then((response) => {
        fetchOneOnOneList();
        setEditIndex(null);
        setContent("");
        console.log("comment PUT ", response);
      })
      .catch((error) => {
        console.error("comment PUT Error:", error);
      });
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/admin/${getCookie("Id")}/comment?commentId=${id}`)
      .then((response) => {
        fetchOneOnOneList();
        console.log("comment DELETE ", response);
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("문의에 대한 답변을 삭제할 수 있는 권한이 없습니다.");
        } else {
          console.error("comment GET Error:", error);
        }
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

  const handleCreateSubmit = (oneOnOneId) => {
    console.log("oneOnOneId", oneOnOneId);
    axiosInstance
      .post(`/admin/${getCookie("Id")}/comment`, {
        oneOnOneId: oneOnOneId,
        content: addContent,
      })
      .then((response) => {
        fetchOneOnOneList();
        setCreateIndex(null);
        setAddContent("");
        console.log("comment create POST", response);
      })
      .catch((error) => {
        if (error.response?.data?.message === "NOT_AUTHORIZATION") {
          window.alert("문의에 대한 답변을 작성할 수 있는 권한이 없습니다.");
          setCreateIndex(null);
          setAddContent("");
        } else {
          console.error("comment GET Error:", error);
        }
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
        <h2>1:1 문의 목록 조회</h2>
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
              {oneOnOneList.map((oneOnOne, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{oneOnOne.oneOnOneId}</div>
                  </td>
                  <td>
                    <div>{oneOnOne.loginId}</div>
                  </td>
                  <td>
                    <div className="title">{oneOnOne.title}</div>
                    <div className="answer">{oneOnOne.content}</div>
                  </td>
                  <td>
                    {oneOnOne.comment ? (
                      <div style={{ marginBottom: 10 }}>
                        {editIndex !== index ? (
                          <div>
                            <div className="answer">
                              <div>{oneOnOne.comment.content}</div>
                            </div>
                            <div className="btnbox">
                              <MyButton
                                buttonText={"수정하기"}
                                onClick={() => handleEdit(index)}
                              />
                              <MyButton
                                buttonText={"삭제하기"}
                                onClick={() =>
                                  handleDelete(oneOnOne.comment.commentId)
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
                                onClick={() =>
                                  handleCreateSubmit(oneOnOne.oneOnOneId)
                                }
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
export default OneOnOne;
