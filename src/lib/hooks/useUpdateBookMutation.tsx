import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateBookAPI } from "../../app/api";
import { BookFormData } from "../utils/dataTypes";

const useUpdateBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleServerError = (error: any) => {
    if (error.response) {
      setAlertMessage(error.response.data.message);
    } else {
      setAlertMessage("Le serveur ne répond pas");
    }
  };
  const updateBookMutation = useMutation(updateBookAPI, {
    onError: (error: any) => handleServerError(error),
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["bestRatedBooks"]);
    },
  });

  const handleUpdateBook = async (data: BookFormData) => {
    setAlertMessage(null);
    await updateBookMutation.mutateAsync(data);
    queryClient.invalidateQueries(["book", data.book._id]);
  };
  return { updateBookMutation, alertMessage, handleUpdateBook };
};

export default useUpdateBookMutation;
