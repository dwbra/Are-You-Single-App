import React, { useCallback, useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { dbLoad, getAdminData } from "./db/database-helpers";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomBar from "./components/BottomBar";

const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomBar"
              component={BottomBar}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </FormContext.Provider>
  );
};

export default App;
