import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateRentalScreen from "./screens/CreateRentalScreen";
import RentalDetailScreen from "./screens/RentalDetailScreen";
import RentalsList from "./screens/RentalsList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFBCBC",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="RentalsList"
        component={RentalsList}
        options={{ title: "Rental List" }}
      />
      <Stack.Screen
        name="CreateRentalScreen"
        component={CreateRentalScreen}
        options={{ title: "Create a Rental request" }}
      />
      <Stack.Screen
        name="RentalDetailScreen"
        component={RentalDetailScreen}
        options={{ title: "Rental Detail" }}
      />


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
