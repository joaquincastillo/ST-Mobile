import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import PortalScreen from '../userportal/PortalScreen';
import WebPayView from '../userportal/WebPayment/WebPayView';
import EventStack from '../events/EventStack';
import MeterStack from '../measurers/MeterStack';
import VotingStack from '../voting/VoteStack';
import ProfileStack from '../profile/ProfileStack';
import AllTransactions from '../transactions/AllTransactions';
import PdfView from '../transactions/PdfView';
import ChargesScreen from '../charges/ChargesView';
import navigatorOptions from './headerConfig';

// Se necesitaron stacks para tener header, se puede usar otro navegador dentro.

const PortalStack = createStackNavigator(
  {
    Portal: { screen: PortalScreen },
    WebPayView: { screen: WebPayView }
  },
  {
    defaultNavigationOptions: navigatorOptions,
    navigationOptions: {
      drawerLabel: 'Portal de Usuario',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome
          name="user-circle"
          size={24}
          color={tintColor}
        />
      )
    }
  },
);

const ChargeStack = createStackNavigator(
  {
    Charges: { screen: ChargesScreen },
  },
  {
    defaultNavigationOptions: navigatorOptions,
    navigationOptions: {
      drawerLabel: 'Cargos',
      drawerIcon: ({ tintColor }) => (
        <AntDesign
          name="book"
          size={24}
          color={tintColor}
        />
      )
    }
  }
);

const TransactionStack = createStackNavigator(
  {
    Transactions: { screen: AllTransactions },
    PdfView: { screen: PdfView }
  },
  {
    defaultNavigationOptions: navigatorOptions,
    navigationOptions: {
      drawerLabel: 'Transacciones',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome
          name="exchange"
          size={24}
          color={tintColor}
        />
      )
    }
  },
);

// const VotingStack = createStackNavigator(
//   {
//     Voting: { screen: VotingScreen },
//   },
//   {
//     defaultNavigationOptions: navigatorOptions,
//   },
// );


const screenMapping = {
  Portal: {
    screen: PortalStack,
  },
  Transacciones: {
    screen: TransactionStack,
  },
  Cargos: {
    screen: ChargeStack,
  },
  Eventos: {
    screen: EventStack,
  },
  Medidores: MeterStack,

  Votaciones: {
    screen: VotingStack,
  },
  Profile: ProfileStack,
};

export default screenMapping;
