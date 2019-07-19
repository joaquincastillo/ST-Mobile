import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Query } from "react-apollo";
import { ListItem, Divider } from "react-native-elements";
import { Ionicons as Icon } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import ChatButton from "../chatbot/chatButton";
import LoadingScreen from "../commons/LoadingScreen";
import ErrorScreen from "../commons/ErrorScreen";

const { styles } = require("./styles");
import MY_TICKETS_QUERY from "./MY_TICKETS_QUERY";

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: "Mis Ordenes de Trabajo"
  };

  constructor(props) {
    super(props);
    this.state = {
      colllapsedOnGoing: false,
      collapsedPending: false,
      collapsedFinished: false
    };
  }

  toggleExpandedUnfinished = () => {
    const { colllapsedOnGoing } = this.state;
    this.setState({ colllapsedOnGoing: !colllapsedOnGoing });
  };

  toggleExpandedPending = () => {
    const { collapsedPending } = this.state;
    this.setState({ collapsedPending: !collapsedPending });
  };

  toggleExpandedFinished = () => {
    const { collapsedFinished } = this.state;
    this.setState({ collapsedFinished: !collapsedFinished });
  };

  sortOrdersByState(data) {
    // created, assigned y closed. No se obtienen tickets creados, ya que no están asignados.
    const assigned = [];
    const closed = [];
    if (data.userAssignations) {
      console.log("userAssignations");
      console.log(data.userAssignations);
      data.userAssignations.edges.forEach(function(ticket) {
        if (
          ticket.ticket.state.state == "assigned" ||
          ticket.ticket.state.state == "created"
        ) {
          assigned.push(ticket);
        } else if (ticket.ticket.state.state == "closed") {
          closed.push(ticket);
        }
      });
    } else {
      console.log(data);
      console.log("wekree");
    }
    const ret = { assigned: assigned, closed: closed };
    console.log(ret);
    return ret;
  }

  render() {
    const {
      colllapsedOnGoing,
      //collapsedPending,
      collapsedFinished
    } = this.state;
    const { navigation } = this.props;
    const userId = 2;
    return (
      <Query query={MY_TICKETS_QUERY} variables={{ userId }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <LoadingScreen />;
          }
          if (error) {
            return <ErrorScreen refetch={refetch} navigation={navigation} />;
          } else {
            console.log(data.userAssignations);
            orders_dict = this.sortOrdersByState(data);
            return (
              <View style={{ margin: 10, padding: 5 }}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={this.toggleExpandedUnfinished}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: colllapsedOnGoing ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {"Tickets en curso"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={colllapsedOnGoing} align="top">
                    {orders_dict["assigned"].length === 0 ? (
                      <View>
                        <Text>No tienes tickets asignados abiertos</Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["assigned"].map(ticket => (
                        <ListItem
                          key={ticket.ticket.id}
                          title={`Orden de trabajo en ${
                            ticket.ticket.client.name
                          }`}
                          titleStyle={styles.listItemTitle}
                          subtitle={
                            <View style={{ flexDirection: "row" }}>
                              <Text>ID: {ticket.ticket.id}</Text>
                            </View>
                          }
                          subtitleStyle={styles.listItemSubtitle}
                          onPress={() =>
                            this.props.navigation.navigate("Order", {
                              order_id: ticket.ticket.id
                            })
                          }
                          containerStyle={styles.listItemContainer}
                        />
                      ))}
                    </ScrollView>
                    <View style={styles.dividerView}>
                      <Divider />
                    </View>
                  </Collapsible>
                </View>
                <View />
                <View>
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={this.toggleExpandedFinished}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedFinished ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {"Tickets cerrados"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedFinished} align="top">
                    {orders_dict["closed"].length === 0 ? (
                      <View>
                        <Text>No tienes tickets cerrados</Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["closed"].map(ticket => (
                        <ListItem
                          key={ticket.id}
                          title={`Orden de trabajo en ${
                            ticket.ticket.client.name
                          }`}
                          titleStyle={styles.listItemTitle}
                          subtitle={
                            <View style={{ flexDirection: "row" }}>
                              <Text>ID: {ticket.id}</Text>
                            </View>
                          }
                          subtitleStyle={styles.listItemSubtitle}
                          onPress={() =>
                            this.props.navigation.navigate("Order", {
                              order_id: ticket.ticket.id
                            })
                          }
                          containerStyle={styles.listItemContainer}
                        />
                      ))}
                    </ScrollView>
                    <View style={styles.dividerView}>
                      <Divider />
                    </View>
                  </Collapsible>
                </View>
                <View>
                  <ChatButton navigation={navigation} />
                </View>
              </View>
            );
          }
        }}
      </Query>
    );
  }
}
