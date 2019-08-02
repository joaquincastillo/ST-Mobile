import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Query } from "react-apollo";
import ChatComponent from "./chatComponent";
import LoadingScreen from "../commons/LoadingScreen";
import ErrorScreen from "../commons/ErrorScreen";

import MSG_QUERY from "./MSG_QUERY";

const supportAvatar = require("../../assets/images/support.png");

export default class ChatQueryScreen extends React.Component {
  static navigationOptions = {
    title: "Chatbot"
  };

  constructor(props) {
    super(props);
    state = {
      messages: []
    };
    this.formatMessages = this.formatMessages.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
  }

  formatMessages(messages) {
    const { navigation } = this.props;
    const me = navigation.getParam("me");
    console.log(`____ME_______: ${me}`);
    const msg_list = [];
    const usernames = {};
    messages.forEach(function(message) {
      let user_id = 1;
      let username = me;
      if (message.user.username != me) {
        user_id = 2;
        username = message.username;
        usernames[username] = true;
      }

      const msg = {
        _id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: user_id,
          name: message.username,
          avatar: supportAvatar
        }
      };
      msg_list.push(msg);
    });
    return msg_list;
  }

  shouldUpdate() {
    this.setState({ update: true });
  }

  render() {
    const { navigation } = this.props;
    const chatId = navigation.getParam("chatId");
    console.log(`CHAT_ID: ${chatId}`);
    return (
      <View style={{ flex: 1 }}>
        <Query query={MSG_QUERY} variables={{ chatId }} pollInterval={2000}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return <LoadingScreen />;
            }
            if (error) {
              return <ErrorScreen refetch={refetch} navigation={navigation} />;
            }
            const messages = this.formatMessages(data.messages.edges);
            return (
              <ChatComponent
                style={{ flex: 1 }}
                messages={messages}
                chatId={chatId}
                refetch={refetch}
              />
            );
          }}
        </Query>
        <KeyboardSpacer />
      </View>
    );
  }
}
