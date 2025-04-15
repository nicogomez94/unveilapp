import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const CurriculumPreviewStep = ({ onFinish }) => {
  // Obtiene los datos del onboarding desde el ViewModel
  const { onboardingData } = useOnboarding();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Vista Previa del Currículum</Text>
        <Text style={styles.label}>Nombre: {onboardingData.fullName}</Text>
        <Text style={styles.label}>Ciudad: {onboardingData.city}</Text>
        <Text style={styles.label}>
            Intereses: {onboardingData.interests ? onboardingData.interests.join(', ') : 'Ninguno'}
        </Text>

        <Text style={styles.sectionTitle}>Campañas Realizadas</Text>
        <Text>¡Completa tu primera campaña para empezar a construir tu currículum!</Text>

        <Text style={styles.sectionTitle}>Estadísticas Clave</Text>
        <Text>Campañas: 0</Text>
        <Text>Reseñas: N/A</Text>
        <Text>Nivel: Principiante</Text>

        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
            <Text style={styles.finishButtonText}>Finalizar Onboarding</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  finishButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CurriculumPreviewStep;