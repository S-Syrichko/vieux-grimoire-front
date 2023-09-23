import { useNavigate, useParams } from "react-router-dom";
import booksPile from "../../../../assets/images/books-pile.jpg";
import useGetOneBookQuery from "../../../../lib/hooks/useGetOneBookQuery";
import useUpdateBookMutation from "../../../../lib/hooks/useUpdateBookMutation";
import BookForm from "../../components/BookForm/BookForm";
import styles from "../../../../styles/layouts/BookPage.module.scss";


const UpdateBookPage = () => {
  const bookId: string = useParams().bookId!;
  const navigate = useNavigate();
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
    <main className={styles.book}>
      <div className={styles.pageBody}>
        {updateBookMutation.isSuccess ? (
          <div className={styles.bookActionConfirm}>
            <h1>Merci !</h1>
            <p>votre livre a bien été modifié</p>
            <img src={booksPile} alt="Pile de livres" />
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
          </div>
        ) : (
          <>
            <h1>Modifier votre livre</h1>
            <p>tous les champs sont obligatoires</p>
            <BookForm
              book={data}
              isLoading={updateBookMutation.isLoading}
              alertMessage={alertMessage}
              onValidate={handleUpdateBook}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default UpdateBookPage;
