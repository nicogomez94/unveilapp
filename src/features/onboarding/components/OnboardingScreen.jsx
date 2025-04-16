import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import RegisterStep from './RegisterStep';
import SocialMediaStep from './SocialMediaStep';
import InterestSelectionStep from './InterestSelectionStep';
import CurriculumPreviewStep from './CurriculumPreviewStep';
import { useOnboarding } from '../viewmodels/useOnboarding';

const OnboardingScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const { onboardingData, resetOnboardingData } = useOnboarding();

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleFinish = () => {
        navigation.navigate('Dashboard');
    };

    const showCurrentData = () => {
        Alert.alert(
            "Datos actuales",
            JSON.stringify(onboardingData, null, 2),
            [{ text: "OK" }]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.debugButtons}>
                <Button title="Ver datos" onPress={showCurrentData} />
                <Button title="Reiniciar" onPress={resetOnboardingData} />
            </View>
            
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
    debugButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
});

export default OnboardingScreen;