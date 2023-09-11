import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin } from "antd";
import React, { useState } from "react";
import { Book } from "../../../../app/api";
import Rating from "../../../../components/Rating/Rating";
import styles from "../../../../styles/layouts/Form.module.scss";
import ImageUpload from "../ImageUpload/ImageUpload";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
);

type BookFormProps = {
  book?: Book;
  isLoading: boolean;
  alertMessage: string | null;
  onValidate: (book: Book, selectedFile: File) => void;
};

const BookForm = ({
  book,
  isLoading,
  alertMessage,
  onValidate,
}: BookFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);
  const { userId } = useGlobalStore();

  const { register, watch, formState, handleSubmit, reset } = useForm({
    defaultValues: useMemo(
      () => ({
        userId: userId as string,
        title: book?.title,
        author: book?.author,
        year: book?.year,
        genre: book?.genre,
        ratings: [
          {
            userId: userId as string,
            grade: rating,
          },
        ],
        averageRating: rating,
      }),
      [book]
    ),
  });
  const file = watch(["file"]);

  const onRatingSelect = (rating: number) => {
    setRating(rating);
  };

  const handleImageSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = () => {
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
    onValidate(book, selectedFile);
  };

  return (
    <div className={styles.formContainer}>
      <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="title">Titre du livre</label>
          <input type="text" id="title" {...register("title")} required />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="author">Auteur</label>
          <input type="text" id="author" {...register("author")} required />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="year">Année de publication</label>
          <input type="number" id="year" {...register("year")} required />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="genre">Genre</label>
          <input type="text" id="genre" {...register("genre")} required />
        </div>
        <div className={styles.inputWrapper}>
          <label>Note</label>
          <Rating size="large" onSelect={onRatingSelect} register={register} />
        </div>
        <ImageUpload
          onImageSelected={handleImageSelected}
          imageUrl={book?.imageUrl}
          register={register}
        />
        <Space direction="vertical" style={{ width: "70%" }}>
          {alertMessage && (
            <Alert message={alertMessage} type="error" showIcon />
          )}
        </Space>
        <div className={styles.actionContainer}>
          <button type="submit">
            {isLoading ? <Spin indicator={antIcon} /> : "Publier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
