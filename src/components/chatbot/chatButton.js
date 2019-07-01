import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { ListItem, Divider } from "react-native-elements";
import { Ionicons as Icon } from "@expo/vector-icons";

const {
  styles,
  strongColor,
  mainColor,
  placeholderTextColor,
  errorColor,
  imageHeight,
  imageHeightSmall
} = require("./styles");

class chatButton extends React.Component {
  constructor(props) {
    super(props);
    this.openChat = this.openChat.bind(this);
  }

  openChat() {
    console.log("yajuu0");
    const { navigation } = this.props;
    navigation.navigate("Chat");
    console.log("yajuuuu");
  }

  render() {
    return (
      <View style={{ height: 50, margin: 15 }}>
        <TouchableOpacity
          style={styles.hugeButton}
          activeOpacity={0.2}
          onPress={() => this.openChat()}
        >
          <View>
            <Text style={{ color: mainColor, fontWeight: "bold" }}>
              {"Chat de Ayuda"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default chatButton;
