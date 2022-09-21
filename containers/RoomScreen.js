import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapView from "react-native-maps";

export default function RoomScreen({ route }) {
  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        console.log(response.data.location[1]);
        setIsLoading(false);
      } catch (error) {
        console.log(error, "ligne 20");
      }
    };
    fetchData();
  }, []);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<AntDesign key={i} name="star" size={26} color="gold" />);
      } else {
        tab.push(<AntDesign key={i} name="star" size={26} color="grey" />);
      }
    }
    return tab;
  };
  return isLoading === true ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <Image
        style={styles.offerImage}
        source={{
          uri: data.photos[0].url,
        }}
      />
      <View style={styles.botOffer}>
        <View style={styles.viewTitleAndRate}>
          <Text
            style={styles.offerTitle}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {data.title}
          </Text>
          <View style={styles.rateAndReviews}>
            <Text>{displayStars(data.ratingValue)}</Text>

            <Text style={styles.reviews}>{data.reviews} reviews</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.userImage}
            source={{
              uri: data.user.account.photo.url,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowText(!showText);
        }}
      >
        <Text
          style={styles.offerDescription}
          numberOfLines={showText ? null : 3}
          ellipsizeMode={"tail"}
        >
          {data.description}
        </Text>
      </TouchableOpacity>
      <View style={styles.viewPrice}>
        <Text style={styles.price}>{data.price}€</Text>
      </View>
      <MapView
        style={{ width: "100%", height: 300 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  offerDescription: {
    fontSize: 14,
    marginTop: 10,
  },
  reviews: {
    color: "#BBBBBB",
    fontSize: 12,
  },
  rateAndReviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  botOffer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
  },
  viewTitleAndRate: {
    justifyContent: "space-around",
    marginTop: 10,
    width: "70%",
  },
  viewImage: {
    width: "100%",
  },
  offerTitle: { fontSize: 16 },
  offerImage: {
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    position: "relative",
  },
  viewPrice: {
    marginTop: 190,
    position: "absolute",
    borderColor: "black",
    backgroundColor: "black",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
});
