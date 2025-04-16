import { useOnboardingStore } from '../../../store/onboardingStore';

export const useOnboarding = () => {
  const store = useOnboardingStore();
  
  return {
    onboardingData: store.onboardingData,
    setOnboardingData: store.setOnboardingData,
    // Cambiar el nombre a updateStepData para que coincida con el store
    updateStepData: store.updateStepData,  // No saveStepData
    resetOnboardingData: store.resetOnboardingData
  };
};

// Hooks específicos para facilitar el acceso a partes concretas
export const useSetOnboarding = () => useOnboardingStore((state) => state.setOnboardingData);
export const useResetOnboarding = () => useOnboardingStore((state) => state.resetOnboardingData);