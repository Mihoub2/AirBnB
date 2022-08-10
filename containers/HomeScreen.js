import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { ImageBackground, TouchableOpacity } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({}) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View>
      {isLoading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(elem, index) => {
            return index;
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewImage}>
                <Image
                  style={styles.offerImage}
                  source={{
                    uri: item.photos[0].url,
                  }}
                />
                <View style={styles.botOffer}>
                  <View style={styles.viewTitleAndRate}>
                    <Text
                      onPress={() => {
                        navigation.navigate("Room");
                      }}
                      style={styles.offerTitle}
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.rateAndReviews}>
                      <Text>
                        <AntDesign name="star" size={26} color="gold" />*
                        {item.ratingValue}
                      </Text>
                      <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={styles.userImage}
                      source={{
                        uri: item.user.account.photo.url,
                      }}
                    />
                  </View>
                </View>

                <View style={styles.viewPrice}>
                  <Text style={styles.price}>{item.price}€</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  viewTitleAndRate: {
    justifyContent: "space-around",

    width: "70%",
  },
  viewImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  offerTitle: { fontSize: 16 },
  offerImage: {
    height: 160,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    position: "relative",
  },
  viewPrice: {
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
