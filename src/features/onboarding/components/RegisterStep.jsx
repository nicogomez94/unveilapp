import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useOnboarding } from '../viewmodels/useOnboarding';

const RegisterStep = ({ onNext }) => {
  const { saveStepData } = useOnboarding();
  const [formData, setFormData] = useState({
    fullName: 'Nico',
    email: 'nico@gmail.com',
    password: '123456',
    country: 'Argentina',
    city: 'Buenos Aires',
  });

  const handleNext = () => {
    // Validar datos antes de continuar
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    saveStepData(formData);
    onNext();
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
      <Button title="Siguiente" onPress={handleNext} />
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
});

export default RegisterStep;