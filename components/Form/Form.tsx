import React, { useContext } from "react";
import { FormContext } from "../../App";
import { SafeAreaView } from "react-native";
import Stepper from "../Stepper";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import Denied from "./Denied";
import Success from "./Success";

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
    case 69:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView>
      <Stepper />
      {stepContent}
    </SafeAreaView>
  );
}

export default Form;
