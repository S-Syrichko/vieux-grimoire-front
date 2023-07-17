import { useState } from "react";
import starFiller from "../../assets/svg/star-filler.svg";
import starGold from "../../assets/svg/star-selected.svg";
import styles from "./Rating.module.scss";

type RatingProps = {
    size: "small" | "medium" | "large";
    isReadOnly?: boolean;
    rating?: number;
    onSelect?: (selectedRating: number) => void;
};

const Rating = ({size, isReadOnly, rating, onSelect}:RatingProps) => {
  const [selectedRating, setSelectedRating] = useState(rating? rating : 0);

  const handleStarClick = (starIndex: number) => {
    if (!isReadOnly && onSelect) {
      setSelectedRating(starIndex);
      onSelect(starIndex);
    }
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          onClick={() => handleStarClick(star)}
          className={styles[size]}
          style={{ cursor: isReadOnly ? "default" : "pointer" }}
          src={star <= selectedRating ? starGold : starFiller}
          alt={star <= selectedRating ? "Filled star" : "Empty star"}
        />
      ))}
    </div>
  );
};

export default Rating;