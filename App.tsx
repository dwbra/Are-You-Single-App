import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";
import { UserType, AdminType } from "./type-models";
import {
  getDBConnection,
  getData,
  saveData,
  createTable,
  deleteRow
} from "./db/database-helpers";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import { AskForNumber } from "./components/AskForNumber";
const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [user, setUser] = useState({
    name: "",
    number: ""
  });

  const [admin, setAdmin] = useState({
    name: "",
    age: ""
  });

  const [adminDataStore, setAdminDataStore] = useState<[] | any>([]);
  const [userDataStore, setUserDataStore] = useState<[] | any>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const adminTable = await createTable(db, "admin-data");
      const userTable = await createTable(db, "user-data");

      const adminData = await getData(db, "admin-data");
      const userData = await getData(db, "user-data");

      if (adminData.length) {
        //concating new arrays into the adminDataStore using spread operator
        //https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
        setAdminDataStore({
          adminDataStore: [...adminDataStore, adminData]
        });
      }

      if (userData.length) {
        setUserDataStore({ userDataStore: [...userDataStore, userData] });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  //on app startup create db tables if required and then grab admin and user data
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  // const addTodo = async () => {
  //   if (!newTodo.trim()) return;
  //   try {
  //     const newTodos = [
  //       ...todos,
  //       {
  //         id: todos.length
  //           ? todos.reduce((acc, cur) => {
  //               if (cur.id > acc.id) return cur;
  //               return acc;
  //             }).id + 1
  //           : 0,
  //         value: newTodo
  //       }
  //     ];
  //     setTodos(newTodos);
  //     const db = await getDBConnection();
  //     await saveTodoItems(db, newTodos);
  //     setNewTodo("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Step1 - Ask for number" component={AskForNumber} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row"
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: "800"
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-end"
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    margin: 10,
    backgroundColor: "pink"
  }
});
export default App;
