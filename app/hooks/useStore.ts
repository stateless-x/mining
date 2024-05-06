'use client';
import { create } from 'zustand';
import { PoolListResponse } from "@Models/services/MempoolServicesModel";
import { persist, createJSONStorage } from 'zustand/middleware'

interface PoolStore {
  data: PoolListResponse[] | null;
}
interface DailyStore extends PoolStore {
  setDailyTop: (data: PoolListResponse[] | null) => void;
}
interface WeeklyStore extends PoolStore {
  setWeeklyTop: (data: PoolListResponse[] | null) => void;
}
interface MonthlyStore extends PoolStore {
  setMonthlyTop: (data: PoolListResponse[] | null) => void;
}
interface YearlyStore extends PoolStore {
  setYearlyTop: (data: PoolListResponse[] | null) => void;
}

const initialState = () => {
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem('weekly-storage');
    return saved ? JSON.parse(saved).data : null;
  }
  return null;
};

export const useDailyStore = create<DailyStore>()(
  persist(
    (set) => ({
        data: null,
        setDailyTop: (data: PoolListResponse[] | null) => {
          set({ data });
        },
      }),
    {
      name: 'daily-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useWeeklyStore = create<WeeklyStore>()(
  persist(
    (set) => ({
        data: initialState(),
        setWeeklyTop: (data: PoolListResponse[] | null) => {
          set({ data });
        },
      }),
    {
      name: 'weekly-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useMonthlyStore = create<MonthlyStore>()(
  persist(
    (set) => ({
        data: null,
        setMonthlyTop: (data: PoolListResponse[] | null) => {
          set({ data });
        },
      }),
    {
      name: 'monthly-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useYearlyStore = create<YearlyStore>()(
  persist(
    (set) => ({
        data: null,
        setYearlyTop: (data: PoolListResponse[] | null) => {
          set({ data });
        },
      }),
    {
      name: 'yearly-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);