import React from "react";
import { NavLink } from "react-router-dom";
import { MenuDummy } from "../util/MenuDummy";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <div className="Menu">
      <ul>
        {MenuDummy.map((item, index) => (
          <li key={index}>
            {item.title}
            <ul>
              {item.children.map((subitem, subindex) => (
                <li key={subindex}>
                  <NavLink to={subitem.url}>{subitem.title}</NavLink>
                  {/* 없앴을 떄 문제 해결해보기!! <NavLink to={subitem.url} activeclassname="active"></NavLink> */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
