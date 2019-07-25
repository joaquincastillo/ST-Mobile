import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Signature from "react-native-signature-canvas";
import {
  GiftedChat,
  GiftedChatProps,
  GiftedAvatar
} from "react-native-gifted-chat";

class SignatureScreen extends React.Component {
  static navigationOptions = {
    title: "Firma digital"
  };
  constructor(props) {
    super(props);
    const { order_id } = this.props;
    this.state = { signature: null, order_id: order_id, coordinates: null };

    this.handleSignature = this.handleSignature.bind(this);
    this.cleanSignature = this.cleanSignature.bind(this);
    this.onSendSignature = this.onSendSignature.bind(this);
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  handleSignature = signature => {
    this.setState({ signature });

    this.finishSignature();
  };

  cleanSignature() {
    console.log(this.state.signature);
    this.setState({ signature: null });
  }

  finishSignature() {
    Alert.alert(
      "¿Enviar firma digital?",
      "",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed")
        },
        {
          text: "Enviar",
          onPress: () => this.onSendSignature()
        }
      ],
      { cancelable: false }
    );
  }

  onSendSignature() {
    const { createSignature, navigation } = this.props;
    const order_id = navigation.getParam("order_id");
    const { signature } = this.state;
    console.log(`[SIGNATURE] order_id ${order_id}`);
    this.getPosition();
    const { coordinates } = this.state;

    console.log(`the state: ${Object.getOwnPropertyNames(this.state)}`);
    console.log(this.state.order_id);
    console.log(this.state.signature);
    console.log(this.state.coordinates);

    createSignature(
      order_id,
      signature,
      this.state.coordinates.latitude,
      this.state.coordinates.longitude
    )
      .then(({ data }) => {
        console.log(data);
        if (data.createSignature) {
          console.log(data.createSignature);
          navigation.navigate("Orders");
        } else {
          console.log("error clave");
        }
      })
      .catch(e => {
        console.log(e);
        console.log("xxx");
      });
    console.log("Firma envia3");
  }

  getPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  success(pos) {
    const coords = pos.coords;
    console.log("Your current position is:");
    console.log("Latitude : " + coords.latitude);
    console.log("Longitude: " + coords.longitude);
    console.log("More or less " + coords.accuracy + " meters.");

    const crd = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy
    };

    this.setState({ coordinates: crd }, () =>
      console.log("[SIGNATURE] position defined")
    );
    console.log("the coordinates yo bitches: ");
    console.log(this.state.coordinates);
  }

  error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
    crd = {
      latitude: "unknown",
      longitude: "unknown",
      accuracy: "undefined"
    };
    this.setState({ coordinates: crd }, () =>
      console.log("[SIGNATURE] position cannot be defined")
    );
  }

  componentDidMount() {
    this.getPosition();
    console.log(`COORDINATES DEFINED: ${this.state.coordinates}`);
  }

  render() {
    const style = `.m-signature-pad--footer
    .button {
      background-color: #259;
      color: #FFF;
    }`;

    return (
      <View style={{ flex: 1 }}>
        {this.state.signature ? (
          <View style={styles.preview}>
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 400 }}
              source={{ uri: this.state.signature }}
            />
          </View>
        ) : null}
        {!this.state.signature ? (
          <Signature
            onOK={this.handleSignature}
            onEmpty={this.cleanSignature}
            descriptionText="Firma digital"
            clearText="Borrar"
            confirmText="Guardar"
            webStyle={style}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: "95%",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

export default graphql(
  gql`
    mutation CreateSignature(
      $ticketId: ID!
      $signature: String!
      $lat: Float
      $lon: Float
    ) {
      createSignature(
        ticketId: $ticketId
        signature: $signature
        lat: $lat
        lon: $lon
      ) {
        ticketId
        signature
        lat
        lon
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createSignature: (ticketId, signature) =>
        mutate({ variables: { ticketId, signature } })
    })
  }
)(SignatureScreen);
