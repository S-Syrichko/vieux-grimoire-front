import {create} from 'zustand';
import { Book } from '../../app/api';

interface IGlobalStore {
  userId: string | null;
  book: Book | null;
  updateUserId: (userId: string | null) => void;
  updateBook: (book: Book | null) => void;
};

const useGlobalStore = create<IGlobalStore>()((set) => ({
  userId: null,
  book: null,
  updateUserId: (userId) => set({userId}),
  updateBook: (book) => set({book}),
}))

export default useGlobalStore;