import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const CreateStars = ({ stars }) => {
  const totalStars = 5;
  const filledStars = stars;
  const emptyStars = totalStars - stars;

  const starsArray = [];

  for (let i = 0; i < filledStars; i++) {
    starsArray.push(<FaStar key={i} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    starsArray.push(<FaRegStar key={filledStars + i} />);
  }

  return <div className="CreateStars">{starsArray}</div>;
};

export default CreateStars;
