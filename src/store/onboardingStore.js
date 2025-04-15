import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
  name: '',
  email: '',
  password: '',
  country: '',
  city: '',
  socialProfiles: [],
  interests: [],
  setOnboardingData: (data) => set((state) => ({ ...state, ...data })),
}));