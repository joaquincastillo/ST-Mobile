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

class SignatureButton extends React.Component {
  constructor(props) {
    super(props);
    this.openSignature = this.openSignature.bind(this);
  }

  openSignature() {
    const { navigation, order_id } = this.props;
    navigation.navigate("Signature", { order_id: order_id });
  }

  render() {
    return (
      <View style={{ height: 50, margin: 15 }}>
        <TouchableOpacity
          style={styles.hugeButton}
          activeOpacity={0.2}
          onPress={() => this.openSignature()}
        >
          <View>
            <Text style={{ color: mainColor, fontWeight: "bold" }}>
              {"Solicitar firma"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignatureButton;
