import { Link } from "react-router-dom";
import Rating from "../../../../components/Rating/Rating";
import { Book } from "../../../../lib/utils/dataTypes";
import styles from "./BookCard.module.scss";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link to={`/books/${book._id}`} className={styles.card}>
      <img src={book.imageUrl} alt="Photo livre" />
      <div className={styles.description}>
        <Rating rating={book.averageRating} size="small" isReadOnly />
        <div className={styles.descriptionText}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.year}</p>
          <p>{book.genre}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
