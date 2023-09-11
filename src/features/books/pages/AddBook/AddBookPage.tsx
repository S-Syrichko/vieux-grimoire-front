import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shelf from "../../../../assets/images/shelf.jpg";
import useAddBookMutation from "../../../../lib/hooks/useAddBookMutation";
import BookForm from "../../components/BookForm/BookForm";
import styles from "./AddBookPage.module.scss";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";

const AddBookPage = () => {
  const { userId } = useGlobalStore();
  const navigate = useNavigate();
  const { addBookMutation, alertMessage, handleAddBook } = useAddBookMutation();

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
  }, [userId]);

  if (addBookMutation.isSuccess) {
    return (
      <main className={styles.addBook}>
        <div className={styles.pageBody}>
          <div className={styles.bookAdded}>
            <h1>Merci !</h1>
            <p>votre livre a bien été publié</p>
            <img src={shelf} alt="étagère" />
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.addBook}>
      <div className={styles.pageBody}>
        <h1>Ajouter un livre</h1>
        <p>tous les champs sont obligatoires</p>
        <BookForm
          isLoading={addBookMutation.isLoading}
          alertMessage={alertMessage}
          onValidate={handleAddBook}
        />
      </div>
    </main>
  );
};

export default AddBookPage;
