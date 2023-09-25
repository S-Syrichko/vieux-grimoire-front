import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { getAllBooksAPI } from "../../../../app/api";
import { Book } from "../../../../lib/utils/dataTypes";
import BookCard from "../../../books/components/BookCard/BookCard";
import styles from "./Gallery.module.scss";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 60, color: "#d9a963" }} spin />
);

const Gallery = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooksAPI,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin indicator={antIcon} />
      </div>
    );
  }
  if (isError)
    return (
      <div className={styles.error}>Erreur lors du chargement des données</div>
    );

  if (data && data.length == 0) return <div>Aucun livre trouvé</div>;

  return (
    <div className={styles.gallery}>
      {data?.map((book: Book, index: number) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default Gallery;
