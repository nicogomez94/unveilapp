import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useOnboardingStore } from '../store/onboardingStore';

const DebugButton = () => {
  const { onboardingData } = useOnboardingStore();

  const showDebugInfo = () => {
    try {
      const formattedData = JSON.stringify(onboardingData || {}, null, 2);
      
      Alert.alert(
        'Estado Actual (Zustand)', 
        `Datos almacenados:\n\n${formattedData}`, 
        [{ text: 'OK', style: 'default' }], 
        { cancelable: true } 
      );
    } catch (error) {
      console.error("Error al mostrar datos de depuración:", error);
      Alert.alert("Error", "No se pudieron mostrar los datos de depuración.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.debugButton}
      onPress={showDebugInfo}
    >
      <Text style={styles.debugButtonText}>Verificar Datos (Debug)</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  debugButton: {
    backgroundColor: '#f0f0f0', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center', 
    marginTop: 20, 
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: '#ccc', 
  },
  debugButtonText: {
    color: '#555', 
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DebugButton;