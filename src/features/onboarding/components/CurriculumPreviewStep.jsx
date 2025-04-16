import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const CurriculumPreviewStep = ({ onFinish, onPrevious }) => { // Añadir onPrevious
  // Obtiene los datos del onboarding desde el ViewModel
  const { onboardingData } = useOnboarding();
  
  // Para debug
  console.log("Datos recibidos en CurriculumPreviewStep:", onboardingData);
  
  // Si no hay datos, muestra un mensaje
  if (!onboardingData) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Vista Previa del Currículum</Text>
        <Text style={styles.label}>Nombre: {onboardingData.fullName || 'No disponible'}</Text>
        <Text style={styles.label}>Ciudad: {onboardingData.city || 'No disponible'}</Text>
        <Text style={styles.label}>
            Intereses: {onboardingData.interests?.length > 0 ? onboardingData.interests.join(', ') : 'Ninguno'}
        </Text>

        <Text style={styles.sectionTitle}>Campañas Realizadas</Text>
        <Text>¡Completa tu primera campaña para empezar a construir tu currículum!</Text>

        <Text style={styles.sectionTitle}>Estadísticas Clave</Text>
        <Text>Campañas: 0</Text>
        <Text>Reseñas: N/A</Text>
        <Text>Nivel: Principiante</Text>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={onPrevious}
          >
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.finishButton]} 
            onPress={onFinish}
          >
            <Text style={styles.finishButtonText}>Finalizar Onboarding</Text>
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#e0e0e0',
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#4a90e2',
  },
  finishButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CurriculumPreviewStep;