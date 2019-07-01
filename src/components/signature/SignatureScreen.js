import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Signature from "react-native-signature-canvas";

export default class SignatureScreen extends React.Component {
  static navigationOptions = {
    title: "Firma digital"
  };
  constructor(props) {
    super(props);
    this.state = { signature: null };

    this.handleSignature = this.handleSignature.bind(this);
    this.cleanSignature = this.cleanSignature.bind(this);
  }

  handleSignature = signature => {
    this.setState({ signature });
  };

  cleanSignature() {
    this.setState({ signature: null });
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
