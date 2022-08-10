import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
// import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitForm = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage("password are not the same");
        alert("password are not the same");
      }
      if (!password && !email && !username && !confirmPassword) {
        setErrorMessage("Please fill");

        alert("missing something!");
      }
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      console.log(response.data);

      alert("Account created");
      const userToken = "user-token";
      setToken(userToken);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.error);
      }
      if (error.response.status === 406) {
        setErrorMessage("Bro, something's missing...!");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.topText}>Sign Up</Text>
        </View>
        <View>
          <TextInput
            placeholder="email"
            value={email}
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="username"
            value={username}
            style={styles.input}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            placeholder="Describe yourself in some fiew words"
            multiline={true}
            numberOfLines={4}
            style={styles.inputDescription}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="confirmPassword"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            secureTextEntry={true}
          />
          <Text style={styles.error}>{errorMessage}</Text>
          <View style={styles.botSignIn}>
            <TouchableOpacity onPress={onSubmitForm} style={styles.signButton}>
              <Text style={styles.botButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              style={styles.botTextSignin}
            >
              <Text style={styles.botText}>
                Already have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  topText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  botTextSignin: {
    marginTop: 20,
  },
  botSignIn: {
    justifyContent: "center",
    alignItems: "center",
  },
  signButton: {
    justifyContent: "center",
    borderColor: "##F9585D",
    borderWidth: 2,
    width: 130,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  botText: {
    fontSize: 10,
    textAlign: "center",
  },
  botButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
  },
  inputDescription: {
    padding: 10,
    height: 80,
    width: 300,
    marginBottom: 50,
    marginTop: 20,
    borderColor: "#FFBAC0",
    borderWidth: 1,
  },
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
});
