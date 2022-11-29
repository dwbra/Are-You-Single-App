import React, { useCallback, useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { dbLoad, getAdminData } from "./db/database-helpers";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const BottomNavBar = createMaterialBottomTabNavigator();

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Settings from "./components/Settings";
import Form from "./components/Form/Form";
import Numbers from "./components/Numbers";
import { dropTable, createAdmin } from "./db/database-helpers";

export const FormContext = createContext({});

const App = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<any>(0);
  const [formData, setFormData] = useState<any>({});

  const [adminDataStore, setAdminDataStore] = useState<[] | any>([]);
  const [userDataStore, setUserDataStore] = useState<[] | any>([]);
  const [doesAdminExist, setdoesAdminExist] = useState(false);

  const loadDataCallback = useCallback(async () => {
    try {
      await dbLoad();
      const adminData: {} = (await getAdminData()) as {};
      console.log(
        "initial DB load with callback function: " + JSON.stringify(adminData)
      );

      // @ts-ignore
      if (adminData.length) {
        setdoesAdminExist(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  //on app startup create db tables if required and then grab admin data
  useEffect(() => {
    loadDataCallback();
  }, []);

  // createAdmin("Daniel", 30, "Software Developer");

  // dropTable("adminData");

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
        doesAdminExist,
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
              component={Numbers}
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
              component={Settings}
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
