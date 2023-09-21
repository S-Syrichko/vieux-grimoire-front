import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import scratch from "../../../../assets/images/scratch.png";
import ReturnArrow from "../../../../components/ReturnArrow/ReturnArrow";
import BestRatedBooks from "../../components/BestRatedBooks/BestRatedBooks";
import SingleBook from "../../components/SingleBook/SingleBook";
import styles from "./BookPage.module.scss";

const BookPage = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookTitle, setBookTitle] = useState("");

  const onDelete = (bookTitle: string) => {
    setIsDeleted(true);
    setBookTitle(bookTitle);
  };

  if (!bookId) {
    return <div>Chargement...</div>;
  }

  return (
    <main className={styles.book}>
      <div className={styles.background}>
        {isDeleted ? (
          <div className={styles.pageDeleted}>
            <h1>{bookTitle}</h1>
            <p>a bien été supprimé</p>
            <img src={scratch} alt="Papier froissé" />
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
          </div>
        ) : (
          <div className={styles.pageBody}>
            <ReturnArrow />
            <SingleBook id={bookId} onDelete={onDelete} />
            <BestRatedBooks />
          </div>
        )}
      </div>
    </main>
  );
};

export default BookPage;
