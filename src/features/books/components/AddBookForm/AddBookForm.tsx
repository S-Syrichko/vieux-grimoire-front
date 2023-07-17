import React, { useRef, useState } from "react";
import Rating from "../../../../components/Rating/Rating";
import styles from "../../../../styles/layouts/Form.module.scss";

const AddBookForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      setSelectedFile(file);
    } else {
      setPreviewImage(undefined);
      setSelectedFile(null);
    }
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
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
          <Rating size="large" onSelect={(rating) =>console.log(rating)} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="image">Visuel</label>
          {selectedFile ? (
            <div className={styles.fileArea}>
              <img src={previewImage} alt="selected file" />
              <a onClick={handleButtonClick}>modifier</a>
            </div>
          ) : (
            <div className={styles.fileArea}>
              <button type="button" onClick={handleButtonClick}>
                +
              </button>
              <p>Ajouter une image</p>
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            required
          />
        </div>
        <div className={styles.actionContainer}>
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
