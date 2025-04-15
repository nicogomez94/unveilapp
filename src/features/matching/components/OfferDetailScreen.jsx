import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';

const OfferDetailScreen = ({ route, navigation }) => {
    const { offer } = route.params;
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
            <Text style={styles.title}>{offer.businessName}</Text>
            <Text style={styles.description}>{offer.description}</Text>
            <Text style={styles.incentive}>{offer.incentive}</Text>
            <Text style={styles.category}>{offer.category}</Text>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default OfferDetailScreen;