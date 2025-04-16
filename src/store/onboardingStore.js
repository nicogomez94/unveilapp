import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useOnboardingStore = create(
  persist(
    (set) => ({
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
      
      // Función para actualizar todos los datos del onboarding
      setOnboardingData: (data) => set({ onboardingData: data }),
      
      // Función mejorada para actualizar datos por paso
      updateStepData: (stepData) => set((state) => ({
        onboardingData: {
          ...state.onboardingData,
          ...stepData
        }
      })),
      
      // Función para reiniciar los datos (útil para testing)
      resetOnboardingData: () => set({
        onboardingData: {
          fullName: '',
          email: '',
          password: '',
          country: '',
          city: '',
          instagram: '',
          tiktok: '',
          interests: [],
        }
      }),
    }),
    {
      name: 'onboarding-storage', // nombre único para el storage
      storage: createJSONStorage(() => AsyncStorage), // usar AsyncStorage
    }
  )
);