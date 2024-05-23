import "../styles/Header.css";

const Header = ({ isLoggedIn, onLogout }) => {
  const handleToggle = () => {
    onLogout();
  };
  return (
    <header className="Header">
      <div className="home">
        <a href="/">HOME</a>
      </div>
      <div className="head_title">
        <h2>관리자 페이지</h2>
      </div>

      {isLoggedIn ? (
        <div className="login">
          <div>
            <a href="/mypage">My_Page</a>
          </div>
          <div>
            <a href="/" onClick={handleToggle}>
              LOGOUT
            </a>
          </div>
        </div>
      ) : (
        <div className="logout">
          <a href="/login">LOGIN</a>
        </div>
      )}
    </header>
  );
};
export default Header;
