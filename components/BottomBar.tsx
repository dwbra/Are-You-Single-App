import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AdminScreen from "./AdminScreen";
import Form from "./Form/Form";

const BottomNavBar = createMaterialBottomTabNavigator();

const BottomBar = () => {
  return (
    <BottomNavBar.Navigator
      initialRouteName="Form"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: "tomato" }}
    >
      <BottomNavBar.Screen
        name="Form"
        component={Form}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <BottomNavBar.Screen
        name="Data"
        component={Form}
        options={{
          tabBarLabel: "Numbers",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cellphone" color={color} size={26} />
          )
        }}
      />
      <BottomNavBar.Screen
        name="Settings"
        component={AdminScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          )
        }}
      />
    </BottomNavBar.Navigator>
  );
};

export default BottomBar;
