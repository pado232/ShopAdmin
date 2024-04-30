import "../styles/Header.css";

const Header = () => {
  return (
    <header className="Header">
      <div className="home">
        <a href="/">HOME</a>
      </div>
      <div className="head_title">
        <h2>관리자 페이지</h2>
      </div>

      <div className="login">
        <a href="/login">LOGIN</a>
      </div>
    </header>
  );
};
export default Header;
