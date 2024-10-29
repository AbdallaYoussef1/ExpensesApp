import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => 
        pressed && styles.Pressed
      }
    >
      <View style={styles.buttonStyle}>
        <Ionicons name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
};
export default IconButton;

const styles = StyleSheet.create({
  Pressed: {
    opacity: 0.7,
  },
  buttonStyle: {
    padding: 6,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 2,
  },
});
