import AddNewProduct from "../pages/AddNewProduct";
import ItemList from "../pages/ItemList";

import SiteContentsManagement from "../pages/SiteContentsManagement";

import OrderList from "../pages/OrderList";
import Announcement from "../pages/Announcement";
import CustomerReviews from "../pages/CustomerReviews";
import QAndA from "../pages/QAndA";
import OneOnOne from "../pages/OneOnOne";
import MemberManagement from "../pages/MemberManagement.js";

export const MenuDummy = [
  {
    title: "제품 관리",
    children: [
      {
        title: "새 제품 추가",
        url: "/addnewproduct",
        component: AddNewProduct,
      },
      {
        title: "제품 목록 조회 및 편집",
        url: "/productlist",
        component: ItemList,
      },
    ],
  },
  {
    title: "주문 관리",
    children: [
      {
        title: "주문 목록 및 세부 정보 확인",
        url: "/listorder",
        component: OrderList,
      },
    ],
  },
  {
    title: "회원 관리",
    children: [
      {
        title: "회원 목록 조회",
        url: "/member",
        component: MemberManagement,
      },
    ],
  },
  {
    title: "문의/평가 관리",
    children: [
      {
        title: "1:1 문의 조회 및 답변 관리",
        url: "/OneOnOne",
        component: OneOnOne,
      },
      {
        title: "Q&A 목록 조회 및 답변 관리",
        url: "/QandA",
        component: QAndA,
      },
      {
        title: "고객 리뷰 및 평가 관리",
        url: "/reviews",
        component: CustomerReviews,
      },
    ],
  },
  {
    title: "사이트 관리",
    children: [
      {
        title: "공지사항 관리",
        url: "/announcement",
        component: Announcement,
      },

      {
        title: "웹사이트 콘텐츠 관리 - 배너, 푸터, 메뉴 등",
        url: "/sitecontent",
        component: SiteContentsManagement,
      },
    ],
  },
];
