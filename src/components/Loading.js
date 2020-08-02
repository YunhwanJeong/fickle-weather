import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function Loading() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.text}>Getting the fickle weather...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#ffe000",
        paddingBottom: 250
    },
    text: {
        color: "#403B4A",
        fontSize: 21,
        fontWeight: "bold",
    }
});

export default Loading;