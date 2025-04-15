import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SocialMediaStep = ({ onNext }) => {
    const [formData, setFormData] = useState({
        instagram: '',
        tiktok: '',
    });

    const handleNext = () => {
        onNext(formData);
    };

    return (
        <View style={styles.container}>
            <Text>Redes Sociales</Text>
            <TextInput
                placeholder="Instagram"
                value={formData.instagram}
                onChangeText={(text) => setFormData({ ...formData, instagram: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="TikTok"
                value={formData.tiktok}
                onChangeText={(text) => setFormData({ ...formData, tiktok: text })}
                style={styles.input}
            />
            <Button title="Siguiente" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },
});

export default SocialMediaStep;