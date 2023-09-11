import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Book, updateBookAPI } from "../../app/api";

const useUpdateBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleServerError = (error: any) => {
    if (error.response) {
      setAlertMessage(error.response.data.message);
    } else {
      setAlertMessage("Le serveur ne répond pas");
    }
  };
  const updateBookMutation = useMutation(updateBookAPI, {
    onError: (error: any) => handleServerError(error),
  });

  const handleUpdateBook = async (book: Book, imageFile: File) => {
    setAlertMessage(null);
    await updateBookMutation.mutateAsync({ book, imageFile });
  };
  return { updateBookMutation, alertMessage, handleUpdateBook };
};

export default useUpdateBookMutation;
