import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { mockOffers } from '../../../data/mock/mockOffers';
import { useOnboarding } from '../../onboarding/viewmodels/useOnboarding'; // Importa el hook useOnboarding

const DashboardScreen = () => {
    const { onboardingData } = useOnboarding(); // Usa el hook useOnboarding
    const { interests } = onboardingData; // Obtiene los intereses del objeto onboardingData

    const filteredOffers = mockOffers.filter(
        (offer) => offer.level === 1 && (interests ? interests.some((interest) => offer.category === interest) : false)
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.businessName}>{item.businessName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.reward}>Incentivo: {item.incentive}</Text>
            <Text style={styles.category}>Categoría: {item.category}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ofertas Disponibles</Text>
            <FlatList
                data={filteredOffers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
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
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    businessName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
    },
    reward: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    category: {
        fontSize: 12,
        color: 'gray',
    },
});

export default DashboardScreen;