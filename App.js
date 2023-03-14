import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

function App() {
  // Coordonees
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // Lieu
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();

  // Meteo quotidienne
  const [dailyIcon, setDailyIcon] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [dailyWeatherTemp, setDailyWeatherTemp] = useState();

  const [weatherData, setWeatherData] = useState();

  const apiKey = "da5743c28b2e55726c14c95e60546a12";
  const image = {
    uri: "https://i.pinimg.com/736x/b1/ec/43/b1ec430ab76b54a6025055f94f6d7ec9.jpg",
  };

  const fetchPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location?.coords.latitude);
    setLongitude(location?.coords.longitude);
  };

  const fetchDailyWeather = async () => {
    await fetch(
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
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response.list);
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
    <View style={styles.viewContainer}>
      {/* Title */}
      <Text style={styles.textTitle}>Weather at {location}</Text>

      {/* Current weather */}
      <View style={styles.padding20}>
        <Text style={styles.boldPaddingText}>Today's weather :</Text>
        <Text style={styles.textTodayTemp}>
          Temperature : {dailyWeatherTemp} K
        </Text>
        <Text style={styles.textTodayDesc}>Weather : {dailyWeather}</Text>
      </View>

      <Text style={styles.boldPaddingText}>Weather of the next 5 days:</Text>

      {/* Weekly weather */}
      <ScrollView>
        {weatherData?.map((data, index) => {
          const date = new Date(data.dt * 1000);
          const hour = data.dt_txt.substring(11, 19);
          const temperature = data.main.temp;
          const weatherDescription = data.weather[0].description;
          return (
            <View key={index} style={styles.padding20}>
              <Text style={styles.boldText}>
                Date : {date.toLocaleDateString()}
              </Text>
              <Text>Hour : {hour}</Text>
              <Text>Temperature : {temperature} K</Text>
              <Text>Description : {weatherDescription}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05a6c3",
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

  padding20: {
    paddingBottom: 20,
  },

  boldText: {
    fontWeight: "bold",
  },

  boldPaddingText: {
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
