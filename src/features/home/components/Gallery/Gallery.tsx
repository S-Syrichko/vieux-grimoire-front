import { Book, getAllBooksAPI } from "../../../../app/api";
import BookCard from "../../../books/components/BookCard/BookCard";
import styles from "./Gallery.module.scss";
import { useQuery } from "react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
);

const Gallery = () => {
  const { isLoading, error, data } = useQuery("books", getAllBooksAPI);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin indicator={antIcon} />
      </div>
    );
  }
  if (error) return <div>Une erreur est survenue</div>;

  return (
    <div className={styles.gallery}>
        {data?.map((book: Book, index: number) => (
            <BookCard key={index} book={book} />
        ))}
    </div>
  );
};

export default Gallery;
