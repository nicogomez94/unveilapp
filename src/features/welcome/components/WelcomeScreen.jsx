import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5a6bff','#08d9e3']}
        style={styles.gradientBackground}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>UNVEIL</Text>
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>¡Bienvenido a Unveil!</Text>
            <Text style={styles.subtitle}>
              Conectando creadores con negocios locales
            </Text>
            <Text style={styles.description}>
              Crea contenido auténtico, gana incentivos y construye tu currículum como creador UGC.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            >
              <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
            </TouchableOpacity>
          </View>
          
          {/* <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🔍</Text>
              </View>
              <Text style={styles.featureText}>Matching inteligente</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📋</Text>
              </View>
              <Text style={styles.featureText}>Currículum automático</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🎁</Text>
              </View>
              <Text style={styles.featureText}>Incentivos exclusivos</Text>
            </View>
          </View> */}
        </View>
        
        <Text style={styles.versionText}>v1.0.0</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a90e2',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a6bff',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#5a6bff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  featureItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
});

export default WelcomeScreen;