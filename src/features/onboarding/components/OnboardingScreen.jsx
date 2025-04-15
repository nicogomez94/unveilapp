import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterStep from './RegisterStep';
import SocialMediaStep from './SocialMediaStep';
import InterestSelectionStep from './InterestSelectionStep';
import CurriculumPreviewStep from './CurriculumPreviewStep';
import { useOnboarding } from '../viewmodels/useOnboarding';

const OnboardingScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const { saveStepData } = useOnboarding();

    const handleNext = (data) => {
        saveStepData(data);
        setStep(step + 1);
    };

    const handleFinish = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            {step === 1 && <RegisterStep onNext={handleNext} />}
            {step === 2 && <SocialMediaStep onNext={handleNext} />}
            {step === 3 && <InterestSelectionStep onNext={handleNext} />}
            {step === 4 && <CurriculumPreviewStep onFinish={handleFinish} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default OnboardingScreen;