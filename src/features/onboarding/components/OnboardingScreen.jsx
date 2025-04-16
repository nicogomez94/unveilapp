import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import RegisterStep from './RegisterStep';
import SocialMediaStep from './SocialMediaStep';
import InterestSelectionStep from './InterestSelectionStep';
import CurriculumPreviewStep from './CurriculumPreviewStep';
import ProgressIndicator from './ProgressIndicator';

const OnboardingScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const goToNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Si estamos en el primer paso, volver a la pantalla de bienvenida
      navigation.goBack();
    }
  };
  
  const finishOnboarding = () => {
    navigation.navigate('Dashboard');
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <RegisterStep onNext={goToNext} onPrevious={goToPrevious} />;
      case 1:
        return <SocialMediaStep onNext={goToNext} onPrevious={goToPrevious} />;
      case 2:
        return <InterestSelectionStep onNext={goToNext} onPrevious={goToPrevious} />;
      case 3:
        return <CurriculumPreviewStep onFinish={finishOnboarding} onPrevious={goToPrevious} />;
      default:
        return <RegisterStep onNext={goToNext} onPrevious={goToPrevious} />;
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressIndicator 
        steps={4} 
        currentStep={currentStep + 1} 
      />
      <View style={styles.container}>
        {renderCurrentStep()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;