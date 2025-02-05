import React, { useState, useEffect } from 'react';
import { StatusBar, Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function App() {
    const [mySound, setMySound] = useState(null);

    async function playSound() {
        try {
            if (mySound) {
                await mySound.unloadAsync();
            }
            const { sound } = await Audio.Sound.createAsync(require('./assets/short1.wav'));
            setMySound(sound);
            await sound.playAsync();
        } catch (error) {}
    }

    useEffect(() => {
        return mySound ? () => mySound.unloadAsync() : undefined;
    }, [mySound]);

    return (
        <View style={styles.container}>
            <StatusBar />
            <Button title="Play Sound" onPress={playSound} />
        </View>
    );
}
