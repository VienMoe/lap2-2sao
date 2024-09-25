// navigation/types.ts
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// Define the navigation prop for the Auth Stack
export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

// If you're using tab navigation, define that as well
export type TabNavigatorParamList = {
  Home: undefined;
  Profile: undefined;
  // other tab routes
};

export type TabNavigationProp = BottomTabNavigationProp<TabNavigatorParamList>;

// Combine both if you are using both stack and tab navigators
export type CompositeNavigationType = CompositeNavigationProp<
  AuthStackNavigationProp,
  TabNavigationProp // This would be the second type argument
>;
