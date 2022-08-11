import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function AroundMeScreen() {
  const navigation = useNavigation();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?=latitude${location.coords.latitude}&=longitude${location.coords.longitude}`
          );

          setLatitude(response.data[0].location[1]);
          setLongitude(response.data[0].location[0]);

          setCoords(response.data);
          // console.log(response.data);
          setIsLoading(false);
        } else {
          alert("Permission refusée");
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>En chargement</Text>
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <MapView
          showsUserLocation={true}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
        >
          {coords.map((elem, index) => {
            return (
              <MapView.Marker
                onPress={() => {
                  navigation.navigate("Room", { id: elem._id });
                  // console.log(elem._id);
                }}
                tappable={true}
                key={index}
                coordinate={{
                  latitude: elem.location[1],
                  longitude: elem.location[0],
                }}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    // width: 100,
    // height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    height: 500,
    width: "100%",
  },
});
