import { useParams } from "react-router-dom";

const BookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    return (
        <div>
            Book {bookId}
        </div>
    );
};

export default BookPage;