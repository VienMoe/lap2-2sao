// App.tsx
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
};

export default App;
