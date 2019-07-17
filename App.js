import React, { Component } from "react";
import { View, Image, StatusBar, TouchableOpacity } from "react-native";
import { ApolloClient } from "apollo-client";

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
import { DrawerActions } from "react-navigation-drawer";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

// Screens
import LoginScreen from "./src/components/login/loginScreen";
import OrdersScreen from "./src/components/orders/OrdersScreen";
import AuthLoadingScreen from "./src/components/login/AuthStartScreen";

import OrderScreen from "./src/components/orders/OrderScreen";
import ChatScreen from "./src/components/chatbot/chatScreen";
import SignatureScreen from "./src/components/signature/SignatureScreen";

import {
  mainColor,
  secondaryColor,
  fontColor,
  fontSelectedColor,
  selectedColor
} from "./src/components/generalStyle";

// Utils
import { signIn, signOut, getHeaders } from "./src/auth_util";
//import { TouchableOpacity } from "react-native-gesture-handler";

require("moment/locale/es.js");

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen }
  //Orders: { screen: OrdersScreen },
  //Order: { screen: OrderScreen },
  //Chat: { screen: ChatScreen },
  //Signature: { screen: SignatureScreen }
});

const OrdersStack = createStackNavigator({
  Orders: {
    screen: OrdersScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Orders 1",
      headerLeft: <NavigatorDrawerStructure navigation={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  },
  // Order: {
  //   screen: OrderScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Order 2",
  //     headerLeft: <NavigatorDrawerStructure navigation={navigation} />,

  //     headerStyle: {
  //       backgroundColor: "#FF9800"
  //     },
  //     headerTintColor: "#fff"
  //   })
  // },
  Chat: { screen: ChatScreen },
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

class NavigatorDrawerStructure extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    //this.props.navigationProps.toggleDrawer();
    console.log("[ToggleDrawer]: Executing...");
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    //this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer}>
          <Image
            source={require("./src/assets/images/lock.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export const DrawerNavigatorExample = createDrawerNavigator({
  Screen1: {
    screen: OrdersStack,
    navigationOptions: {
      drawerLabel: "Demo Screen 1"
    }
  },
  Screen2: {
    screen: OrdersStack,
    navigationOptions: {
      drawerLabel: "Demo Screen 2"
    }
  },
  Screen3: {
    screen: OrdersStack,
    navigationOptions: {
      drawerLabel: "Demo Screen 3"
    }
  }
});

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
        JWTACCESSTOKEN: actualHeaders.token ? `${actualHeaders.token}` : ""
      }
    }))
);

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/graphql'
// });

const httpLink = new HttpLink({
  uri: "http://170.84.211.53:8000/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Esto entrega el cliente a toda la app.
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceToken: null
    };
    this.handleChangeLoginState = this.handleChangeLoginState.bind(this);
  }

  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
  }

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
    await this.setState({ deviceToken: token });
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
    const { deviceToken } = this.state;
    return (
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <AppCont
          screenProps={{
            changeLoginState: this.handleChangeLoginState,
            deviceToken
          }}
        />
      </ApolloProvider>
    );
  }
}
