import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shelf from "../../../../assets/images/shelf.jpg";
import useAddBookMutation from "../../../../lib/hooks/useAddBookMutation";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";
import BookForm from "../../components/BookForm/BookForm";
import styles from "../../../../styles/layouts/BookPage.module.scss";
import Button from "../../../../components/Button/Button";

const AddBookPage = () => {
  const { userId } = useGlobalStore();
  const navigate = useNavigate();
  const { addBookMutation, alertMessage, handleAddBook } = useAddBookMutation();

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
  }, [userId, navigate]);

  return (
    <main className={styles.book}>
      <div className={styles.pageBody}>
        {addBookMutation.isSuccess ? (
          <div className={styles.bookActionConfirm}>
            <h1>Merci !</h1>
            <p>votre livre a bien été publié</p>
            <img src={shelf} alt="étagère" />
            <Button primary onClick={() => navigate("/")}>Retour à l'accueil</Button>
          </div>
        ) : (
          <>
            <h1>Ajouter un livre</h1>
            <p>tous les champs sont obligatoires</p>
            <BookForm
              isLoading={addBookMutation.isLoading}
              alertMessage={alertMessage}
              onValidate={handleAddBook}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default AddBookPage;
