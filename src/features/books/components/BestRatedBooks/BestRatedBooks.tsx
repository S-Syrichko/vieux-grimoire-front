import { useQuery } from "@tanstack/react-query";
import { getBestRatedBooksAPI } from "../../../../app/api";
import BookCard from "../BookCard/BookCard";
import styles from "./BestRatedBooks.module.scss";
import { Book } from "../../../../lib/utils/dataTypes";

const BestRatedBooks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestRatedBooks"],
    queryFn: getBestRatedBooksAPI,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement des livres</div>;
  return (
    <div className={styles.bestRated}>
      <div className={styles.svgContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="521"
          height="40"
          viewBox="0 0 521 40"
          fill="none"
          preserveAspectRatio="xMinYMin meet"
          className="svg-content"
        >
          <path
            d="M1 1C32.643 13.5096 98.4714 34.4972 108.64 18.3705C121.352 -1.78786 -14.1454 14.7248 69.1542 33.0604C135.794 47.7288 225.657 31.8094 262.258 22.0162C310.038 11.9727 428.479 -3.9967 520 12.4731"
            stroke="#F2E3CE"
            strokeDasharray="9 9"
          />
        </svg>
      </div>
      <h3>Les mieux notés</h3>
      <div className={styles.gallery}>
        {data?.map((book: Book) => <BookCard key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default BestRatedBooks;
