// components/ProtectedRoute.tsx
import React, { useContext, ReactNode } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

// Define props interface
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext)!;

  if (!user) {
    return (
      <View>
        <Text>Please login first.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
