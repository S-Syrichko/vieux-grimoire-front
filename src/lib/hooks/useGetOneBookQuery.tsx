import { useQuery } from "@tanstack/react-query";
import { getOneBookAPI } from "../../app/api";
import { Book } from "../utils/dataTypes";

const useGetOneBookQuery = (id: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: () => getOneBookAPI(id),
  });
  return { data, isLoading, isError, isSuccess };
};

export default useGetOneBookQuery;
