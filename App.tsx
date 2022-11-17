import React, { useCallback, useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { dbLoad, getAdminData } from "./db/database-helpers";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomBar from "./components/BottomBar";

const Stack = createNativeStackNavigator();
const BottomNavBar = createMaterialBottomTabNavigator();

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AdminScreen from "./components/AdminScreen";
import Form from "./components/Form/Form";

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
        setUserDataStore,
      }}
    >
      <PaperProvider>
        <NavigationContainer>
          <BottomNavBar.Navigator
            initialRouteName="Form"
            activeColor="#6200ee"
            inactiveColor="grey"
            shifting={true}
            barStyle={{ backgroundColor: "#D3D3D3" }}
          >
            <BottomNavBar.Screen
              name="Form"
              component={Form}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <BottomNavBar.Screen
              name="Data"
              component={Form}
              options={{
                tabBarLabel: "Numbers",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="cellphone"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <BottomNavBar.Screen
              name="Settings"
              component={AdminScreen}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={30} />
                ),
              }}
            />
          </BottomNavBar.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </FormContext.Provider>
  );
};

export default App;
