import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { MenuDummy } from "./util/MenuDummy";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Routes>
          {/* 각 메뉴 항목에 대한 라우트를 동적으로 생성합니다 */}
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
          {/* 추가적으로 정적인 라우트도 설정할 수 있습니다 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
