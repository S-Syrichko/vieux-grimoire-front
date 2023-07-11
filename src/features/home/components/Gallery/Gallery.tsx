import BookCard from '../../../books/components/BookCard/BookCard';
import styles from './Gallery.module.scss';

const Gallery = () => {
    return (
        <div className={styles.gallery}>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    );
};

export default Gallery;