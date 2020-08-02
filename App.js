import React from 'react';
import { Platform, Alert, BackHandler, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import axios from 'axios';
import Loading from './src/components/Loading';
import Weather from './src/components/Weather';
import getEnvVars from './environment';
const { WEATHER_API_KEY } = getEnvVars();

export default class App extends React.Component {
  state = {
    isLoading: true,
  };

  checkServicesEnabled = async () => {
    const hasServicesEnabled = await Location.hasServicesEnabledAsync();
    if (!hasServicesEnabled) {
      Alert.alert(
        "location service is not enabled",
        "It is necessary to using our app. Please enable it and try again!",
        [
          {
            text: "Cancel",
            onPress: () => BackHandler.exitApp(),
            style: "cancel"
          },
          {
            text: "Ok",
            onPress: async () => {
              if (Platform.OS === 'android') {
                await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
              } else if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              }
            },
          }
        ],
        { cancelable: false }
      );
    }
  };

  requestPermission = async () => {
    const primitivePermission = await Location.getPermissionsAsync();
    if (primitivePermission.status !== 'granted') {
      const permissionAfterRequest = await Location.requestPermissionsAsync();
      if (permissionAfterRequest.status === 'granted') {
        await this.getLocation(permissionAfterRequest.status);
      } 
    } else if (primitivePermission.status === 'granted') {
      await this.getLocation(primitivePermission.status);
    }
  };

  getLocation = async (status) => {
    if (status !== 'granted') {
      Alert.alert(
        "You just denied to give us your location",
        "If you wanna use our app, please restart app and grant location permission",
        [
          {
            text: "Ok",
            onPress: () => BackHandler.exitApp(),
          }
        ],
        { cancelable: false }
      );
    } else if (status === 'granted') {
      const {
        coords: {
          latitude, longitude   
        }
      } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.Balanced
      });
      await this.getWeather(latitude, longitude);
    }
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`);
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    this.setState({
      isLoading: false,
      temp,
      weather,
    })
  };
  
  async componentDidMount() {
    await this.checkServicesEnabled();
    await this.requestPermission();
  };

  render() {
    const { isLoading, weather, temp } = this.state;
    return (
        isLoading 
        ? <Loading />
        : <Weather weather={weather} temp={temp} />
    )
  }
};
