import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

// Screens
import LoginScreen from "./src/components/login/loginScreen";
import OrdersScreen from "./src/components/orders/OrdersScreen";
import OrderScreen from "./src/components/orders/OrderScreen";
import ChatScreen from "./src/components/chatbot/chatScreen";
import SignatureScreen from "./src/components/signature/SignatureScreen";

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Orders: { screen: OrdersScreen },
  Order: { screen: OrderScreen },
  Chat: { screen: ChatScreen },
  Signature: { screen: SignatureScreen }
});

const OrdersStack = createStackNavigator({
  Orders: { screen: OrdersScreen }
});

const AppCont = createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginStack
    },
    {
      Orders: OrdersStack
    },
    {
      Chat: ChatScreen
    },
    {
      Signature: SignatureScreen
    },
    {
      initialRouteName: "Login"
    }
  )
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppCont />;
  }
}
