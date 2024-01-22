import {StyleSheet, View} from 'react-native';
import LoginScreen from "./src/components/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: "center"
  }
});

