import React, { useCallback, useEffect, useState, createContext } from "react";
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
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Form from "./components/Form/Form";
import Stepper from "./components/Stepper";
import { dbLoad, createAdmin } from "./db/database-helpers";

// const Stack = createNativeStackNavigator()
// export const DarkMode = createContext(false);

export const FormContext = createContext({});

const App = () => {
  // const isDarkMode = useColorScheme() === "dark";
  const [activeStepIndex, setActiveStepIndex] = useState<any>(0);
  const [formData, setFormData] = useState<any>({});

  // const [adminDataStore, setAdminDataStore] = useState<[] | any>([]);
  // const [userDataStore, setUserDataStore] = useState<[] | any>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      // const db = await getDBConnection();
      // // console.log(db);
      // // const TEST = await testCallback(db);
      // const adminTable = await createAdminTable(db);
      // // const adminTable = await createUserTable(db, "user-data");
      // console.log(adminTable);
      // const createAdminUser = await saveAdminData(db);
      // console.log(createAdminUser);
      // // const userTable = await createTable(db, "user-data");
      // const adminData = await getAdminData(db);
      // console.log(adminData);
      // const userData = await getData(db, "user-data");
      // if (adminData.length) {
      //   //concating new arrays into the adminDataStore using spread operator
      //   //https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      //   setAdminDataStore({
      //     adminDataStore: [...adminDataStore, adminData]
      //   });
      // }
      // if (userData.length) {
      //   setUserDataStore({ userDataStore: [...userDataStore, userData] });
      // }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // //on app startup create db tables if required and then grab admin and user data
  useEffect(() => {
    loadDataCallback();
    dbLoad();
    createAdmin();

    // createUser();
    // getData();
  }, []);

  return (
    <FormContext.Provider
      value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
      <Stepper />
      <Form />
    </FormContext.Provider>
  );
};
// const styles = StyleSheet.create({
//   appTitleView: {
//     marginTop: 20,
//     justifyContent: "center",
//     flexDirection: "row"
//   },
//   appTitleText: {
//     fontSize: 24,
//     fontWeight: "800"
//   },
//   textInputContainer: {
//     marginTop: 30,
//     marginLeft: 20,
//     marginRight: 20,
//     borderRadius: 10,
//     borderColor: "black",
//     borderWidth: 1,
//     justifyContent: "flex-end"
//   },
//   textInput: {
//     borderWidth: 1,
//     borderRadius: 5,
//     height: 30,
//     margin: 10,
//     backgroundColor: "pink"
//   }
// });
export default App;
