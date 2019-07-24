import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import ChatButton from "../chatbot/chatButton";
import SignatureButton from "../signature/signatureButton";
import { Query } from "react-apollo";
import LoadingScreen from "../commons/LoadingScreen";
import ErrorScreen from "../commons/ErrorScreen";
import TICKET_QUERY from "./TICKET_QUERY";
const { styles } = require("./styles");

class OrderScreen extends React.Component {
  static navigationOptions = {
    title: "Ticket de trabajo"
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
    const id = navigation.getParam("order_id");

    return (
      <Query query={TICKET_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <LoadingScreen />;
          }
          if (error) {
            return <ErrorScreen refetch={refetch} navigation={navigation} />;
          } else {
            return (
              <View style={{ margin: 10, padding: 5 }}>
                <TouchableOpacity activeOpacity={0.9}>
                  <View style={[styles.header, { borderBottomWidth: 1 }]}>
                    <Text style={styles.headerText}>
                      ID Orden: #{data.ticket.id}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View>
                  <View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Nombre Cliente:</Text>
                      <Text>{` ${data.ticket.client.name}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Teléfono:</Text>
                      <Text>{` ${data.ticket.client.phone}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Dirección:</Text>
                      <Text>{` ${data.ticket.client.address}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Prioridad:</Text>
                      <Text>{` ${data.ticket.priority}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Estado del ticket:</Text>
                      <Text>{` ${data.ticket.state.state}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>Dueño de ticket:</Text>
                      <Text>{` ${data.ticket.owner.username}`}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        Teléfono dueño de ticket:
                      </Text>
                      <Text>{` ${data.ticket.owner.phone}`}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <ChatButton
                    navigation={navigation}
                    chatId={data.ticket.chat.id}
                    me={"joaquin"}
                  />
                </View>
                <View>
                  <SignatureButton
                    navigation={navigation}
                    order_id={data.ticket.id}
                  />
                </View>
              </View>
            );
          }
        }}
      </Query>
    );
  }
}

export default OrderScreen;
