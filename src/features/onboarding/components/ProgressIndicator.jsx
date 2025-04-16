import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(currentStep / steps) * 100}%` }
          ]} 
        />
      </View>
      <Text style={styles.stepText}>
        Paso {currentStep} de {steps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 50,
    paddingBottom: 10,
    backgroundColor: 'white', // Fondo blanco para la barra
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5a6bff',
    borderRadius: 4,
  },
  stepText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default ProgressIndicator;