import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateBookAPI } from "../../app/api";
import { BookFormData } from "../utils/dataTypes";
import { handleServerError } from "../utils/functions";

const useUpdateBookMutation = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  
  const updateBookMutation = useMutation({
    mutationFn: updateBookAPI,
    onError: (error) => setAlertMessage(handleServerError(error)),
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
