import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addBookAPI } from "../../app/api";
import { BookFormData } from "../utils/dataTypes";

const useAddBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleServerError = (error: any) => {
    if (error.response) {
      setAlertMessage(error.response.data.message);
    } else {
      setAlertMessage("Le serveur ne répond pas");
    }
  };

  const addBookMutation = useMutation(addBookAPI, {
    onError: (error: any) => handleServerError(error),
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["bestRatedBooks"]);
    },
  });

  const handleAddBook = async (data: BookFormData) => {
    setAlertMessage(null);
    await addBookMutation.mutateAsync(data);
  };
  return { addBookMutation, alertMessage, handleAddBook };
};

export default useAddBookMutation;
