import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        style={{
          marginLeft: 80,
          marginTop: 20,
          width: 200,
          height: 50,
        }}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;
