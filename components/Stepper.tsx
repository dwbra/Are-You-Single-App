import React, { useContext, useEffect } from "react";
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
import { ProgressBar, MD3Colors } from "react-native-paper";
import { FormContext } from "../App";

const Stepper = () => {
  // @ts-ignore
  const { activeStepIndex } = useContext(FormContext);
  // console.log(activeStepIndex);
  //use a ternary to return the correct progression step based on context
  let progress =
    activeStepIndex === 0
      ? 0.3
      : activeStepIndex === 1
      ? 0.6
      : activeStepIndex === 2
      ? 1
      : 0;
  // console.log(progress);
  return (
    <SafeAreaView>
      <ProgressBar progress={progress} color={MD3Colors.error50} />
    </SafeAreaView>
  );
};

export default Stepper;
