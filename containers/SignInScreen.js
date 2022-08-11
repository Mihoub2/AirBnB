import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function SignInScreen({ setToken }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const navigation = useNavigation();
  const [email, setEmail] = useState("debache.mihoub@gmail.com");
  const [password, setPassword] = useState("azerty");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onPressForm = async () => {
    try {
      setErrorMessage("");
      if (!email) {
        setErrorMessage("Please fill");
        alert("missing mail!");
      }
      if (!password) {
        setErrorMessage("Please fill");

        alert("missing password!");
      }
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      setIsLoading(true);
      setToken(response.data.token);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <ScrollView style={styles.total}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.topText}>Sign in</Text>
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
            <View>
              <TextInput
                style={styles.inputPassword}
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={passwordVisible ? true : false}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Ionicons name="eye-sharp" size={24} color="black" />
                ) : (
                  <AntDesign name="eyeo" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.error}>{errorMessage}</Text>
            <View style={styles.botSignIn}>
              {isLoading === false ? (
                <View>
                  <TouchableOpacity
                    onPress={onPressForm}
                    style={styles.signButton}
                  >
                    <Text style={styles.botButtonText}>Sign in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                    style={styles.botTextSignin}
                  >
                    <Text style={styles.botText}>No account ? Register</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  total: {
    backgroundColor: "white",
  },
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
    marginBottom: 50,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
  },
  inputPassword: {
    height: 40,
    width: 300,
    marginBottom: 50,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 1,
    position: "relative",
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
  icon: {
    position: "absolute",

    marginLeft: 270,
    marginTop: 10,
  },
});
