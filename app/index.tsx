// App.tsx
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
