import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    }
  };
  
  const finishOnboarding = () => {
    // Navegar al Dashboard
    navigation.navigate('Dashboard');
  };
  
  // Renderizar el paso actual con los props de navegación
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        // No pasar onPrevious en el primer paso
        return <RegisterStep onNext={goToNext} />;
      case 1:
        return <SocialMediaStep onNext={goToNext} onPrevious={goToPrevious} />;
      case 2:
        return <InterestSelectionStep onNext={goToNext} onPrevious={goToPrevious} />;
      case 3:
        return <CurriculumPreviewStep onFinish={finishOnboarding} onPrevious={goToPrevious} />;
      default:
        return <RegisterStep onNext={goToNext} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <ProgressIndicator 
        steps={4} 
        currentStep={currentStep + 1} 
      />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;