import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Platform
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

import {
  GiftedChat,
  GiftedChatProps,
  GiftedAvatar
} from "react-native-gifted-chat";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import MSG_QUERY from "./MSG_QUERY";

const { styles } = require("./styles");

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("LOH MSJEEEEEEH: ");
    console.log(this.props.messages);
    state = {
      messages: this.props.messages,
      coordinates: {
        longitude: null,
        latitude: null,
        accuracy: null
      }
    };

    this.error = this.error.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.success = this.success.bind(this);
    //this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: this.props.messages
      //[
      // {
      //   _id: 1,
      //   text: "Hello developer",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any"
      //   }
      // }
      //]
    });
  }

  componentDidMount() {
    //this.getPosition();
  }

  componentWillReceiveProps(props) {
    this.setState({ messages: props.messages });
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
      console.log("[CHAT] position defined")
    );
    console.log("the coordinates yo bitches: ");
    console.log(this.state.coordinates);
  }

  error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
    crd = {
      latitude: null,
      longitude: null,
      accuracy: null
    };
    this.setState({ coordinates: crd }, () =>
      console.log("[CHAT] position cannot be defined")
    );
  }

  onSendOld(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  getPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  onSend(messages = []) {
    const { createMessage, chatId } = this.props;
    console.log(`chatID:::::: ${chatId}`);
    const { navigation } = this.props;
    const position = this.getPosition();

    const message = messages[messages.length - 1].text;

    createMessage(message, chatId, this.state.latitude, this.state.longitude)
      .then(({ data }) => {
        console.log(data);
        if (data.createMessage) {
          console.log(data.createMessage);
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
          }));
        } else {
          messages[messages.length - 1].text =
            "Este mensaje no ha podido ser enviado.";
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
          }));
          console.log("error clave");
        }
      })
      .catch(e => {
        console.log(e);
      });
    console.log("Mensaje envia3");
  }

  render() {
    console.log("GiftedChat has been already rendered.");
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    );
  }
}

export default graphql(
  gql`
    mutation createMessage(
      $text: String!
      $chatId: ID!
      $lat: Float
      $lon: Float
    ) {
      createMessage(text: $text, chatId: $chatId, lat: $lat, lon: $lon) {
        id
        createdAt
        user {
          username
        }
        text
        lat
        lon
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createMessage: (text, chatId, lat, lon) =>
        mutate({
          variables: { text, chatId, lat, lon },
          refetchQueries: [
            {
              query: MSG_QUERY,
              variables: { chatId: chatId }
            }
          ]
        })
    })
  }
)(ChatComponent);
