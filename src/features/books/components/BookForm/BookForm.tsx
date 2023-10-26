import { LoadingOutlined } from "@ant-design/icons";
import { DevTool } from "@hookform/devtools";
import { Alert, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Rating from "../../../../components/Rating/Rating";
import useGlobalStore from "../../../../lib/hooks/useGlobalStore";
import { Book, BookFormData } from "../../../../lib/utils/dataTypes";
import styles from "../../../../styles/layouts/Form.module.scss";
import ImageUpload from "../ImageUpload/ImageUpload";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />
);

type BookFormProps = {
  book?: Book;
  isLoading: boolean;
  alertMessage: string | null;
  onValidate: (data: BookFormData) => void;
};

const BookForm = ({
  book,
  isLoading,
  alertMessage,
  onValidate,
}: BookFormProps) => {
  const userId: string = useGlobalStore().userId!;
  const userRating =
    book?.ratings.find((elt) => elt.userId === userId)?.grade ?? 0;

  const { register, handleSubmit, formState, control, setValue } =
    useForm<BookFormData>({
      defaultValues: {
        book: {
          _id: book?._id,
          userId: userId,
          title: book?.title,
          author: book?.author,
          year: book?.year,
          genre: book?.genre,
          ratings: [
            {
              userId: userId,
              grade: userRating,
            },
          ],
        },
      },
    });
  const { errors, isDirty } = formState;

  const handleSetRating = (rating: number) => {
    setValue("book.ratings.0.grade", rating, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (data: BookFormData) => {
    if (!data.file[0] && !book) {
      alert("Veuillez ajouter une image");
      return;
    }
    const bookData: BookFormData = data as BookFormData;
    onValidate(bookData);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.inputWrapper}>
          <label htmlFor="title">Titre du livre</label>
          <input
            type="text"
            id="title"
            {...register("book.title", { required: "Un titre est requis" })}
          />
          <p>{errors.book?.title?.message}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            id="author"
            {...register("book.author", {
              required: "Un nom d'auteur est requis",
            })}
          />
          <p>{errors.book?.author?.message}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="year">Année de publication</label>
          <input
            type="number"
            id="year"
            {...register("book.year", {
              valueAsNumber: true,
              required: "Une année de publication est requise",
            })}
          />
          <p>{errors.book?.year?.message}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            {...register("book.genre", { required: "Un genre est requis" })}
          />
          <p>{errors.book?.genre?.message}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label>Note</label>
          <Rating size="large" rating={userRating} onSelect={handleSetRating} />
        </div>
        <div className={styles.inputWrapper}>
          <ImageUpload register={register} imageUrl={book?.imageUrl} />
        </div>
        <Space direction="vertical" style={{ width: "70%" }}>
          {alertMessage && (
            <Alert message={alertMessage} type="error" showIcon />
          )}
        </Space>
        <div className={styles.actionContainer}>
          <button type="submit" disabled={!isDirty}>
            {isLoading ? (
              <Spin indicator={antIcon} />
            ) : isDirty ? (
              "Publier"
            ) : (
              "En attente de changements"
            )}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    ratings: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string.isRequired,
        grade: PropTypes.number.isRequired,
      })
    ),
    averageRating: PropTypes.number,
    _id: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string,
  onValidate: PropTypes.func.isRequired,
};

export default BookForm;
