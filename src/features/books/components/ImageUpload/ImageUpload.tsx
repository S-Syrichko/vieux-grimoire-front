import { useState, useRef } from "react";
import styles from "../../../../styles/layouts/Form.module.scss";

type ImageUploadProps = {
  onImageSelected: (file: File | null) => void;
  imageUrl?: string;
  register?: any;
};

const ImageUpload = ({ onImageSelected, imageUrl, register }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    imageUrl || undefined
  );

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
      onImageSelected(file);
    } else {
      setPreviewImage(undefined);
      setSelectedFile(null);
      onImageSelected(null);
    }
  };
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="image">Visuel</label>
      <div className={styles.fileArea}>
        {selectedFile || imageUrl ? (
          <>
            <img src={previewImage} alt="selected file" />
            <a onClick={handleButtonClick}>modifier</a>
          </>
        ) : (
          <>
            <button type="button" onClick={handleButtonClick}>
              +
            </button>
            <p>Ajouter une image</p>
          </>
        )}
      </div>
      <input {...register('file')} type="file" id="file" />

      <input
        type="file"
        id="image"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        required
      />
    </div>
  );
};

export default ImageUpload;
