import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Query } from "react-apollo";
import { ListItem, Divider } from "react-native-elements";
//import { Ionicons as Icon } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import ChatButton from "../chatbot/chatButton";
import Icon from "react-native-vector-icons/Entypo";

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
      collapsedAssigned: false,
      collapsedScheduled: false,
      collapsedInProgress: false,
      collapsedFinished: true,
      collapsedClosed: true
    };
  }

  toggleExpanded = numberOfState => {
    /* {0: assigned, 1: scheduled, 2: in_progress, 3: finished, 4: closed} */
    const {
      collapsedAssigned,
      collapsedScheduled,
      collapsedInProgress,
      collapsedFinished,
      collapsedClosed
    } = this.state;

    if (numberOfState === 0) {
      this.setState({
        collapsedAssigned: !collapsedAssigned,
        collapsedScheduled: true,
        collapsedInProgress: true,
        collapsedFinished: true,
        collapsedClosed: true
      });
    } else if (numberOfState === 1) {
      this.setState({
        collapsedAssigned: true,
        collapsedScheduled: !collapsedScheduled,
        collapsedInProgress: true,
        collapsedFinished: true,
        collapsedClosed: true
      });
    } else if (numberOfState === 2) {
      this.setState({
        collapsedAssigned: true,
        collapsedScheduled: true,
        collapsedInProgress: !collapsedInProgress,
        collapsedFinished: true,
        collapsedClosed: true
      });
    } else if (numberOfState === 3) {
      this.setState({
        collapsedAssigned: true,
        collapsedScheduled: true,
        collapsedInProgress: true,
        collapsedFinished: !collapsedFinished,
        collapsedClosed: true
      });
    } else if (numberOfState === 4) {
      this.setState({
        collapsedAssigned: true,
        collapsedScheduled: true,
        collapsedInProgress: true,
        collapsedFinished: true,
        collapsedClosed: !collapsedClosed
      });
    }
  };

  toggleExpandedScheduled = () => {
    const { collapsedFinished } = this.state;
    this.setState({ collapsedFini: !collapsedFinished });
  };

  toggleExpandedScheduled = () => {
    const { collapsedScheduled } = this.state;
    this.setState({ collapsedScheduled: !collapsedScheduled });
  };

  toggleExpandedFinished = () => {
    const { collapsedFinished } = this.state;
    this.setState({ collapsedFinished: !collapsedFinished });
  };

  sortOrdersByState(data) {
    // created, assigned y closed. No se obtienen tickets creados, ya que no están asignados.
    const assigned = [];
    const closed = [];
    const scheduled = [];
    const in_progress = [];
    const finished = [];
    if (data.userAssignations) {
      console.log("userAssignations");
      console.log(data.userAssignations);
      data.userAssignations.edges.forEach(function(ticket) {
        if (
          ticket.ticket.state.state == "asignado" ||
          ticket.ticket.state.state == "creado"
        ) {
          assigned.push(ticket);
        } else if (ticket.ticket.state.state == "coordinado") {
          scheduled.push(ticket);
        } else if (ticket.ticket.state.state == "cerrado") {
          closed.push(ticket);
        } else if (ticket.ticket.state.state == "terminado") {
          finished.push(ticket);
        } else if (ticket.ticket.state.state == "en progreso") {
          in_progress.push(ticket);
        }
      });
    } else {
    }
    const ret = {
      assigned: assigned,
      scheduled: scheduled,
      in_progress: in_progress,
      finished: finished,
      closed: closed
    };
    console.log(ret);
    return ret;
  }

  render() {
    const {
      collapsedAssigned,
      collapsedScheduled,
      collapsedInProgress,
      collapsedFinished,
      collapsedClosed
    } = this.state;
    const { navigation } = this.props;
    const userId = 3;
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
                    onPress={() => this.toggleExpanded(0)}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedAssigned ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {collapsedAssigned ? (
                          <Icon
                            name="chevron-with-circle-right"
                            size={30}
                            color="#249"
                          />
                        ) : (
                          <Icon
                            name="chevron-with-circle-down"
                            size={30}
                            color="#249"
                          />
                        )}

                        {" Tickets asignados"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedAssigned} align="top">
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
                    onPress={() => this.toggleExpanded(1)}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedScheduled ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {collapsedScheduled ? (
                          <Icon
                            name="chevron-with-circle-right"
                            size={30}
                            color="#249"
                          />
                        ) : (
                          <Icon
                            name="chevron-with-circle-down"
                            size={30}
                            color="#249"
                          />
                        )}
                        {" Tickets con visita coordinada"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedScheduled} align="top">
                    {orders_dict["scheduled"].length === 0 ? (
                      <View>
                        <Text>
                          No tienes tickets con visita agendada actualmente
                        </Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["scheduled"].map(ticket => (
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
                <View>
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={() => this.toggleExpanded(2)}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedInProgress ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {collapsedScheduled ? (
                          <Icon
                            name="chevron-with-circle-right"
                            size={30}
                            color="#249"
                          />
                        ) : (
                          <Icon
                            name="chevron-with-circle-down"
                            size={30}
                            color="#249"
                          />
                        )}
                        {" Tickets en progreso"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedInProgress} align="top">
                    {orders_dict["in_progress"].length === 0 ? (
                      <View>
                        <Text>No tienes en progreso actualmente</Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["in_progress"].map(ticket => (
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
                    onPress={() => this.toggleExpanded(3)}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedFinished ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {collapsedFinished ? (
                          <Icon
                            name="chevron-with-circle-right"
                            size={30}
                            color="#249"
                          />
                        ) : (
                          <Icon
                            name="chevron-with-circle-down"
                            size={30}
                            color="#249"
                          />
                        )}
                        {" Tickets terminados"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedFinished} align="top">
                    {orders_dict["finished"].length === 0 ? (
                      <View>
                        <Text>No tienes tickets terminados.</Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["finished"].map(ticket => (
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
                    onPress={() => this.toggleExpanded(4)}
                  >
                    <View
                      style={[
                        styles.header,
                        { borderBottomWidth: collapsedClosed ? 0 : 1 }
                      ]}
                    >
                      <Text style={styles.headerText}>
                        {collapsedClosed ? (
                          <Icon
                            name="chevron-with-circle-right"
                            size={30}
                            color="#249"
                          />
                        ) : (
                          <Icon
                            name="chevron-with-circle-down"
                            size={30}
                            color="#249"
                          />
                        )}
                        {" Tickets cerrados"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedClosed} align="top">
                    {orders_dict["closed"].length === 0 ? (
                      <View>
                        <Text>No tienes tickets cerrados</Text>
                      </View>
                    ) : null}
                    <ScrollView>
                      {orders_dict["closed"].map(ticket => (
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
              </View>
            );
          }
        }}
      </Query>
    );
  }
}
