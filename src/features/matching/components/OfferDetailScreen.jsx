import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const OfferDetailScreen = ({ route, navigation }) => {
    const { offer } = route.params;
    const [proposedDates, setProposedDates] = useState([]);

    const handleProposeDates = () => {
        Alert.prompt(
            'Proponer Fechas',
            'Ingrese 1 o 2 fechas tentativas (separadas por coma):',
            (dates) => {
                if (dates) {
                    const datesArray = dates.split(',').map((date) => date.trim());
                    setProposedDates(datesArray);
                    simulateBusinessResponse(datesArray);
                }
            }
        );
    };

    const simulateBusinessResponse = (datesArray) => {
        setTimeout(() => {
            const accepted = Math.random() < 0.5; // Simula la aceptación o rechazo del negocio
            if (accepted) {
                Alert.alert(
                    '¡Propuesta Aceptada!',
                    `El negocio ha aceptado tu propuesta para ${datesArray[0]}!`
                );
            } else {
                Alert.alert(
                    'Propuesta Rechazada',
                    'El negocio ha seleccionado a otro creador para esta oferta.'
                );
            }
        }, 2000); // Simula un tiempo de espera de 2 segundos
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{offer.businessName}</Text>
            <Text style={styles.description}>{offer.description}</Text>
            <Text style={styles.incentive}>Incentivo: {offer.incentive}</Text>
            <Text style={styles.category}>Categoría: {offer.category}</Text>
            <TouchableOpacity style={styles.button} onPress={handleProposeDates}>
                <Text style={styles.buttonText}>Mostrar Interés</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    incentive: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 8,
    },
    category: {
        fontSize: 12,
        color: 'gray',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default OfferDetailScreen;