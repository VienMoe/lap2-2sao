import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ForgotPasswordScreenNavigationProp } from "../types";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError type

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      const auth = getAuth(); // Get the Auth instance
      await sendPasswordResetEmail(auth, email); // Send the password reset email
      Alert.alert(
        "Email Sent",
        "A password reset link has been sent to your email."
      );
      // You can navigate back to the login screen or another screen here if needed
      navigation.goBack(); // Navigate back after sending the email
    } catch (error) {
      // Handle errors
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          Alert.alert(
            "Oops!",
            "It seems we couldn't find an account with that email. Please double-check or sign up."
          );
        } else {
          Alert.alert("Something went wrong", error.message);
        }
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
