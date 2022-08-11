import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RoomScreen from "./containers/RoomScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import { StyleSheet, Text, View, Image } from "react-native";
import ArrowBack from "./components/ArrowBack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" options={{ headerShown: false }}>
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                  }}
                >
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            headerShown: false,
                            headerBackground: () => (
                              <Image
                                style={{
                                  marginLeft: 80,
                                  marginTop: 20,
                                  // marginBottom: 30,
                                  width: 200,
                                  height: 50,
                                }}
                                source={require("./assets/logo.png")}
                                resizeMode="contain"
                              />
                            ),
                          }}
                        >
                          {(props) => <HomeScreen {...props} />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="Room"
                          options={{
                            headerLeft: () => <ArrowBack />,

                            headerShown: false,
                            headerBackground: () => (
                              <Image
                                style={{
                                  marginLeft: 80,
                                  marginTop: 20,
                                  width: 200,
                                  height: 50,
                                }}
                                source={require("./assets/logo.png")}
                                resizeMode="contain"
                              />
                            ),
                          }}
                        >
                          {(props) => <RoomScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="AroundMe"
                    options={{
                      tabBarLabel: "AroundMe",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="red"
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="AroundMe"
                          options={{
                            title: "Aroundme",
                          }}
                        >
                          {() => <AroundMeScreen setToken={setToken} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabSettings"
                    options={{
                      tabBarLabel: "Settings",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"ios-options"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Settings"
                          options={{
                            title: "Settings",
                          }}
                        >
                          {() => <SettingsScreen setToken={setToken} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
