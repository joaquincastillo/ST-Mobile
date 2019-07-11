import React from 'react';
import * as SecureStore from 'expo-secure-store';
import LoadingScreen from '../commons/LoadingScreen';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('AUTH_TOKEN');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const { navigation } = this.props;
    navigation.navigate(userToken ? 'MainApp' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <LoadingScreen />
    );
  }
}
