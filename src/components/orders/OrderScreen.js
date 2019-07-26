import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { ListItem, Divider } from "react-native-elements";
import ChatButton from "../chatbot/chatButton";
import SignatureButton from "../signature/signatureButton";
import { Query } from "react-apollo";
import LoadingScreen from "../commons/LoadingScreen";
import ErrorScreen from "../commons/ErrorScreen";
import Icon from "react-native-vector-icons/Entypo";
import TICKET_QUERY from "./TICKET_QUERY";
import Communications from "react-native-communications";
import openMap from "react-native-open-maps";
const { styles } = require("./styles");

class OrderScreen extends React.Component {
  static navigationOptions = {
    title: "Ticket de trabajo",
    headerRight: (
      <View style={{ margin: 10 }}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "¿Cerrar sesión?",
              "",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancel Pressed")
                },
                {
                  text: "Cerrar sesión",
                  onPress: function logout() {
                    navigation.getScreenProps().changeLoginState();
                    navigation.navigate("Auth");
                  }
                }
              ],
              { cancelable: false }
            )
          }
        >
          <Text>
            <Icon name="log-out" size={35} color="red" />
          </Text>
        </TouchableOpacity>
      </View>
    )
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
                      <Text style={styles.itemText}>
                        <Icon name="user" size={30} color="#249" />
                        {" Nombre Cliente:"}
                      </Text>
                      <Text style={styles.itemTextValue}>{` ${
                        data.ticket.client.name
                      }`}</Text>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="phone" size={30} color="#249" />
                        {" Teléfono:"}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          Communications.phonecall(
                            data.ticket.client.phone,
                            true
                          )
                        }
                      >
                        <Text style={styles.itemTextValue}>{` ${
                          data.ticket.client.phone
                        }`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="location-pin" size={30} color="#249" />
                        {" Dirección:"}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          openMap({
                            query: data.ticket.client.address,
                            end: data.ticket.client.address
                          })
                        }
                      >
                        <Text style={styles.itemTextValue}>{` ${
                          data.ticket.client.address
                        }`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="bell" size={30} color="#249" />
                        {" Prioridad:"}
                      </Text>
                      <Text style={styles.itemTextValue}>{` ${
                        data.ticket.priority
                      }`}</Text>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="ticket" size={30} color="#249" />
                        {" Estado del ticket:"}
                      </Text>
                      <Text style={styles.itemTextValue}>{` ${
                        data.ticket.state.state
                      }`}</Text>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="v-card" size={30} color="#249" />
                        {" Dueño de ticket:"}
                      </Text>
                      <Text style={styles.itemTextValue}>{` ${
                        data.ticket.owner.username
                      }`}</Text>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 8, backgroundColor: "white" }}
                      />
                    </View>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>
                        <Icon name="landline" size={30} color="#249" />
                        {" Teléfono dueño de ticket:"}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          Communications.phonecall(
                            data.ticket.owner.phone,
                            true
                          )
                        }
                      >
                        <Text style={styles.itemTextValue}>{` ${
                          data.ticket.owner.phone
                        }`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.dividerView}>
                      <Divider
                        style={{ height: 16, backgroundColor: "white" }}
                      />
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
