import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';
import { useOnboardingStore } from '../../../store/onboardingStore';

const RegisterStep = ({ onNext, onPrevious }) => {
  const onboardingHook = useOnboarding();
  const onboardingStore = useOnboardingStore();
  
  console.log('Funciones disponibles en useOnboarding:', Object.keys(onboardingHook));
  console.log('Funciones disponibles en useOnboardingStore:', Object.keys(onboardingStore));
  
  const { onboardingData } = onboardingHook;
  
  const [formData, setFormData] = useState({
    fullName: onboardingData.fullName || '',
    email: onboardingData.email || '',
    password: onboardingData.password || '',
    country: onboardingData.country || '',
    city: onboardingData.city || '',
  });

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    try {
      onboardingStore.updateStepData(formData);
      onNext();
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos. Por favor intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro Inicial</Text>
      <TextInput
        placeholder="Nombre completo"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="País"
        value={formData.country}
        onChangeText={(text) => setFormData({ ...formData, country: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Ciudad"
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
        style={styles.input}
      />
      <View style={styles.navigationButtons}>
        {onPrevious && (
          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={onPrevious}
          >
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.nextButton,
            !onPrevious && { marginLeft: 0 }
          ]} 
          onPress={handleNext}
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  backButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default RegisterStep;