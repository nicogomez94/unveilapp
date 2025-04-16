import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
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

const InterestSelectionStep = ({ onNext }) => {
  const { saveStepData } = useOnboarding();
  // Estado para almacenar los intereses seleccionados
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Función para agregar o quitar un interés de la lista de seleccionados
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
        setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
        setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Función para pasar al siguiente paso, enviando los intereses seleccionados
  const handleNext = () => {
    if (selectedInterests.length > 0) {
      console.log('Intereses seleccionados:', selectedInterests);
      saveStepData({ interests: selectedInterests });
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

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
      </TouchableOpacity>
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
    backgroundColor: '#4a90e2',
  },
  interestText: {
    fontWeight: '500',
  },
  selectedInterestText: {
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InterestSelectionStep;