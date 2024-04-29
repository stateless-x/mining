'use client';
import { create } from 'zustand';
import { PoolListResponse } from "@Models/services/MempoolServicesModel";
import { persist, createJSONStorage } from 'zustand/middleware'

interface PoolStore {
  data: PoolListResponse[] | null;
  setWeeklyTop: (data: PoolListResponse[] | null) => void;
}

const initialState = () => {
  // ensure that this code is only executed on the client
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem('pool-storage');
    console.log('clientside now')
    return saved ? JSON.parse(saved).data : null;
  }
  return null;
};

const useStore = create<PoolStore>()(
  persist(
    (set) => ({
        data: initialState(),
        setWeeklyTop: (data: PoolListResponse[] | null) => {
          set({ data });
        }
      }),
    {
      name: 'weekly-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default useStore;