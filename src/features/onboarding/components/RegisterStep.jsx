import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';
import { useOnboardingStore } from '../../../store/onboardingStore';

const RegisterStep = ({ onNext, onPrevious }) => {
  const onboardingHook = useOnboarding();
  const onboardingStore = useOnboardingStore();
  
  const { onboardingData } = onboardingHook;
  
  const [formData, setFormData] = useState({
    fullName: onboardingData.fullName || '',
    email: onboardingData.email || '',
    password: onboardingData.password || '',
    country: onboardingData.country || '',
    city: onboardingData.city || '',
  });
  
  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Función para validar email utilizando expresión regular
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Función para validar contraseña (al menos 6 caracteres)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleNext = () => {
    // Resetear errores
    setErrors({ email: '', password: '' });
    
    // Validar campos requeridos
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    // Validar formato de email
    if (!isValidEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Por favor ingresa un email válido' }));
      return;
    }
    
    // Validar longitud de contraseña
    if (!isValidPassword(formData.password)) {
      setErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres' }));
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
      <Text style={styles.title}>Información Personal</Text>
      <Text style={styles.subtitle}>
        Completa tu información personal para crear tu cuenta
      </Text>
      <TextInput
        placeholder="Nombre completo"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        style={styles.input}
      />
      
      <View>
        <TextInput
          placeholder="Correo electrónico"
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            // Limpiar el error cuando el usuario comienza a escribir de nuevo
            if (errors.email) setErrors({...errors, email: ''});
          }}
          style={[styles.input, errors.email ? styles.inputError : null]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
      
      <View>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => {
            setFormData({ ...formData, password: text });
            // Limpiar el error cuando el usuario comienza a escribir de nuevo
            if (errors.password) setErrors({...errors, password: ''});
          }}
          style={[styles.input, errors.password ? styles.inputError : null]}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>
      
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: '#ff3b30', // Color rojo para indicar error
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 5,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#5a6bff',
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterStep;