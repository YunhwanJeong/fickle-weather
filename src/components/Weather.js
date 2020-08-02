import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as weatherConditions from '../constants/WeatherConditions.json';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconic: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 50
    },
    icon: {
        paddingTop: 90,
        paddingBottom: 30,
    },
    temp: {
        fontSize: 30,
    },
    heading: {
        fontSize: 35,
        fontWeight: "600",
        letterSpacing: 1.5,
    },
    subheading: {
        fontSize: 20,
        paddingTop: 20,
        letterSpacing: 1.3,
    }
});

function Weather({ weather, temp }) {
    return (
        <LinearGradient
            colors={weatherConditions[weather].colors.gradient}
            style={styles.container}
        >
            <StatusBar style={weatherConditions[weather].statusBar} />
            <View style={styles.iconic}>
                <MaterialCommunityIcons 
                    style={styles.icon} 
                    color={weatherConditions[weather].colors.icon} 
                    name={weatherConditions[weather].iconName} 
                    size={90} 
                />
                <Text 
                    style={[
                        styles.temp,
                        { color: weatherConditions[weather].colors.temp }
                        ]}
                >
                    {temp}°
                </Text>
            </View>
            <View style={styles.text}>
                <Text 
                    style={[
                        styles.heading, 
                        { color: weatherConditions[weather].colors.heading }
                    ]}
                >
                    {weatherConditions[weather].heading}
                </Text>
                <Text 
                    style={[
                        styles.subheading,
                        { color: weatherConditions[weather].colors.subheading}
                    ]}
                >
                    {weatherConditions[weather].subheading}
                </Text>
            </View>
        </LinearGradient>
    )
};

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weather: PropTypes.oneOf([
        "Clouds",
        "Clear",
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
    ]).isRequired,
}

export default Weather;