import starFiller from "../../assets/svg/star-filler.svg";
import starGold from "../../assets/svg/star-selected.svg";
import styles from "./Rating.module.scss";

type RatingProps = {
    rating: number;
};

const Rating = ({rating}:RatingProps) => {
  const total = 5;
  const remainingPoints = total - rating;

  const elements = [];

  for (let i = 0; i < rating; i++) {
    elements.push(<img key={`starGold-${i}`} src={starGold} alt="star" />);
  }

  for (let i = 0; i < remainingPoints; i++) {
    elements.push(<img key={`starFiller-${i}`} src={starFiller} alt="star" />);
  }
  return <div className={styles.rating}>{elements}</div>;
};

export default Rating;