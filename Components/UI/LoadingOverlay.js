import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" style={styles.spinner} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // light gray background for subtle contrast
  },
  spinner: {
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
