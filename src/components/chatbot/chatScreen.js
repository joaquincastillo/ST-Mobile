import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  GiftedChat,
  GiftedChatProps,
  GiftedAvatar
} from "react-native-gifted-chat";
import { Query } from "react-apollo";
import LoadingScreen from "../commons/LoadingScreen";
import ErrorScreen from "../commons/ErrorScreen";

import MSG_QUERY from "./MSG_QUERY";

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Chatbot"
  };

  constructor(props) {
    super(props);
    state = {
      messages: []
    };
    this.format_messages = this.format_messages.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  format_messages(messages) {
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
          avatar: "https://placeimg.com/140/140/any"
        }
      };
      msg_list.push(msg);
    });
    return msg_list;
  }

  render() {
    const { navigation } = this.props;
    const chatId = navigation.getParam("chatId");
    console.log(`CHAT_ID: ${chatId}`);
    console.log(`chatID: ${chatId}`);
    return (
      <Query query={MSG_QUERY} variables={{ chatId }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <LoadingScreen />;
          }
          if (error) {
            return <ErrorScreen refetch={refetch} navigation={navigation} />;
          } else {
            const chat_msgs = this.format_messages(data.messages.edges);
            return (
              <GiftedChat
                messages={chat_msgs}
                onSend={messages => this.onSend(messages)}
                user={{
                  _id: 1
                }}
              />
            );
          }
        }}
      </Query>
    );
  }
}

export default ChatScreen;
