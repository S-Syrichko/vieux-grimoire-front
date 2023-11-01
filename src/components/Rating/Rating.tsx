import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import starFiller from "../../assets/svg/star-filler.svg";
import starGold from "../../assets/svg/star-selected.svg";
import styles from "./Rating.module.scss";

export type RatingProps = {
  size: "small" | "medium" | "large";
  isReadOnly?: boolean;
  rating?: number;
  onSelect?: (selectedRating: number) => void;
};

const Rating = ({ size, isReadOnly, rating, onSelect }: RatingProps) => {
  const [selectedRating, setSelectedRating] = useState(rating || 0);

  useEffect(() => {
    setSelectedRating(rating || 0);
  }, [rating]);

  const handleStarClick = (starIndex: number) => {
    if (!isReadOnly && onSelect) {
      setSelectedRating(starIndex);
      onSelect(starIndex);
    }
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star}>
          <img
            key={`img-${star}`}
            src={star <= selectedRating ? starGold : starFiller}
            alt={star <= selectedRating ? "Filled star" : "Empty star"}
            className={`${styles[size]} ${
              isReadOnly ? "" : styles["star-interaction"]
            }`}
            style={{ cursor: isReadOnly ? "default" : "pointer" }}
            onClick={() => handleStarClick(star)}
          />
        </div>
      ))}
    </div>
  );
};

export default Rating;
