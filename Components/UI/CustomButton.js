import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

const CustomButton = ({
  children,
  mode = "primary", // Default mode
  onPress,
  isLoading = false,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#e0e0e0" }}
      style={({ pressed }) => [
        styles.button,
        mode === "primary" ? styles.primary : styles.secondary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style, // Allows further customization if needed
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={mode === "primary" ? "#fff" : "#4CAF50"} />
      ) : (
        <Text style={[styles.text, styles.primaryText]}>{children}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Shadow for Android
  },
  primary: {
    backgroundColor: "#4CAF50",
  },
  secondary: {
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: "#BDBDBD",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
  },
});
