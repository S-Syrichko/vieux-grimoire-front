import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Book, deleteBookAPI, getOneBookAPI } from "../../../../app/api";
import BookInfo from "./BookInfo/BookInfo";
import BookRating from "./BookRating/BookRating";
import styles from "./SingleBook.module.scss";

type SingleBookProps = {
  id: string;
  onDelete: (bookTitle: string) => void;
};

const SingleBook = ({ id, onDelete }: SingleBookProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Book>(["book", id], () =>
    getOneBookAPI(id)
  );
  const deleteBook = useMutation(["deletebook", id], () => deleteBookAPI(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      onDelete(bookTitle)
    },
  });
  const currentUser = localStorage.getItem("userId");
  const isAuthor = data?.userId === currentUser;
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
              <button className={styles.bookActionsModify}>modifier</button>
              <button
                className={styles.bookActionsDelete}
                onClick={handleDelete}
              >
                supprimer
              </button>
            </div>
          )}
          <BookInfo book={data} />
          {currentUser && (
            <BookRating
              ratings={data.ratings}
              currentBookId={id}
              userId={currentUser}
            />
          )}
        </div>
      </div>
    );
};

export default SingleBook;
