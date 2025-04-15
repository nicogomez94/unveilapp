import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
  // Estado inicial con los campos para cada paso del onboarding
  onboardingData: {
    fullName: '',
    email: '',
    password: '',
    country: '',
    city: '',
    instagram: '',
    tiktok: '',
    interests: [],
  },
  // Función para actualizar los datos del onboarding
  setOnboardingData: (data) => set({ onboardingData: data }),
}));