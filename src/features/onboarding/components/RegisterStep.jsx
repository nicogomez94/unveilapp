import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    city: '',
  });

  const handleNext = () => {
    // Validar datos antes de continuar
    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    onNext(formData);
  };

  return (
    <View style={styles.container}>
      <Text>Registro Inicial</Text>
      <TextInput
        placeholder="Nombre completo"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
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
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});

export default RegisterStep;