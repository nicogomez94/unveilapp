import { useOnboardingStore } from '../../../store/onboardingStore'; // Importa el store de onboarding

export const useOnboarding = () => {
    // Obtiene los datos del onboarding y la función para actualizarlos desde el store
    const { onboardingData, setOnboardingData } = useOnboardingStore();

    // Función para guardar los datos de cada paso del onboarding
    const saveStepData = (data) => {
        setOnboardingData({ ...onboardingData, ...data });
    };

    return {
        onboardingData,
        saveStepData,
    };
};