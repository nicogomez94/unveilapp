import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { mockOffers } from '../../../data/mock/mockOffers';

const OfferDetailScreen = ({ route, navigation }) => {
    const { offerId } = route.params || {};
    
    // Buscar la oferta por ID en los datos mock
    const offer = mockOffers.find(o => o.id === offerId);
    
    // Estados para el flujo de "Mostrar Interés"
    const [proposedDates, setProposedDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [responseStatus, setResponseStatus] = useState(null); // 'pending', 'accepted', 'rejected'
    const [isLoading, setIsLoading] = useState(false);
    
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

    const handleProposeDates = () => {
        // Solo permitir proponer fechas si no hay una respuesta aún
        if (responseStatus === null) {
            setModalVisible(true);
        } else {
            Alert.alert(
                "Propuesta enviada",
                "Ya has enviado una propuesta para esta oferta."
            );
        }
    };

    const handleConfirmDates = () => {
        if (inputText.trim()) {
            const datesArray = inputText.split(',').map(date => date.trim());
            
            if (datesArray.length > 0) {
                setProposedDates(datesArray);
                setModalVisible(false);
                
                // Iniciar simulación de respuesta
                setResponseStatus('pending');
                setIsLoading(true);
                
                // Simular tiempo de espera del negocio
                setTimeout(() => {
                    simulateBusinessResponse(datesArray);
                    setIsLoading(false);
                }, 3000);
            } else {
                Alert.alert("Error", "Por favor ingresa al menos una fecha válida");
            }
        } else {
            Alert.alert("Error", "Por favor ingresa al menos una fecha");
        }
    };

    const simulateBusinessResponse = (datesArray) => {
        // 60% de probabilidad de aceptación para una experiencia más positiva
        const accepted = Math.random() < 0.6;
        
        if (accepted) {
            // Seleccionar aleatoriamente una fecha si hay más de una
            const selectedDate = datesArray.length > 1 
                ? datesArray[Math.floor(Math.random() * datesArray.length)]
                : datesArray[0];
                
            setResponseStatus('accepted');
            
            Alert.alert(
                "¡Propuesta Aceptada!",
                `¡Felicitaciones! ${offer.brand} ha aceptado tu propuesta para el ${selectedDate}.`,
                [
                    { 
                        text: "Ver detalles", 
                        onPress: () => Alert.alert(
                            "Próximos pasos",
                            "El negocio se pondrá en contacto contigo para coordinar los detalles."
                        ) 
                    }
                ]
            );
        } else {
            setResponseStatus('rejected');
            
            Alert.alert(
                "Propuesta no aceptada",
                "El negocio ha seleccionado a otro creador para esta oferta.",
                [{ text: "Entendido" }]
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Header con información básica */}
            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.brand}>Por: {offer.brand}</Text>
            <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{offer.category}</Text>
            </View>
            
            {/* Detalles de la oferta */}
            <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.description}>{offer.description}</Text>
                
                <Text style={styles.sectionTitle}>Lo que ofrecemos</Text>
                <View style={styles.benefitsContainer}>
                    <View style={styles.benefitItem}>
                        <Text style={styles.benefitLabel}>Compensación:</Text>
                        <Text style={styles.benefitValue}>${offer.compensation}</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Text style={styles.benefitLabel}>Incentivo:</Text>
                        <Text style={styles.benefitValue}>{offer.incentive}</Text>
                    </View>
                </View>
            </View>
            
            {/* Sección de propuesta de fechas */}
            <View style={styles.proposalSection}>
                {proposedDates.length > 0 && (
                    <View style={styles.proposedDatesContainer}>
                        <Text style={styles.sectionTitle}>Fechas propuestas:</Text>
                        {proposedDates.map((date, index) => (
                            <Text key={index} style={styles.dateItem}>• {date}</Text>
                        ))}
                    </View>
                )}
                
                {/* Muestra el estado según la respuesta */}
                {responseStatus === 'pending' && (
                    <View style={styles.statusContainer}>
                        <Text style={styles.pendingText}>Esperando respuesta del negocio...</Text>
                        {isLoading && <ActivityIndicator size="small" color="#4a90e2" />}
                    </View>
                )}
                
                {responseStatus === 'accepted' && (
                    <View style={[styles.statusContainer, styles.acceptedContainer]}>
                        <Text style={styles.acceptedText}>¡Propuesta aceptada!</Text>
                        <Text>El negocio se pondrá en contacto contigo pronto.</Text>
                    </View>
                )}
                
                {responseStatus === 'rejected' && (
                    <View style={[styles.statusContainer, styles.rejectedContainer]}>
                        <Text style={styles.rejectedText}>Propuesta no aceptada</Text>
                        <Text>El negocio seleccionó a otro creador.</Text>
                    </View>
                )}
                
                {/* Botón de proponer fechas (se oculta si ya hay respuesta) */}
                {responseStatus === null && (
                    <TouchableOpacity 
                        style={styles.proposeButton} 
                        onPress={handleProposeDates}
                    >
                        <Text style={styles.proposeButtonText}>Mostrar Interés</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Modal para ingresar fechas */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Proponer Fechas</Text>
                        <Text style={styles.modalText}>
                            Ingresa 1 o 2 fechas tentativas (separadas por coma) para realizar esta campaña:
                        </Text>
                        
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder="Ej: 10/05/2025, 15/05/2025"
                            placeholderTextColor="#999"
                        />
                        
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleConfirmDates}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    brand: {
        fontSize: 18,
        color: '#555',
        marginBottom: 12,
    },
    categoryTag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    categoryText: {
        fontSize: 14,
        color: '#555',
    },
    detailsSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
        marginBottom: 16,
    },
    benefitsContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
    },
    benefitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    benefitLabel: {
        fontSize: 16,
        color: '#666',
    },
    benefitValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4a90e2',
    },
    proposalSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    proposedDatesContainer: {
        marginBottom: 16,
    },
    dateItem: {
        fontSize: 16,
        paddingVertical: 4,
        color: '#333',
    },
    statusContainer: {
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    pendingText: {
        fontSize: 16,
        color: '#f57c00',
        fontWeight: '600',
        marginBottom: 8,
    },
    acceptedContainer: {
        backgroundColor: '#e8f5e9',
    },
    acceptedText: {
        fontSize: 16,
        color: '#2e7d32',
        fontWeight: '600',
        marginBottom: 4,
    },
    rejectedContainer: {
        backgroundColor: '#ffebee',
    },
    rejectedText: {
        fontSize: 16,
        color: '#c62828',
        fontWeight: '600',
        marginBottom: 4,
    },
    proposeButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    proposeButtonText: {
        color: 'white',
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
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 24,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#4a90e2',
        marginLeft: 8,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OfferDetailScreen;