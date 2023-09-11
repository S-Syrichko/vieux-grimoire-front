import { useParams } from "react-router-dom";
import useGetOneBookQuery from "../../../../lib/hooks/useGetOneBookQuery";
import useUpdateBookMutation from "../../../../lib/hooks/useUpdateBookMutation";
import BookForm from "../../components/BookForm/BookForm";
import styles from "./UpdateBook.module.scss";
import { invariant } from "../../../../lib/utils/functions";

const UpdateBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  invariant(bookId);
  const { data, isLoading, isError } = useGetOneBookQuery(bookId);
  const { updateBookMutation, alertMessage, handleUpdateBook } =
    useUpdateBookMutation();

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  if (isError) {
    return <div>Erreur</div>;
  }
  return (
    <main className={styles.modifyBook}>
      <div className={styles.pageBody}>
        <h1>Modifier votre livre</h1>
        <p>tous les champs sont obligatoires</p>
        <BookForm
          book={data}
          isLoading={updateBookMutation.isLoading}
          alertMessage={alertMessage}
          onValidate={handleUpdateBook}
        />
      </div>
    </main>
  );
};

export default UpdateBookPage;
