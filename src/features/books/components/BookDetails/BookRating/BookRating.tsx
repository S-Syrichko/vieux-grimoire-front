import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { rateBookAPI } from "../../../../../app/api";
import Button from "../../../../../components/Button/Button";
import Rating from "../../../../../components/Rating/Rating";
import { Book } from "../../../../../lib/utils/dataTypes";
import styles from "../BookDetails.module.scss";

type BookRatingProps = {
  ratings: Book["ratings"];
  currentBookId: string;
  userId: string;
};

const BookRating = ({ ratings, currentBookId, userId }: BookRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [bookRated, setBookRated] = useState<number>(0); //0: Not Rated, 1: Already Rated, 2: Rating Submitted
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["rating", currentBookId],
    mutationFn: () => rateBookAPI(currentBookId, userId, rating),
    onSuccess: async () => {
      setBookRated(2);
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["book", currentBookId]);
      queryClient.invalidateQueries(["bestRatedBooks"]);
    },
  });

  const findUserRating = () => {
    ratings.forEach((rating) => {
      if (rating.userId === userId) {
        setBookRated(1);
        setRating(rating.grade);
      }
    });
  };

  useEffect(() => {
    findUserRating();
  });

  return (
    <>
      {bookRated == 0 ? (
        <div className={styles.bookRating}>
          <p>Notez cet ouvrage</p>
          <Rating
            key={"rate"}
            size="medium"
            onSelect={(rating) => setRating(rating)}
          />
          <Button primary onClick={() => mutation.mutate()}>
            Valider
          </Button>
        </div>
      ) : (
        <div className={styles.bookRating}>
          {bookRated == 1 ? <p>Votre Note</p> : <p>Merci !</p>}
          <Rating key={"rated"} rating={rating} size="medium" isReadOnly />
          {mutation.isError && <p>Erreur</p>}
        </div>
      )}
    </>
  );
};

BookRating.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      grade: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentBookId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default BookRating;
