import { useState } from "react";
import { useMutation } from "react-query";
import { Book, addBookAPI } from "../../app/api";

const useAddBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleServerError = (error: any) => {
    if (error.response) {
      setAlertMessage(error.response.data.message);
    } else {
      setAlertMessage("Le serveur ne répond pas");
    }
  };
  const addBookMutation = useMutation(addBookAPI, {
    onError: (error: any) => handleServerError(error),
  });

  const handleAddBook = async (book: Book, imageFile: File) => {
    setAlertMessage(null);
    await addBookMutation.mutateAsync({ book, imageFile });
  };
  return { addBookMutation, alertMessage, handleAddBook };
};

export default useAddBookMutation;
