// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import Login from "@/app/Login/index";
import Dashboard from "@/app/Dashboard/index";
import FriendDetails from "@/app/FriendDetails/index";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FriendDetails" component={FriendDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}