import React, { useCallback, useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
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
import {
  dbLoad,
  getAdminData,
  deleteAdmin,
  updateAdmin
} from "./db/database-helpers";

// const Stack = createNativeStackNavigator()

export const FormContext = createContext({});

const App = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<any>(0);
  const [formData, setFormData] = useState<any>({});

  const [adminDataStore, setAdminDataStore] = useState<[] | any>([]);
  const [userDataStore, setUserDataStore] = useState<[] | any>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      await dbLoad();
      const adminData: {} = (await getAdminData()) as {};
      // @ts-ignore
      if (adminData.length) {
        setAdminDataStore(
          //concating new arrays into the adminDataStore using spread operator
          // using three dot spread on the data object to destructure the objects
          // @ts-ignore
          [...adminDataStore, ...adminData._array]
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  //on app startup create db tables if required and then grab admin data
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  // console.log(adminDataStore);

  return (
    <FormContext.Provider
      value={{
        activeStepIndex,
        setActiveStepIndex,
        formData,
        setFormData,
        adminDataStore,
        setAdminDataStore,
        userDataStore,
        setUserDataStore
      }}
    >
      <PaperProvider>
        <Stepper />
        <Form />
      </PaperProvider>
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
