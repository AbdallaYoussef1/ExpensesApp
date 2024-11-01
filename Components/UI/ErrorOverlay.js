import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";


const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An Error Occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <CustomButton onPress={onConfirm} style={styles.button}>
        Okay
      </CustomButton>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8d7da",  // Light red background for error
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#721c24",  // Darker red for text
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#721c24",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f5c6cb", // Lighter red button background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
});
