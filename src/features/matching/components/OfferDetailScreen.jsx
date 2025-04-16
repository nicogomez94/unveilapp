import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import { mockOffers } from '../../../data/mock/mockOffers';

const OfferDetailScreen = ({ route, navigation }) => {
    const { offerId } = route.params || {};
    
    // Buscar la oferta por ID en los datos mock
    const offer = mockOffers.find(o => o.id === offerId);
    
    // Verifica si offer existe, si no, muestra un mensaje
    if (!offer) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontró información de la oferta</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const [proposedDates, setProposedDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleProposeDates = () => {
        setModalVisible(true);
    };

    const handleConfirmDates = () => {
        if (inputText) {
            const datesArray = inputText.split(',').map((date) => date.trim());
            setProposedDates(datesArray);
            simulateBusinessResponse(datesArray);
        }
        setModalVisible(false);
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
            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.brand}>Marca: {offer.brand}</Text>
            <Text style={styles.description}>{offer.description}</Text>
            <Text style={styles.compensation}>Compensación: ${offer.compensation}</Text>
            <Text style={styles.category}>Categoría: {offer.category}</Text>
            
            <TouchableOpacity style={styles.button} onPress={handleProposeDates}>
                <Text style={styles.buttonText}>Mostrar Interés</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Ingrese 1 o 2 fechas tentativas (separadas por coma):</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder="ej: 10/05/2024, 15/05/2024"
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Confirmar" onPress={handleConfirmDates} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    brand: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
    },
    compensation: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4a90e2',
        marginBottom: 8,
    },
    category: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default OfferDetailScreen;