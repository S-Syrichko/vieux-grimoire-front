import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { getAllBooksAPI } from "../../../../app/api";
import { Book } from "../../../../lib/utils/dataTypes";
import BookCard from "../../../books/components/BookCard/BookCard";
import styles from "./Gallery.module.scss";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
);

const Gallery = () => {
  const { isLoading, error, data } = useQuery(["books"], getAllBooksAPI);

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
