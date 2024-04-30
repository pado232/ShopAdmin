import "../styles/MyButton.css";
const MyButton = ({ onClick, buttonText }) => {
  return (
    <div className="MyButton">
      <button onClick={onClick}>
        <span>{buttonText}</span>
      </button>
    </div>
  );
};

export default MyButton;
