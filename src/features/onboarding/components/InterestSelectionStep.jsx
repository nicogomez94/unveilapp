import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const interesesData = [
    'Gastronomía',
    'Moda',
    'Viajes',
    'Belleza',
    'Tecnología',
    'Fitness',
    'Decoración',
    'Eventos Locales',
];

const InterestSelectionStep = ({ onNext, onPrevious }) => {
  const { onboardingData, updateStepData } = useOnboarding();
  const [selectedInterests, setSelectedInterests] = useState(onboardingData.interests || []);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
        setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
        setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      console.log('Intereses seleccionados:', selectedInterests);
      updateStepData({ interests: selectedInterests });
      onNext();
    } else {
      Alert.alert(
        "Sin intereses",
        "Por favor selecciona al menos un interés para continuar",
        [{ text: "Entendido" }]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus intereses</Text>
      <Text style={styles.subtitle}>
        Esto nos ayudará a mostrarte campañas más relevantes
      </Text>
      
      <View style={styles.interestsGrid}>
        {interesesData.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) && styles.selectedInterest,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text 
              style={[
                styles.interestText, 
                selectedInterests.includes(interest) && styles.selectedInterestText
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
       
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 20 }} />
      
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.backButton]} 
          onPress={onPrevious}
        >
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.nextButton]} 
          onPress={handleNext}
          disabled={selectedInterests.length === 0}
        >
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  interestButton: {
    width: '48%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedInterest: {
    backgroundColor: '#545fc1',
  },
  interestText: {
    // fontWeight: '500',
  },
  selectedInterestText: {
    color: 'white',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
  },
  backButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#5a6bff',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InterestSelectionStep;