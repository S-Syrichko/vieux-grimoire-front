import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scratch from "../../../../assets/images/scratch.png";
import ReturnArrow from "../../../../components/ReturnArrow/ReturnArrow";
import BestRatedBooks from "../../components/BestRatedBooks/BestRatedBooks";
import BookDetails from "../../components/BookDetails/BookDetails";
import styles from "../../../../styles/layouts/BookPage.module.scss";

const BookPage = () => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookTitle, setBookTitle] = useState("");

  const onDelete = (bookTitle: string) => {
    setIsDeleted(true);
    setBookTitle(bookTitle);
  };

  return (
    <main className={styles.book}>
      {isDeleted ? (
        <div className={styles.pageBody}>
          <div className={styles.bookActionConfirm}>
            <h1>{bookTitle}</h1>
            <p>a bien été supprimé</p>
            <img src={scratch} alt="Papier froissé" />
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
          </div>
        </div>
      ) : (
        <div className={styles.background}>
          <div className={styles.pageBodyMultiLayer}>
            <ReturnArrow />
            <BookDetails onDelete={onDelete} />
            <BestRatedBooks />
          </div>
        </div>
      )}
    </main>
  );
};

export default BookPage;
