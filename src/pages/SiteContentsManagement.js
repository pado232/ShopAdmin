import Container from "../components/Container";
import CategorySetting from "../components/cateory/CategorySetting.js";
import { useState } from "react";

import "../styles/SiteContentManagement.css";

const SiteContentsManagement = () => {
  const [selectedMenu, setSelectedMenu] = useState("category");

  return (
    <div className="SiteContentsManagement">
      <Container>
        <h2>웹 사이트 콘텐츠 관리</h2>
        <div className="menu">
          <ul>
            {/* 각 li를 클릭했을 때 해당하는 메뉴를 선택하도록 onClick 핸들러를 사용 */}
            <li
              className={selectedMenu === "category" ? "clicked" : ""}
              onClick={() => setSelectedMenu("category")}
            >
              카테고리
            </li>
            <li
              className={selectedMenu === "something" ? "clicked" : ""}
              onClick={() => setSelectedMenu("something")}
            >
              메인도 바꿔볼래?
            </li>
          </ul>
        </div>

        {selectedMenu === "category" && <CategorySetting />}
        {selectedMenu === "something" && (
          <div>
            <h2>메인은 안바꿀거지롱</h2>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SiteContentsManagement;
