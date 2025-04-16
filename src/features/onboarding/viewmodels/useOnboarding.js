import { useOnboardingStore } from '../../../store/onboardingStore';

// Hook principal para acceder y manipular datos del onboarding
export const useOnboarding = () => {
    const onboardingData = useOnboardingStore((state) => state.onboardingData);
    const updateStepData = useOnboardingStore((state) => state.updateStepData);
    const setOnboardingData = useOnboardingStore((state) => state.setOnboardingData);
    const resetOnboardingData = useOnboardingStore((state) => state.resetOnboardingData);
    
    const saveStepData = (data) => {
        console.log('Guardando datos del paso:', data);
        updateStepData(data);
    };

    return {
        onboardingData,
        saveStepData,
        resetOnboardingData,
        setOnboardingData
    };
};

// Hooks específicos para facilitar el acceso a partes concretas
export const useSetOnboarding = () => useOnboardingStore((state) => state.setOnboardingData);
export const useResetOnboarding = () => useOnboardingStore((state) => state.resetOnboardingData);