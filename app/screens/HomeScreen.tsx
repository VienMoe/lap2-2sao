// screens/HomeScreen.tsx
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Calendar, DateData } from "react-native-calendars"; // Import DateData type

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext)!;
  const [todos, setTodos] = useState<{ date: string; note: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Log Out", onPress: () => logout() },
    ]);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, { date: selectedDate!, note: newTodo }]);
      setNewTodo("");
      setModalVisible(false);
    } else {
      Alert.alert("Please enter a note.");
    }
  };

  // Define the type of the parameter 'day' as DateData
  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>

      <Calendar
        onDayPress={onDayPress} // Use the defined function
        markedDates={{
          [selectedDate || ""]: {
            selected: true,
            marked: todos.some((todo) => todo.date === selectedDate),
            dotColor: "blue",
            activeOpacity: 0,
          },
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add To-Do</Text>
      </TouchableOpacity>

      <FlatList
        data={todos.filter((todo) => todo.date === selectedDate)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.note}</Text>
          </View>
        )}
        contentContainerStyle={styles.todoList}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter your note"
            value={newTodo}
            onChangeText={setNewTodo}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  logoutButton: {
    marginTop: 20,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
