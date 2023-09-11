import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookAPI } from "../../../../app/api";
import useGetOneBookQuery from "../../../../lib/hooks/useGetOneBookQuery";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";
import BookInfo from "./BookInfo/BookInfo";
import BookRating from "./BookRating/BookRating";
import styles from "./SingleBook.module.scss";
import { useNavigate } from "react-router-dom";

type SingleBookProps = {
  id: string;
  onDelete: (bookTitle: string) => void;
};

const SingleBook = ({ id, onDelete }: SingleBookProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId} = useGlobalStore();
  const { data, isLoading, isError } = useGetOneBookQuery(id);
  const deleteBook = useMutation(["deletebook", id], () => deleteBookAPI(id), {
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
                onClick={()=> navigate(`/books/${id}/update`)}
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
              currentBookId={id}
              userId={userId}
            />
          )}
        </div>
      </div>
    );
};

export default SingleBook;
