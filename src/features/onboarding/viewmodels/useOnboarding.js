import { useOnboardingStore } from '../../../store/onboardingStore';

export const useOnboarding = () => {
    const { setOnboardingData } = useOnboardingStore();

    const saveStepData = (data) => {
        setOnboardingData(data);
    };

    return { saveStepData };
};