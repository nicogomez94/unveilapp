import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/components/OnboardingScreen';
import DashboardScreen from '../features/matching/components/DashboardScreen';
import OfferDetailScreen from '../features/matching/components/OfferDetailScreen'; // Importa OfferDetailScreen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;