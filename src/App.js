import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { MenuDummy } from "./util/MenuDummy";
import EditProduct from "./pages/EditProduct";
import { setCookie, getCookie, removeCookie } from "./util/Cookies";
import axiosInstance from "./api/AxiosInstance";
import OrderProduct from "./pages/OrderProduct";
import AnnouncementDetail from "./components/Announcement/AnnouncementDetail";
import AddAnnouncement from "./components/Announcement/AddAnnouncement";
import EditAnnouncement from "../src/components/Announcement/EditAnnouncement";
import MemberDetails from "./pages/MemberDetails";
import AdminDetails from "./components/Admin/AdminDetails";
import MyPage from "./pages/MyPage";
import CheckPermissions from "./api/CheckPermissions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchHealth = () => {
    axiosInstance
      .get("/health")
      .then((res) => {
        if (res.status === 200) {
          console.log("health GET ", res);
        } else {
          console.error("Unexpected status code:", res.status);
        }
      })
      .catch((error) => {
        console.error("health GET Error:", error);
      });
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(() => {
      fetchHealth();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // 쿠키에서 로그인 상태 확인
    const token = getCookie("adminAccess");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  // 로그인 함수
  const handleLogin = (AuthorizationToken, RefreshToken) => {
    setCookie("adminAccess", AuthorizationToken);
    setCookie("adminRefresh", RefreshToken);
    setIsLoggedIn(true); // 로그인 상태로 설정
  };

  // 로그아웃 함수
  const handleLogout = () => {
    axiosInstance
      .post(`/admin/${getCookie("adminId")}/logout`)
      .then((response) => {
        console.log("로그아웃 성공", response);
      })
      .catch((error) => {
        console.error("로그아웃 에러:", error);
      });

    // 로그아웃 상태로 설정
    removeCookie("adminAccess"); // 쿠키에서 accessToken 제거
    removeCookie("adminRefresh");
    removeCookie("adminId");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />{" "}
        {/* 로그인 상태 및 로그아웃 함수 전달 */}
        {isLoggedIn && <Menu />} {/* 로그인되었을 때만 메뉴 표시 */}
        <Routes>
          {/* 각 메뉴 항목에 대한 라우트를 동적으로 생성합니다 */}

          {/* Error Boundary를 루트 컴포넌트로 사용합니다. */}
          {MenuDummy.map((menu, index) =>
            // 각 메뉴 항목의 URL 및 컴포넌트를 가져와서 라우트를 생성합니다
            menu.children.map((child, childIndex) => {
              const Component = child.component; // 컴포넌트 변수 선언
              return (
                <Route
                  key={`${index}-${childIndex}`}
                  path={child.url}
                  element={<Component />} // 컴포넌트 변수 사용
                />
              );
            })
          )}
          <Route path="/editproduct/:itemId" element={<EditProduct />} />
          <Route path="/orderproduct/:orderId" element={<OrderProduct />} />
          <Route
            path="/announcement/:announcementId"
            element={<AnnouncementDetail />}
          />
          <Route
            path="/announcement/edit/:announcementId"
            element={<EditAnnouncement />}
          />
          <Route path="/member/:memberId" element={<MemberDetails />} />
          <Route path="/Myannouncement/write" element={<AddAnnouncement />} />
          <Route path="/admin/:adminId" element={<AdminDetails />} />

          {/* 추가적으로 정적인 라우트도 설정할 수 있습니다 */}
          <Route path="/" element={<Home />} />
          {/* 로그인 및 로그아웃 페이지 */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notAuthorization" element={<CheckPermissions />} />
          {/* 로그인 페이지에 로그인 함수 전달 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
