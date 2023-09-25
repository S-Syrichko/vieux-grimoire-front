import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { rateBookAPI } from "../../../../../app/api";
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
          <button onClick={() => mutation.mutate()}>Valider</button>
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

export default BookRating;
