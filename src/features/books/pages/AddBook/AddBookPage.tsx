import AddBookForm from "../../components/AddBookForm/AddBookForm";
import styles from "./AddBookPage.module.scss";

const AddBookPage = () => {
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
