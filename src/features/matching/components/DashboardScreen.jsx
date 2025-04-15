import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { mockOffers } from '../../../data/mock/mockOffers';
import { useOnboardingStore } from '../../../store/onboardingStore';

const DashboardScreen = () => {
    const { interests } = useOnboardingStore();

    const filteredOffers = mockOffers.filter(
        (offer) => offer.level === 1 && interests.some((interest) => offer.category === interest)
    );

    return (
        <View style={styles.container}>
        <Text>Ofertas Disponibles</Text>
        <FlatList
            data={filteredOffers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.card}>
                <Text>{item.business}</Text>
                <Text>{item.description}</Text>
                <Text>{item.reward}</Text>
            </View>
            )}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
});

export default DashboardScreen;