import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addBookAPI } from "../../app/api";
import { BookFormData } from "../utils/dataTypes";
import { handleServerError } from "../utils/functions";

const useAddBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();


  const addBookMutation = useMutation({
    mutationFn: addBookAPI,
    onError: (error) => setAlertMessage(handleServerError(error)),
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
