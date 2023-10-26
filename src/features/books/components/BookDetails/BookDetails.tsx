import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookAPI } from "../../../../app/api";
import useGetOneBookQuery from "../../../../lib/hooks/useGetOneBookQuery";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";
import styles from "./BookDetails.module.scss";
import BookInfo from "./BookInfo/BookInfo";
import BookRating from "./BookRating/BookRating";

type SingleBookProps = {
  onDelete: (bookTitle: string) => void;
};

const BookDetails = ({ onDelete }: SingleBookProps) => {
  const bookId: string = useParams().bookId!;
  const { userId } = useGlobalStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOneBookQuery(bookId);

  const deleteBook = useMutation({
    mutationKey: ["deletebook"],
    mutationFn: () => deleteBookAPI(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      onDelete(bookTitle);
    },
  });
  const isAuthor = data?.userId === userId;
  const bookTitle = data?.title || "Le livre";

  const handleDelete = () => {
    const check = confirm("Voulez-vous vraiment supprimer ce livre ?");
    if (check) {
      deleteBook.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data)
    return (
      <div className={styles.book}>
        <img src={data.imageUrl} alt="Photo livre" />
        <div className={styles.bookContent}>
          {isAuthor && (
            <div className={styles.bookActions}>
              <p>Vous avez publié cet ouvrage, vous pouvez le :</p>
              <button
                className={styles.bookActionsModify}
                onClick={() => navigate(`/books/${bookId}/update`)}
              >
                modifier
              </button>
              <button
                className={styles.bookActionsDelete}
                onClick={handleDelete}
              >
                supprimer
              </button>
            </div>
          )}
          <BookInfo book={data} />
          {userId && (
            <BookRating
              ratings={data.ratings}
              currentBookId={bookId}
              userId={userId}
            />
          )}
        </div>
      </div>
    );
};

BookDetails.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default BookDetails;
