import React from 'react';
import {
  View, Text, TouchableOpacity, PixelRatio
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const burgerStyle = require('./burgerStyle');

const { fontColor } = burgerStyle;

const defSubTitle = (state) => {
  if (state.params) {
    if (state.params.subtitle) {
      return state.params.subtitle;
    }
  }
  if (state.routes) {
    if (state.routes[0] && state.routes[0].params && state.routes[0].params.subtitle) {
      return state.routes[0].params.subtitle;
    }
    return state.routeName;
  }
  return state.routeName;
};


const MenuIcon = navigation => (
  <TouchableOpacity
    onPress={() => (
      navigation.state.params && navigation.state.params.canGoBack
        ? navigation.goBack()
        : navigation.openDrawer())
      }
    activeOpacity={0.9}
    style={{
      justifyContent: 'center', alignItems: 'center', width: 70
    }}
  >
    <View>
      {navigation.state.params && navigation.state.params.canGoBack
        ? (
          <MaterialIcons
            name="arrow-back"
            size={40}
            color="#333"
            onPress={() => (navigation.goBack())}
          />
        )
        : (
          <Ionicons
            name="md-menu"
            size={40}
            color="#333"
            onPress={() => (navigation.openDrawer())}
          />
        )
    }
    </View>
  </TouchableOpacity>
);

const navigatorOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#fff',
    shadowOpacity: 0,
    elevation: 2,
    height: PixelRatio.getPixelSizeForLayoutSize(15),
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(10)
  },
  headerTitle: (
    <View style={{ backgroundColor: '#fff' }}>
      <Text style={{
        fontWeight: 'bold', color: '#333', fontSize: 20, marginHorizontal: '10%'
      }}
      >
        {navigation.getScreenProps().currentProperty ? navigation.getScreenProps().currentProperty.label || navigation.getScreenProps().currentProperty.name : 'Cargando...'}
      </Text>
      <Text style={{ color: '#666', fontSize: 14, marginHorizontal: '10%' }}>{defSubTitle(navigation.state)}</Text>
    </View>
  ),
  headerTintColor: fontColor,
  headerLeft: MenuIcon(navigation),
  headerLeftContainerStyle: {
    top: -PixelRatio.getPixelSizeForLayoutSize(10),
    height: PixelRatio.getPixelSizeForLayoutSize(25)
  }
});

export default navigatorOptions;
