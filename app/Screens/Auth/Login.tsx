import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { AuthRoutes } from "../../Navigation";
import { StackNavigationProps } from "../../Navigation/types/types";
import {
  Button,
  Container,
  FormInput,
  NetowrkAware,
  Text,
} from "../../../components";
import colors from "../../../constants/Colors";
import { AuthUserContext } from "../../Contexts";
import { useLoginMutation } from "../../../services/auth";
import { useAppDispatch } from "../../../store/hooks";
import { handleMutationService } from "../../../services/config/handleService";
import { setUser } from "../../../store/features/authSlice";

const Login = ({ navigation }: StackNavigationProps<AuthRoutes, "Login">) => {
  const [completeLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const handleLogin = () => {
    handleMutationService({
      mutation: completeLogin({
        // Assuming the input value is either an email or phone number
        phone: input,
      }),
      onSuccess(data) {
        dispatch(setUser(data));
        console.log("~login Data", data);
        // Handle success, e.g., navigation or updating state
      },
    });
  };
  return (
    <>
      <NetowrkAware heightInsets />
      <Container>
        <View style={styles.container}>
          <Text fontSize={24} fontWeight="600">
            Login
          </Text>
          <Text
            style={{ marginTop: 10 }}
            color={colors.primaryTextColor}
            fontSize={12}
            fontWeight="400"
          >
            Sign in with your Phone number or email
          </Text>
          <View style={styles.form}>
            <FormInput
              value={input}
              onChangeText={(text) => setInput(text)}
              placeholder="Enter Phone Number"
              label="Phone Number"
            />
            <Button
              disabled={input == ""}
              onPress={handleLogin}
              style={styles.btn}
              text="Login"
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Text fontSize={12} fontWeight="700">
                You don't have an account?
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Signup");
                }}
                fontSize={12}
                style={{ color: colors.primaryBlue, marginLeft: 4 }}
              >
                SignUp
              </Text>
            </View>
          </View>
        </View>
      </Container>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 47,
  },
  form: {
    marginTop: "30%",
  },
  btn: {
    borderRadius: 20,
    marginTop: "5%",
  },
});
