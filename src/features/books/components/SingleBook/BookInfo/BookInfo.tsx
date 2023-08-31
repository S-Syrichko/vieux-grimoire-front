import styles from "../SingleBook.module.scss";
import Rating from "../../../../../components/Rating/Rating";
import { Book } from "../../../../../app/api";

const BookInfo = ({book} : {book: Book}) => {
    const {title, author, year, genre, averageRating} = book;
    return (
        <div className={styles.bookInfo}>
          <h2 className={styles.bookInfoTitle}>{title}</h2>
          <p className={styles.bookInfoAuthor}>par {author}</p>
          <p className={styles.bookInfoYear}>{year}</p>
          <p className={styles.bookInfoGenre}>{genre}</p>
          <div className={styles.bookInfoRating}>
            <Rating key={"average"} rating={averageRating} size="small" isReadOnly />
            <p>{averageRating}/5</p>
          </div>
        </div>
    );
};

export default BookInfo;