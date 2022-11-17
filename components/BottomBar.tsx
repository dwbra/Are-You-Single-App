import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AdminScreen from "./AdminScreen";
import Form from "./Form/Form";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

const BottomNavBar = createMaterialBottomTabNavigator();

const BottomBar = () => {
  return (
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
            <MaterialCommunityIcons name="cellphone" color={color} size={26} />
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
  );
};

export default BottomBar;
