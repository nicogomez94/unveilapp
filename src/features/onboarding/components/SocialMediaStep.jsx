import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const SocialMediaStep = ({ onNext, onPrevious }) => {
  const { onboardingData, updateStepData } = useOnboarding();
  const [socialData, setSocialData] = useState({
    instagram: onboardingData.instagram || '',
    tiktok: onboardingData.tiktok || '',
  });

  const handleNext = () => {
    updateStepData(socialData);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de Redes Sociales</Text>
      <Text style={styles.subtitle}>
        Conecta tus redes sociales para mejorar tu perfil (opcional)
      </Text>
      <TextInput
        placeholder="Usuario de Instagram (sin @)"
        value={socialData.instagram}
        onChangeText={(text) => setSocialData({ ...socialData, instagram: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Usuario de TikTok (sin @)"
        value={socialData.tiktok}
        onChangeText={(text) => setSocialData({ ...socialData, tiktok: text })}
        style={styles.input}
      />
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
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: '#ddd',
  },
  nextButton: {
    backgroundColor: '#007BFF',
  },
  backButtonText: {
    color: '#333',
  },
  nextButtonText: {
    color: '#fff',
  },
});

export default SocialMediaStep;