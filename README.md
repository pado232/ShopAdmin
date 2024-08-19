# 🛒 RealMoment Shopping-Mall Admin

#### [RealMement Shopping-Mall Admin 바로가기](https://real-moment.kro.kr/)

### + RealMement Shopping-Mall

#### [RealMement Shopping-Mall 바로가기](https://real-moment.kro.kr/)

#### [Github](https://github.com/pado232/RealMoment)

</br>

## ❓❗ 쇼핑몰 웹사이트를 선택한 이유

### 기술적 도전과 팀 협업 경험

쇼핑몰 웹 사이트에서 다양한 기술을 통합하고 전반적인 시스템을 이해하기에 적합하다고 판단하여 진행하게 되었습니다.</br>
React 프레임워크를 사용하여 사용자 인터페이스를 개발하고, REST API를 통해 백엔드와의 통신을 구현하면서, 실시간 데이터 처리와 상태 관리를 효율적으로 처리할 수 있는 능력을 키우고자 했습니다.</br>
또한 백엔드와 협업하여 진행하는 만큼, 다양한 웹 애플리케이션 구성요소의 상호작용에 대해 배우고 효율적인 커뮤니케이션 능력을 기르는데 큰 도움이 되었습니다.

</br>

## 📢 웹사이트 설명

쇼핑몰을 관리하기 위해 제작된 관리자 웹 사이트로 관리자가 판매를 위해 필요한 정보들을 추가, 수정, 삭제할 수 있습니다.</br>
관리자가 쇼핑몰을 효율적으로 관리할 수 있도록 항목별로 해당 작업들이 나누어져 있고, 작업을 완료하면 서버에 저장됩니다.</br>
저장된 정보들은 쇼핑몰 웹 사이트에 반영됩니다.

</br>

## 📚 상세 정보

### 개발 인원

- **프론트엔드**: 1명
- **백엔드**: 1명

### 역할

- 전체적인 프론트엔드 영역

### 일정

- **2024.01.10~ 2024.07.07**
  - **기획**: 1개월
  - **개발**: 3개월
  - **유지보수**: 진행중

### 기능의 흐름

- **데이터 전송방식**: REST API
- **데이터의 형식**: JSON 형식
- **데이터 통신 프로토콜**: HTTP/HTTPS (RESTful API)

### 사용된 기술

- **프로그래밍 언어**: Javascript
- **프레임워크**: React
- **통합 개발 환경(IDE)**: Visual Studio Code
- **버전 관리 및 협업**: Git, GitHub
- **상태관리**: Context API, React Router
- **스타일링**: CSS

</br>

## 🩺 문제점 & 🩹 문제 해결 방안

#### [>> 노션에 방문해 자세한 내용을 확인해보세요.](https://www.notion.so/Shopping-Mall-Project-83cac7f2de6f47b48037173179d5c961)

</br>

## 🎨 주요 기능

모든 페이지는 로그인 시 열람 가능하고, 권한별로 페이지에 대한 권한이 부여됩니다. 어떤 항목에 대한 권한이 없는 관리자라면 해당 항목에 대해 조회, 수정, 삭제가 불가합니다. 권한의 종류에는 사원(ADMIN, CUSTOMER), 이사(OPERATOR), 대표(REPRESENTATIVE)가 존재합니다.

### 제품 관리

#### 새 제품 추가

새로운 제품을 등록하기 위해 정보를 입력하고 입력한 정보는 서버에 보내져 저장됩니다.

#### 제품 목록 조회 및 편집

순서, 카테고리, 진열 여부에 대해 필터할 수 있으며, 상품명을 검색하여 조회 할 수 있습니다. <br/>
또한 '상세보기'에 들어가 해당 상품에 대한 상세한 정보, 리뷰, Q&A를 열람하고 편집이 가능합니다.

</br>

### 주문 관리

#### 주문 목록 및 세부 정보 확인

회원이 주문한 상품 결제상태, 기간에 따라 필터할 수 있고, 상품명, 아이디, 주문고유번호를 검색하여 조회 할 수 있습니다. <br/>
'상세보기'에 들어가 주문애 대한 상세정보를 열람하고 해당 주문 상태를 수정할 수 있습니다.

</br>

### 회원 관리

#### 회원 목록 조회

순서, 계정 탈퇴 여부, 등급별로 필터할 수 있으며, 회원 아이디을 검색하여 조회 할 수 있습니다.

</br>

### 문의/평가 관리

#### 1:1 문의 조회 및 답변 관리

답변 존재 여부를 필터할 수 있으며, 회원이 문의한 글에 답변을 추가, 삭제, 수정할 수 있습니다.

#### Q&A 목록 조회 및 답변 관리

답변 존재 여부를 필터할 수 있으며, 회원이 문의한 글에 답변을 추가, 삭제, 수정할 수 있습니다.

#### 고객 리뷰 및 평가 관리

별점별로 필터할 수 있으며, 회원이 작성한 리뷰를 열람할 수 있습니다.

</br>

### 사이트 관리

#### 공지사항 관리

공지사항을 작성, 수정, 삭제할 수 있습니다.

#### 카테고리 및 쇼핑몰 이미지 관리

쇼핑몰에 나타날 카테고리와 쇼핑몰 웹 사이트에 들어갈 이미지를 추가, 수정, 삭제할 수 있습니다.<br/>
카테고리와 저장한 이미지들은 웹 사이트에 적용되어 들어갑니다.

#### 고객 등급 관리

등급을 추가, 수정, 삭제할 수 있습니다. 해당 등급별로 쇼핑몰 웹 사이트에서 상품 결제 시 할인이 들어갑니다.

</br>

### 관리자 가입 관리

#### 관리자 가입

대표에게만 권한이 주어지고, 관리자를 가입할 수 있습니다.

</br>

### 마이페이지

로그인한 관리자에 대한 정보 조회 및 편집이 가능합니다.

</br>

### 로그인/로그아웃

모든 페이지는 로그인해야 열람이 가능하고 로그아웃 시에는 home으로 돌아갑니다.

</br>
