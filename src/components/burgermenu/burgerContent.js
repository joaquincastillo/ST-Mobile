import React from 'react';
import { DrawerItems } from 'react-navigation';
import {
  ScrollView, Text, SafeAreaView, Image, TouchableOpacity, View, PixelRatio, Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropertyLabel from './PropertyLabel';

const {
  styles, headerColor, fontSelectedColor, fontColor
} = require('./burgerStyle');

const greenLogo = require('../../assets/images/cf_white_logo.png');

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChangeProperty = this.handleChangeProperty.bind(this);
    this.handleToogle = this.handleToogle.bind(this);
    this.state = {
      isSelecting: false
    };
    this.inputRefs = {
      selectedProperty: null
    };
  }

  handleLogOut() {
    const { screenProps, navigation, logOutUser } = this.props;
    logOutUser(screenProps.deviceToken).then(() => {
      screenProps.changeLoginState(false);
      navigation.navigate('AuthLoading');
    }).catch(() => Alert.alert('Hubo un error de conexión. Inténtalo más tarde'));
  }

  handleToogle() {
    const { isSelecting } = this.state;
    this.setState({ isSelecting: !isSelecting });
  }

  handleChangeProperty(property) {
    const { screenProps, navigation } = this.props;
    if (property.id !== screenProps.currentProperty.value.id) {
      screenProps.selectProperty(property);
      navigation.navigate('AuthLoading');
    } else {
      this.handleToogle();
    }
  }

  render() {
    const { screenProps } = this.props;
    const { isSelecting } = this.state;
    const properties = screenProps.currentProperty ? screenProps.userProperties : [{ label: 'cargando', value: 0 }];
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}
      >
        <View
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: PixelRatio.getPixelSizeForLayoutSize(25)
            }]}
        >
          <TouchableOpacity
            style={[styles.item, {
              height: '100%',
              backgroundColor: headerColor,
              width: '100%',
              justifyContent: 'space-between'
            }]}
            activeOpacity={0.9}
            onPress={this.handleToogle}
          >
            <View style={styles.iconContainer}>
              <Image
                resizeMode="center"
                source={greenLogo}
              />
            </View>
            <View style={styles.label}>
              <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
              }}
              >
                {screenProps.currentProperty ? screenProps.currentProperty.label : 'Cargando...'}
              </Text>
            </View>
            <View style={styles.label}>
              {isSelecting
                ? (
                  <Ionicons
                    name="ios-arrow-up"
                    size={20}
                    color="#fff"
                  />
                )
                : (
                  <Ionicons
                    name="ios-arrow-down"
                    size={20}
                    color="#fff"
                  />
                )
              }
            </View>

          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            {isSelecting
              ? (
                properties.map((proper, index) => (
                  proper.label === 'cargando'
                    ? null
                    : (
                      <PropertyLabel
                        property={proper}
                        change={this.handleChangeProperty}
                        key={index.toString()}
                      />
                    )
                ))
              )

              : null
            }
            <View style={[styles.burgerSeparator, {
              borderBottomWidth: isSelecting ? 1 : 0
            }]}
            />
            <DrawerItems
              {...this.props}
              activeTintColor={fontSelectedColor}
              inactiveTintColor={fontColor}
            />
          </SafeAreaView>
          <TouchableOpacity onPress={this.handleLogOut}>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color={fontColor}
                />
              </View>
              <Text style={styles.label}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>


    );
  }
}

export default graphql(
  gql`
    mutation logOutUser($token: String!) {
      logOutUser(token: $token){
        message
        request
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      logOutUser: token => mutate(
        { variables: { token } }
      ),
    })
  }
)(DrawerContent);
