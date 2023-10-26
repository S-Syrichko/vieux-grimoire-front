import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "../../../../components/Rating/Rating";
import { Book } from "../../../../lib/utils/dataTypes";
import styles from "./BookCard.module.scss";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link to={`/books/${book._id!}`} className={styles.card}>
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

BookCard.propTypes = {
  book: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    ratings: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string.isRequired,
        grade: PropTypes.number.isRequired,
      })
    ).isRequired,
    averageRating: PropTypes.number.isRequired,
    _id: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default BookCard;
