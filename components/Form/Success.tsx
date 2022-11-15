import React, { useContext, useEffect, useCallback } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { FormContext } from "../../App";
import { createUser } from "../../db/database-helpers";

const Success = () => {
  // @ts-ignore
  const { formData } = useContext(FormContext);
  const { name, number } = formData;

  const sendUserInfoToDB = useCallback(async () => {
    try {
      if (Object.keys(formData).length) {
        const newUser: {} = (await createUser(name, number)) as {};
        console.log(newUser);
      }
    } catch (error) {
      console.error(error);
    }
  }, [name, number]);

  useEffect(() => {
    sendUserInfoToDB();
  }, []);

  return (
    <View style={styles.container}>
      <PaperText variant="bodyLarge" style={styles.text}>
        <>
          Thanks! I'll send you a message once I've got some reception and we
          can go from there. Take it easy!
        </>
      </PaperText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: Dimensions.get("window").width - 50
  },
  container: {
    alignItems: "center",
    marginTop: 20
  },
  buttonFlex: {
    width: Dimensions.get("window").width - 50,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default Success;