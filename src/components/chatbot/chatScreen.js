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
    const msg_list = [];
    messages.forEach(function(message) {
      const msg = {
        _id: 2,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: 1,
          name: "Usuario",
          avatar: "https://placeimg.com/140/140/any"
        }
      };
      msg_list.push(msg);
    });
    return msg_list;
  }

  render() {
    const { navigation, chatId2 } = this.props;
    console.log(chatId2);
    const chatId = 1; /* FIXME: debe recibirse en props */
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
