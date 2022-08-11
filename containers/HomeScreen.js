import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
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

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<AntDesign name="star" size={26} color="gold" />);
      } else {
        tab.push(<AntDesign name="star" size={26} color="grey" />);
      }
    }
    return tab;
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      {isLoading === true ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(elem, index) => {
            return index;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.viewImage}
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <View>
                  <Image
                    style={styles.offerImage}
                    source={{
                      uri: item.photos[0].url,
                    }}
                  />
                  <View style={styles.botOffer}>
                    <View style={styles.viewTitleAndRate}>
                      <Text
                        style={styles.offerTitle}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                      >
                        {item.title}
                      </Text>
                      <View style={styles.rateAndReviews}>
                        <Text>{displayStars(item.ratingValue)}</Text>
                        <Text style={styles.reviews}>
                          {item.reviews} reviews
                        </Text>
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
              </TouchableOpacity>
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
    borderRadius: 50,
    marginTop: 10,
  },
  viewTitleAndRate: {
    justifyContent: "space-around",
    marginTop: 10,
    width: "70%",
  },
  viewImage: {
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    flex: "1",
    backgroundColor: "white",
  },
  offerTitle: { fontSize: 16 },
  offerImage: {
    height: 160,
    alignItems: "center",
    position: "relative",
    marginTop: 10,
  },
  viewPrice: {
    marginTop: 110,
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
