import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import styles from "./AddBookPage.module.scss";

const AddBookPage = () => {
  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
  }, [userId]);

  return (
    <div className={styles.addBook}>
      <div className={styles.pageBody}>
        <h1>Ajouter un livre</h1>
        <p>tous les champs sont obligatoires</p>
        <AddBookForm />
      </div>
    </div>
  );
};

export default AddBookPage;
