import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ListItem, Divider } from "react-native-elements";
import { Ionicons as Icon } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import ChatButton from "../chatbot/chatButton";
import LoadingScreen from "../commons/LoadingScreen";

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
    console.log(data.edges);
    console.log("done bitch");
    data.edges.foreach(function(ticket) {
      if (ticket.state.state == "assigned") {
        assigned.push(ticket);
      } else if (ticket.state.state == "closed") {
        closed.push(ticket);
      }
    });
    const ret = { assigned: assigned, closed: closed };
    return ret;
  }

  render() {
    const {
      colllapsedOnGoing,
      collapsedPending,
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
          }
          orders_dict = this.sortOrdersByState(data);
          console.log(orders_dict);
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
                    <Text style={styles.headerText}>{"En curso"}</Text>
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={colllapsedOnGoing} align="top">
                  <View>
                    <ListItem
                      key={"ID8879"}
                      title={"Orden de trabajo en Falabella"}
                      titleStyle={styles.listItemTitle}
                      subtitle={
                        <View style={{ flexDirection: "row" }}>
                          <Text>ID8879</Text>
                        </View>
                      }
                      subtitleStyle={styles.listItemSubtitle}
                      onPress={() =>
                        this.props.navigation.navigate("Order", {
                          name: "#ID8879",
                          client: "Falabella",
                          status: "unfinished"
                        })
                      }
                      containerStyle={styles.listItemContainer}
                    />
                    <View style={styles.dividerView}>
                      <Divider />
                    </View>
                  </View>
                </Collapsible>
              </View>
              <View />
              <View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={this.toggleExpandedPending}
                >
                  <View
                    style={[
                      styles.header,
                      { borderBottomWidth: collapsedPending ? 0 : 1 }
                    ]}
                  >
                    <Text style={styles.headerText}>
                      {"Pendientes de inicio"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedPending} align="top">
                  <View>
                    <ListItem
                      key={"ID1289"}
                      title={"Orden de trabajo en Ripley"}
                      titleStyle={styles.listItemTitle}
                      subtitle={
                        <View style={{ flexDirection: "row" }}>
                          <Text>ID1289</Text>
                        </View>
                      }
                      subtitleStyle={styles.listItemSubtitle}
                      onPress={() =>
                        this.props.navigation.navigate("Order", {
                          name: "#ID1289",
                          client: "Ripley",
                          status: "pending"
                        })
                      }
                      containerStyle={styles.listItemContainer}
                    />
                    <View style={styles.dividerView}>
                      <Divider />
                    </View>
                  </View>
                </Collapsible>
              </View>

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
                    <Text style={styles.headerText}>{"Terminadas"}</Text>
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedFinished} align="top">
                  <View>
                    <ListItem
                      key={"ID3367 "}
                      title={"Orden de trabajo en Cencosud"}
                      titleStyle={styles.listItemTitle}
                      subtitle={
                        <View style={{ flexDirection: "row" }}>
                          <Text>ID3367</Text>
                        </View>
                      }
                      subtitleStyle={styles.listItemSubtitle}
                      onPress={() =>
                        this.props.navigation.navigate("Order", {
                          name: "#ID1289",
                          client: "Cencosud",
                          status: "finished"
                        })
                      }
                      containerStyle={styles.listItemContainer}
                    />
                    <View style={styles.dividerView}>
                      <Divider />
                    </View>
                  </View>
                </Collapsible>
              </View>
              <View>
                <ChatButton navigation={navigation} />
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}
