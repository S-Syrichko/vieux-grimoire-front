import { useQuery } from '@tanstack/react-query';
import { getOneBookAPI } from '../../app/api';
import { Book } from '../../app/api';


const useGetOneBookQuery = (id: string) => {
    const { data, isLoading, isError } = useQuery<Book>(["book", id], () =>
    getOneBookAPI(id)
  );
  return { data, isLoading, isError };
};

export default useGetOneBookQuery;