import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Datos de ejemplo para las categorías de interés
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
      onNext({ interests: selectedInterests });
    } else {
      alert('Por favor, selecciona al menos un interés.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus Intereses</Text>
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
              selectedInterests.includes(interest) && styles.selectedInterestText,
            ]}
          >
            {interest}
          </Text>
        </TouchableOpacity>
      ))}
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    interestButton: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedInterest: {
        backgroundColor: '#007bff',
    },
    interestText: {
        fontSize: 16,
        color: '#333',
    },
    selectedInterestText: {
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default InterestSelectionStep;