import PropTypes from "prop-types";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import addFileIMG from "../../../../assets/images/add_file.png";
import { BookFormData } from "../../../../lib/utils/dataTypes";
import styles from "../../../../styles/layouts/Form.module.scss";

type ImageUploadProps = {
  imageUrl?: string;
  register: UseFormRegister<BookFormData>;
};

const ImageUpload = ({ imageUrl, register }: ImageUploadProps) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    imageUrl
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (!file && imageUrl) {
      setPreviewImageUrl(imageUrl);
    } else {
      setPreviewImageUrl(undefined);
    }
  };

  return (
    <label
      className={styles.fileArea}
      htmlFor="file"
      style={{ cursor: "pointer" }}
    >
      {previewImageUrl ? (
        <>
          <img src={previewImageUrl} alt="selected file" />
          <a>modifier</a>
        </>
      ) : (
        <>
          <img src={addFileIMG} alt="selected file" />
          <p>Ajouter une image</p>
        </>
      )}
      <input
        type="file"
        id="file"
        accept="image/*"
        {...register("file", {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleImageChange(e),
        })}
        style={{ display: "none" }}
      />
    </label>
  );
};

ImageUpload.propTypes = {
  imageUrl: PropTypes.string,
  register: PropTypes.func.isRequired,
};

export default ImageUpload;
