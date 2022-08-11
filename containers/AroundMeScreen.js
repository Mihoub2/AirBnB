import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

export default function AroundMeScreen() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const [coords, setCoords] = useState([
    // {
    //   latitude: latitude,
    //   longitude: longitude,
    // },
  ]);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();

          //   const response = await axios.get(
          //     `https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${coords.longitude}&latitude=${coords.latitude}`
          //   );
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?`
          );
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          console.log(latitude);
          console.log(longitude);
        } else {
          alert("Permission refusée");
          setError(true);
        }
        setIsLoading(false);
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
        >
          {/* {coords.map((elem, index) => {
            console.log(elem);
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: elem.latitude,
                  longitude: elem.longitude,
                }}
              />
            );
          })} */}
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
