import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';

const { generalStyles, lessImportantTextColor } = require('./generalStyle');

export default class NoItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reloading: false };
    this.tryAgain = this.tryAgain.bind(this);
    props.navigation.setParams({ subtitle: 'No hay items' });
  }

  async tryAgain() {
    const { refetch } = this.props;
    await this.setState({ reloading: true });
    await refetch()
      .catch(async () => {
        await this.setState({ reloading: false });
      });
  }

  render() {
    const { reloading } = this.state;
    return (
      <View style={generalStyles.errorScreen}>
        {reloading
          ? <LoadingScreen />
          : (
            <TouchableOpacity style={generalStyles.errorScreen} onPress={() => this.tryAgain()}>
              <Icon
                name="cloud-question"
                size={100}
                color={lessImportantTextColor}
              />
              <Text style={generalStyles.errorText}>
                No hay nada que mostrar aquí
              </Text>
              <Text style={generalStyles.errorText}>
                Presiona la pantalla para intentar recargar
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}
