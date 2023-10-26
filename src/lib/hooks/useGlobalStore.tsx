import { create } from 'zustand';

interface GlobalStore {
  userId: string | null;
  updateUserId: (userId: string | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
  userId: null,
  updateUserId: (userId) => set({userId}),
}))

export default useGlobalStore;