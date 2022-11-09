import React, { useContext } from "react";
import { FormContext } from "../../App";
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

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import Denied from "./Denied";
// import { Basic, Success, Workspace } from "../Forms";

function Form() {
  // @ts-ignore
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <FirstStep />;
      break;
    case 1:
      stepContent = <SecondStep />;
      break;
    case 2:
      stepContent = <ThirdStep />;
      break;
    case 99:
      stepContent = <Denied />;
      break;
    default:
      break;
  }

  return <SafeAreaView>{stepContent}</SafeAreaView>;
}

export default Form;
