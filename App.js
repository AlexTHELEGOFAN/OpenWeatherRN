import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import PrevisionsDays from "./previsionsDays";

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const [dailyIcon, setDailyIcon] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [dailyWeatherTemp, setDailyWeatherTemp] = useState();

  const [forecastWeather, setForecastWeather] = useState();

  const apiKey = "da5743c28b2e55726c14c95e60546a12";
  // const image = {
  //   uri: "https://wallpaper.dog/large/17016714.jpg",
  // };

  const fetchPosition = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   setErrorMsg("Permission to access location was denied");
    //   return;
    // }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location?.coords.longitude, location?.coords.latitude);
    setLatitude(location?.coords.latitude);
    setLongitude(location?.coords.longitude);
  };

  const fetchDailyWeather = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.name);
        setDailyWeather(data.weather[0].main);
        setDailyWeatherTemp(data.main.temp);
        setDailyIcon(data.weather[0].icon);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWeeklyWeather = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastWeather(data.list[0]);

        // console.log(data.list[0].dt_txt);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPosition();
    fetchDailyWeather();
    fetchWeeklyWeather();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundMainImage}
      > */}
      {/* Title */}
      <Text style={styles.textTitle}>Météo à {location}</Text>

      {/* Current weather */}
      <View style={styles.viewToday}>
        <Text style={styles.textTodayTemp}>{dailyWeatherTemp}</Text>
        <Text style={styles.textTodayDesc}>{dailyWeather}</Text>
      </View>

      {/* Forecast weather */}
      <View style={styles.viewWeek}>
        {forecastWeather.map((day, index) => (
          <PrevisionsDays key={day} />
        ))}
      </View>

      {/* </ImageBackground> */}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundMainImage: {
    flex: 1,
    justifyContent: "center",
  },

  textTitle: {
    color: "#000000",
    fontSize: 24,
    marginLeft: 20,
    paddingVertical: 30,
    paddingLeft: 10,
  },

  textTodayTemp: {
    color: "#000000",
  },

  textTodayDesc: {
    color: "#000000",
  },

  viewWeek: {},
});
