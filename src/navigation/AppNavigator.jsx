import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../features/welcome/components/WelcomeScreen';
import OnboardingScreen from '../features/onboarding/components/OnboardingScreen';
import DashboardScreen from '../features/matching/components/DashboardScreen';
import OfferDetailScreen from '../features/matching/components/OfferDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen 
          name="OfferDetail" 
          component={OfferDetailScreen} 
          options={{ title: 'Detalles de la Oferta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;