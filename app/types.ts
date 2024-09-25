// types.ts (or navigation.ts)
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the parameter list for your stack navigator
export type RootStackParamList = {
  Login: undefined; // no parameters
  Signup: undefined; // no parameters
  HomeScreen: undefined;
  ForgotPassword: undefined; // Add this line
  VerifyOtp: { email: string }; // Ensure this includes params if needed
  ResetPassword: { email: string }; // no parameters
};

// Define the navigation prop for your screens
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
export type VerifyOtpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VerifyOtp"
>;

export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

export type SignupScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Signup">,
  StackNavigationProp<RootStackParamList>
>;
export type AuthStackParamList = {
  Login: undefined; // No parameters for Login
  Signup: undefined; // No parameters for Signup
  // Add other routes as necessary
};
