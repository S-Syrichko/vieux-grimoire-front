import { useQuery } from '@tanstack/react-query';
import { getOneBookAPI } from '../../app/api';
import { Book } from '../utils/dataTypes';


const useGetOneBookQuery = (id: string) => {
    const { data, isLoading, isError } = useQuery<Book>({ queryKey: ["book", id], queryFn: () =>
    getOneBookAPI(id) });
  return { data, isLoading, isError };
};

export default useGetOneBookQuery;