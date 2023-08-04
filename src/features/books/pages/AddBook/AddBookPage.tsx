import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import styles from "./AddBookPage.module.scss";

const AddBookPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
  }, [userId]);

  return (
    <div className={styles.addBook}>
      <div className={styles.pageBody}>
        <AddBookForm />
      </div>
    </div>
  );
};

export default AddBookPage;
