import AddNewProduct from "../pages/AddNewProduct";
import ItemList from "../pages/ItemList";

import SiteContentsManagement from "../pages/SiteContentsManagement";

import OrderList from "../pages/OrderList";
import Announcement from "../pages/Announcement";
import CustomerReviews from "../pages/CustomerReviews";
import QAndA from "../pages/QAndA";

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
      // {
      //   title: "새 주문 확인 및 처리",
      //   url: "/neworder",
      //   component: AddNewProduct,
      // },
      // {
      //   title: "주문 상태 업데이트 - 발송 준비, 배송 중, 완료 등",
      //   url: "/stateorder",
      //   component: AddNewProduct,
      // },
      {
        title: "주문 목록 및 세부 정보 확인",
        url: "/listorder",
        component: OrderList,
      },
    ],
  },
  {
    title: "고객 관리",
    children: [
      // {
      //   title: "고객 정보 관리 - 이름, 이메일, 배송 주소 등",
      //   url: "/customermanagement",
      //   component: AddNewProduct,
      // },

      {
        title: "고객 리뷰 및 평가 관리",
        url: "/reviews",
        component: CustomerReviews,
      },
      {
        title: "Q&A 목록 조회 및 답글 관리",
        url: "/QandA",
        component: QAndA,
      },
    ],
  },
  // {
  //   title: "재고 관리",
  //   children: [
  //     {
  //       title: "제품의 재고량 관리",
  //       url: "/productinventory",
  //       component: AddNewProduct,
  //     },
  //   ],
  // },
  // {
  //   title: "결제 관리",
  //   children: [
  //     {
  //       title: "결제 정보 확인 및 관리",
  //       url: "/paymentinfo",
  //       component: AddNewProduct,
  //     },
  //   ],
  // },
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
      // {
      //   title: "회원가입 및 로그인 관리",
      //   url: "/sginup",
      //   component: AddNewProduct,
      // },
      // {
      //   title: "SEO 관리를 위한 메타 태그 설정",
      //   url: "/metatag",
      //   component: AddNewProduct,
      // },
    ],
  },
];
