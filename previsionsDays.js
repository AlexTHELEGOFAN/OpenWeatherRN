import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrevisionsHours from "./previsionsHours";

function PrevisionsDays({ day }) {
  return (
    <View
      style={styles.viewPrevision}
      // key={index}
    >
      {forecastWeather.map((day, index) => (
        <View>
          <Text style={styles.textDate}>
            {forecastWeather.dt_txt.slice(0, 10)}
          </Text>
          <Text style={styles.textHour}>{day.dt_txt.slice(-8)}</Text>
          <Text style={styles.textTemp}>{day.main.temp}</Text>
          <Text style={styles.textWeather}>{day.weather[0].main}</Text>
        </View>
      ))}
    </View>
  );
}

export default PrevisionsDays;

const styles = StyleSheet.create({
  viewPrevision: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textDate: {},

  textHour: {},

  textTemp: {},

  textWeather: {},
});
