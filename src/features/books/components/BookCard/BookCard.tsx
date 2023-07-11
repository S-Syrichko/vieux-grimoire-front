import { Link } from "react-router-dom";
import Rating from "../../../../components/Rating/Rating";
import styles from "./BookCard.module.scss";
import placeholder from "../../../../assets/images/thumb-placeholder.png";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
  rating: number;
  image: string;
}

const book: Book = {
  id: 1992,
  title: "Le Seigneur des anneaux",
  author: "J. R. R. Tolkien",
  year: 1954,
  category: "Fantasy",
  rating: 3,
  image: placeholder,
};

const BookCard = () => {
  return (
    <Link to={`/books/${book.id}`} className={styles.card}>
      <img src={book.image} alt="" />
      <div className={styles.description}>
        <Rating rating={book.rating} />
        <div className={styles.descriptionText}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.year}</p>
          <p>{book.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
