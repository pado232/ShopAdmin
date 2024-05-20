import Container from "../components/Container";
import CategorySetting from "../components/cateory/CategorySetting.js";
import { useState } from "react";

const SiteContentsManagement = () => {
  const [categoryToggle, setCategoryToggle] = useState(false);

  const handleToggleCategory = () => {
    setCategoryToggle(!categoryToggle);
  };

  return (
    <div className="SiteContentsManagement">
      <Container>
        <button onClick={handleToggleCategory}>카테고리 열기</button>
        {categoryToggle && <CategorySetting />}
      </Container>
    </div>
  );
};

export default SiteContentsManagement;
