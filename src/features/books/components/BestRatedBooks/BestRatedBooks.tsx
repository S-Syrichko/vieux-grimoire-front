import { getBestRatedBooksAPI } from "../../../../app/api";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../BookCard/BookCard";
import styles from "./BestRatedBooks.module.scss";

const BestRatedBooks = () => {
  const { data, isLoading, isError } = useQuery(
    ["bestRatedBooks"],
    getBestRatedBooksAPI
  );

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement des livres</div>;
  return (
    <div className={styles.bestRated}>
      <h3>Les mieux notés</h3>
      <div className={styles.gallery}>
        {data?.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BestRatedBooks;
