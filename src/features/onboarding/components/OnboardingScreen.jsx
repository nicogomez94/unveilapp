import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterStep from './RegisterStep';
import { useOnboarding } from '../viewmodels/useOnboarding';

const OnboardingScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const { saveStepData } = useOnboarding();

    const handleNext = (data) => {
        saveStepData(data);
        if (step < 4) {
            setStep(step + 1);
        } else {
            navigation.navigate('Dashboard');
        }
    };

    return (
        <View style={styles.container}>
        {step === 1 && <RegisterStep onNext={handleNext} />}
        {/* agregar los otros pasos aca */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default OnboardingScreen;