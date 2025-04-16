import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { mockOffers } from '../../../data/mock/mockOffers';
import { useOnboarding } from '../../onboarding/viewmodels/useOnboarding'; // Importa el hook useOnboarding
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = () => {
    const { onboardingData } = useOnboarding();
    const navigation = useNavigation();
    
    // Verificar que onboardingData e interests existan
    const interests = onboardingData?.interests || [];
    
    console.log("Datos en DashboardScreen:", onboardingData);
    console.log("Intereses:", interests);

    // Filtrar ofertas basadas en nivel e intereses
    const filteredOffers = mockOffers.filter(
        (offer) => offer.level === 1 && interests.some((interest) => offer.category === interest)
    );

    const renderOfferItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.offerCard}
            onPress={() => navigation.navigate('OfferDetail', { offerId: item.id })}
        >
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerBrand}>{item.brand}</Text>
            <Text style={styles.offerCategory}>{item.category}</Text>
            <Text style={styles.offerDescription} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.incentive}>Incentivo: {item.incentive}</Text>
            <Text style={styles.offerCompensation}>Compensación: ${item.compensation}</Text>
            
            <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigation.navigate('OfferDetail', { offerId: item.id })}
            >
                <Text style={styles.detailsButtonText}>Ver Detalles</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                    colors={['#000',"#fff"]}
                    style={styles.gradientBackground}
            ></LinearGradient>
                <Text style={styles.welcomeText}>
                    Bienvenido, {onboardingData?.fullName || 'Usuario'}
                </Text>
                
                <Text style={styles.sectionTitle}>Ofertas Recomendadas</Text>
                
                {filteredOffers.length > 0 ? (
                    <FlatList
                        data={filteredOffers}
                        renderItem={renderOfferItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.offersList}
                    />
                ) : (
                    <Text style={styles.noOffersText}>
                        No hay ofertas disponibles para tus intereses. ¡Pronto tendremos más!
                    </Text>
                )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#5a6bff',
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 15,
        color: '#f4f4f4',
    },
    offersList: {
        paddingBottom: 20,
    },
    offerCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    offerBrand: {
        fontSize: 16,
        marginBottom: 5,
    },
    offerCategory: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    offerDescription: {
        fontSize: 14,
        color: '#555',
        marginVertical: 8,
    },
    incentive: {
        fontSize: 14,
        color: '#95cf93', // Verde para destacar el incentivo
        marginBottom: 4,
    },
    offerCompensation: {
        fontSize: 16,
        fontWeight: '500',
        color: '#e6ba86',
    },
    detailsButton: {
        backgroundColor: '#5a6bff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    detailsButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    noOffersText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 30,
    }
});

export default DashboardScreen;