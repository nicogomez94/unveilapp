import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const SocialMediaStep = ({ onNext }) => {
  const { saveStepData } = useOnboarding();
  const [formData, setFormData] = useState({
    instagram: '',
    tiktok: '',
  });

  const handleNext = () => {
    saveStepData(formData);
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
        value={formData.instagram}
        onChangeText={(text) => setFormData({ ...formData, instagram: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Usuario de TikTok (sin @)"
        value={formData.tiktok}
        onChangeText={(text) => setFormData({ ...formData, tiktok: text })}
        style={styles.input}
      />
      <Button title="Siguiente" onPress={handleNext} />
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
});

export default SocialMediaStep;