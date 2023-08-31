import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../../app/api";
import shelf from "../../../../assets/images/shelf.jpg";
import Rating from "../../../../components/Rating/Rating";
import useAddBookMutation from "../../../../lib/hooks/useAddBookMutation";
import styles from "../../../../styles/layouts/Form.module.scss";
import ImageUpload from "../ImageUpload/ImageUpload";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
);

const AddBookForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);
  const userId = localStorage.getItem("userId");
  const { addBookMutation, alertMessage, handleAddBook } = useAddBookMutation();
  const navigate = useNavigate();

  const handleImageSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Veuillez ajouter une image");
      return;
    }

    //Get and parse data from form
    const formData = new FormData(e.currentTarget);
    const year = formData.get("year");
    const parsedYear = year ? parseInt(year as string, 10) : 0;

    //Create book object
    const book: Book = {
      userId: userId as string,
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      year: parsedYear,
      genre: formData.get("genre") as string,
      ratings: [
        {
          userId: userId as string,
          grade: rating,
        },
      ],
      averageRating: rating,
    };

    handleAddBook(book, selectedFile);
  };

  if (addBookMutation.isSuccess) {
    return (
      <div>
        <h1>Merci !</h1>
        <p>votre livre a bien été publié</p>;
        <img src={shelf} alt="étagère" />
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }
  return (
    <>
      <h1>Ajouter un livre</h1>
      <p>tous les champs sont obligatoires</p>
      <div className={styles.formContainer}>
        <form id="auth-form" onSubmit={handleFormSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="title">Titre du livre</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="author">Auteur</label>
            <input type="text" id="author" name="author" required />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="year">Année de publication</label>
            <input type="number" id="year" name="year" required />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="genre">Genre</label>
            <input type="text" id="genre" name="genre" required />
          </div>
          <div className={styles.inputWrapper}>
            <label>Note</label>
            <Rating size="large" onSelect={(rating) => setRating(rating)} />
          </div>
          <ImageUpload onImageSelected={handleImageSelected} />
          <Space direction="vertical" style={{ width: "70%" }}>
            {alertMessage && (
              <Alert message={alertMessage} type="error" showIcon />
            )}
          </Space>
          <div className={styles.actionContainer}>
            <button type="submit">
              {addBookMutation.isLoading ? (
                <Spin indicator={antIcon} />
              ) : (
                "Publier"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBookForm;
