import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import ChatButton from "../chatbot/chatButton";
import SignatureButton from "../signature/signatureButton";
const { styles } = require("./styles");

class OrderScreen extends React.Component {
  static navigationOptions = {
    title: "Orden de Trabajo"
  };

  constructor(props) {
    super(props);
    this.state = { signature: null };
    this.saveSignature = this.saveSignature.bind(this);
  }

  saveSignature(signature) {
    console.log("saveSignature [ORDERSCREEN]");
    this.setState({ signature });
  }

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name");
    const client = navigation.getParam("client");
    const status = navigation.getParam("status");

    return (
      <View style={{ margin: 10, padding: 5 }}>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={[styles.header, { borderBottomWidth: 1 }]}>
            <Text style={styles.headerText}>Orden: {name}</Text>
          </View>
        </TouchableOpacity>

        <View>
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Cliente:</Text>
              <Text>{` ${client}`}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Usuario:</Text>
              <Text>{"Gonzalo Perez"}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>SLA:</Text>
              <Text>{` ${"3 horas"}`}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Dirección</Text>
              <Text>{` ${"MacIver 152, Santiago, Chile"}`}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Contacto:</Text>
              <Text>{"+56979457779"}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Status:</Text>
              <Text>{status}</Text>
            </View>
          </View>
        </View>
        <View>
          <ChatButton navigation={navigation} />
        </View>
        <View>
          <SignatureButton
            navigation={navigation}
            onSignature={this.saveSignature}
          />
        </View>
      </View>
    );
  }
}

export default OrderScreen;
