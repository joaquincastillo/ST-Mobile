import React from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  Platform
} from 'react-native';
import { strongColor, generalStyles } from './generalStyle';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 1 : 100}
      color={strongColor}
    />
    <Text style={generalStyles.loadingText}> Cargando ... </Text>
    <StatusBar barStyle="default" />
  </View>
);

export default LoadingScreen;
