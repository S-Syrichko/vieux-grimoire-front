import React, { useState } from "react";
import starGold from "../../assets/svg/star-selected.svg";
import starFiller from "../../assets/svg/star-filler.svg";

const Rater = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating: React.SetStateAction<number>) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          onClick={() => handleStarClick(star)}
          style={{ cursor: "pointer" }}
          src={star <= rating ? starGold : starFiller}
        />
      ))}
    </div>
  );
};

export default Rater;
