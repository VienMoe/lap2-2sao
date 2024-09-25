// screens/HomeScreen.tsx
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
});

export default HomeScreen;
