import React, { useCallback, useEffect, useState, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { dbLoad, getAdminData } from "./db/database-helpers";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Settings from "./components/Settings";
import Form from "./components/Form/Form";
import Numbers from "./components/Numbers";

const Stack = createNativeStackNavigator();
const BottomNavBar = createMaterialBottomTabNavigator();

import { BottomNavigation, Text } from "react-native-paper";

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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "music", title: "Music", icon: "queue-music" },
    { key: "albums", title: "Albums", icon: "album" },
    { key: "recents", title: "Recents", icon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: Form,
    albums: Numbers,
    recents: Settings,
  });

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
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </FormContext.Provider>
  );
};

export default App;
