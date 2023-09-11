import { useState, useEffect } from "react";
import starFiller from "../../assets/svg/star-filler.svg";
import starGold from "../../assets/svg/star-selected.svg";
import styles from "./Rating.module.scss";

type RatingProps = {
  size: "small" | "medium" | "large";
  isReadOnly?: boolean;
  rating?: number;
  register?: any;
  onSelect?: (selectedRating: number) => void;
};

const Rating = ({
  size,
  isReadOnly,
  rating,
  register,
  onSelect,
}: RatingProps) => {
  const [selectedRating, setSelectedRating] = useState(rating || 0);
  const [selectedInput, setSelectedInput] = useState<number>();

  useEffect(() => {
    setSelectedRating(rating || 0);
  }, [rating]);

  const handleStarClick = (starIndex: number) => {
    if (!isReadOnly && onSelect) {
      // const starInput = <input type="radio">
      //   value={starIndex} type="hidden" {...register("rating")}/>
      setSelectedRating(starIndex);
      onSelect(starIndex);
    }
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <>
          <img
            key={`img-${star}`}
            src={star <= selectedRating ? starGold : starFiller}
            alt={star <= selectedRating ? "Filled star" : "Empty star"}
            className={styles[size]}
            style={{ cursor: isReadOnly ? "default" : "pointer" }}
            onClick={() => handleStarClick(star)}
          />
          <input
            key={`radio-${star}`}
            type="radio"
            style={{ display: "none" }}
            {...(register && register("rating"))}
          />
        </>
      ))}
    </div>
  );
};

export default Rating;
