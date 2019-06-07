import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';


// Screens
import LoginScreen from './src/components/login/loginScreen';
import OrdersScreen from './src/components/orders/OrdersScreen';
import OrderScreen from './src/components/orders/OrderScreen';

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Orders: { screen: OrdersScreen },
  Order: { screen: OrderScreen }
});

const OrdersStack = createStackNavigator({
  Orders: { screen: OrdersScreen },
});

const AppCont = createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginStack,
    },
    {
      Orders: OrdersStack,
    },
    {
      initialRouteName: 'Login'
    }
  )
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppCont/>
    );
  }
}