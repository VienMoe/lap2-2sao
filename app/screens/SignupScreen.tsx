// screens/SignupScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpg"; // Adjust the path if necessary
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import FontAwesome
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigation/types"; // Import your defined navigation type

const SignupScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>(); // Specify the type for navigation
  const { signup } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    console.log("Email:", email); // Debugging line
    console.log("Password:", password); // Debugging line
    console.log("Confirm Password:", confirmPassword); // Debugging line

    if (!validateEmail(email)) {
      Alert.alert("Không đúng định dạng Email");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu nhập lại không đúng");
      return;
    }

    try {
      await signup(email, password);
      Alert.alert("Đăng ký thành công", "Bạn sẽ trở về màn hình đăng nhập", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Signup error:", error); // Log the error for debugging
      Alert.alert("Error", "Tài khoản này đã tồn tại");
    }
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
          secureTextEntry={!showPassword}
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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.iconButton}
        >
          <FontAwesome
            name={showConfirmPassword ? "eye" : "eye-slash"}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignupScreen;
