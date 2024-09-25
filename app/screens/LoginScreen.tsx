// screens/LoginScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator, // Import ActivityIndicator for loading state
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { LoginScreenNavigationProp } from "../types"; // Import the types
import logo from "../assets/logo.jpg";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import FontAwesome

const LoginScreen = () => {
  const { login } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false); // State for loading
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Specify the type here

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true
    try {
      await login(email, password);
      navigation.navigate("HomeScreen"); // Ensure this matches the name in your navigator
    } catch (error) {
      alert(`Đăng nhập thất bại`); // More detailed error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSignUp = () => {
    navigation.navigate("Signup"); // Navigate to the Sign Up screen
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword} // Toggle password visibility
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconButton}
        >
          <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loading indicator
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  logo: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    height: 40,
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#007bff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#007bff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
