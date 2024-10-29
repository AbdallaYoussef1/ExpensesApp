import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import AllExpenses from "./Screens/AllExpenses";
import RecentExpenses from "./Screens/RecentExpenses";
import ManageExpenses from "./Screens/ManageExpenses";
import IconButton from "./Components/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: "#4A90E2" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#4A90E2" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B0BEC5",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "AllExpenses") {
            iconName = "list";
          } else if (route.name === "RecentExpenses") {
            iconName = "time";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            color={tintColor}
            size={25}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{ title: "All Expenses" }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{ title: "Recent Expenses" }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ExpensesOverview"
          screenOptions={{
            headerStyle: { backgroundColor: "#4A90E2" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpenses}
            options={{  }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
