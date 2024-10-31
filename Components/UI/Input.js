import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ Label, InputConfig }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{Label}</Text>
      <TextInput style={styles.input} {...InputConfig} />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 4,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
});
