import React, { createContext, useState, useEffect, ReactNode } from "react";
import { View, Text } from "react-native";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text> {/* Loading text wrapped in <Text> */}
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children} {/* Ensure children are wrapped properly */}
      {error && <Text style={{ color: "red" }}>{error}</Text>}{" "}
      {/* Display errors */}
    </AuthContext.Provider>
  );
};
