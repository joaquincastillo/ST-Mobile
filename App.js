import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";

import { ApolloClient } from "apollo-client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import NotificationPopup from "react-native-push-notification-popup";

// Screens
import LoginScreen from "./src/components/login/loginScreen";
import OrdersScreen from "./src/components/orders/OrdersScreen";
import AuthLoadingScreen from "./src/components/login/AuthStartScreen";

import OrderScreen from "./src/components/orders/OrderScreen";
import ChatQueryScreen from "./src/components/chatbot/chatQueryScreen";
import SignatureScreen from "./src/components/signature/SignatureScreen";

import {
  mainColor,
  secondaryColor,
  fontColor,
  fontSelectedColor,
  selectedColor,
  styles
} from "./src/components/generalStyle";

// Utils
import { signIn, signOut, getHeaders } from "./src/auth_util";

require("moment/locale/es.js");

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen }
  //Orders: { screen: OrdersScreen },
  //Order: { screen: OrderScreen },
  //Chat: { screen: ChatScreen },
  //Signature: { screen: SignatureScreen }
});

const OrdersStack = createStackNavigator({
  Orders: { screen: OrdersScreen },
  Order: { screen: OrderScreen },
  Chat: { screen: ChatQueryScreen },
  Signature: { screen: SignatureScreen }
});

const AuthStack = createStackNavigator(
  {
    Login: { screen: LoginScreen }
    //,
    //RecoverPass: { screen: RecoverPasswordScreen }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppCont = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      OrdersStack,
      Auth: AuthStack
    },
    //{
    //  Login: LoginStack
    //},
    //{
    //  Orders: OrdersStack
    //},
    //{
    //  Chat: ChatScreen
    //},
    //{
    //  Signature: SignatureScreen
    //},
    {
      initialRouteName: "AuthLoading"
    }
  )
);

// const MainApp = createDrawerNavigator(
//   {
//     ...screenMapping
//   },
//   {
//     initialRouteName: "Order",
//     drawerBackgroundColor: mainColor,
//     overlayColor: secondaryColor,
//     contentComponent: DrawerContent,
//     contentOptions: {
//       activeTintColor: fontSelectedColor,
//       inactiveTintColor: fontColor,
//       activeBackgroundColor: selectedColor,
//       itemsContainerStyle: {
//         marginBottom: 50
//       },
//       iconContainerStyle: {
//         opacity: 1
//       }
//     }
//   }
// );

const authLink = setContext((_, { headers }) =>
  getHeaders()
    // get the authentication token from local storage if it exists
    .then(actualHeaders => ({
      // return the headers to the context so httpLink can read them
      headers: {
        ...headers,
        //JWTACCESSTOKEN: actualHeaders.token ? `${actualHeaders.token}` : "",
        token: actualHeaders.token ? `${actualHeaders.token}` : ""
      }
    }))
);

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/graphql'
// });

const httpLink = new HttpLink({
  // FIXME: change this when going into production
  //uri: "http://fd577781.ngrok.io/graphql"
  uri: "http://170.84.211.53:8000/graphql"
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache()
});

// Esto entrega el cliente a toda la app.
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushToken: null,
      notification: null
    };
    this.handleChangeLoginState = this.handleChangeLoginState.bind(this);
  }

  componentWillUnmount() {
    this.listener && expo.Notifications.removeListener(this.listen);
  }

  listen = ({ origin, data }) => {
    console.log("cool data", origin, data);
  };

  async componentWillMount() {
    //this.handleChangeLoginState(false);
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this.listen);
    if (Platform.OS === "android") {
      Expo.Notifications.createChannelAndroidAsync("chat-messages", {
        name: "Chat messages",
        sound: true
      });
    }
  }

  _handleNotification = notification => {
    this.setState({ notification: notification }, () => {
      console.log(`[PUSH NOTIFICATION] ${this.state.notification.data.sender}`);
    });
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(
        Permissions.REMOTE_NOTIFICATIONS
      );
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    // const token = await Notifications.getDevicePushTokenAsync();
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(`El token: ${token}`);
    await this.setState({ pushToken: token });
  };

  handleChangeLoginState(loggedIn = false, jwt) {
    if (loggedIn) {
      signIn(jwt);
    } else {
      client.resetStore();
      signOut();
    }
  }

  render() {
    const { pushToken } = this.state;
    console.log(`THE PUSH_TOKEN: ${pushToken}`);
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <NotificationPopup ref={ref => (this.popup = ref)} />
        </View>
        <StatusBar barStyle="dark-content" />
        <AppCont
          screenProps={{
            changeLoginState: this.handleChangeLoginState,
            pushToken
          }}
        />

        {this.state.notification ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Origin: {this.state.notification.data.sender}</Text>
            <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
          </View>
        ) : null}
      </ApolloProvider>
    );
  }
}
