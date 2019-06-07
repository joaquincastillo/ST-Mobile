import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { Ionicons as Icon } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

const { styles } = require('./styles');

export default class OrdersScreen extends React.Component {
    static navigationOptions = {
        title: 'Mis Ordenes de Trabajo',
    };

    constructor(props) {
        super(props);
        this.state = {
            collapsedUnfinished: false,
            collapsedPending: false,
            collapsedFinished: false
        };
    }

    toggleExpandedUnfinished = () => {
        const { collapsedUnfinished } = this.state;
        this.setState({ collapsedUnfinished: !collapsedUnfinished });
    }

    toggleExpandedPending = () => {
        const { collapsedPending } = this.state;
        this.setState({ collapsedPending: !collapsedPending });
    }

    toggleExpandedFinished = () => {
        const { collapsedFinished } = this.state;
        this.setState({ collapsedFinished: !collapsedFinished });
    }

    render() {
        const { collapsedUnfinished, collapsedPending, collapsedFinished } = this.state;
        return (
            <View style={{ margin: 10, padding: 5 }}>
                <View>
                    <TouchableOpacity activeOpacity={0.2} onPress={this.toggleExpandedUnfinished}>
                        <View style={[styles.header, { borderBottomWidth: collapsedUnfinished ? 0 : 1 }]}>
                            <Text style={styles.headerText}>{"En curso"}</Text>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedUnfinished} align="top">
                        <View>
                            <ListItem
                                key={"ID8879"}
                                title={"Orden de trabajo en Falabella"}
                                titleStyle={styles.listItemTitle}
                                subtitle={(
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>
                                            ID8879
                                                </Text>
                                    </View>
                                )}
                                subtitleStyle={styles.listItemSubtitle}
                                onPress={() => this.props.navigation.navigate('Order', {
                                    name: '#ID8879', client: 'Falabella', status: 'unfinished'
                                })}
                                containerStyle={styles.listItemContainer}
                            />
                            <View style={styles.dividerView}>
                                <Divider />
                            </View>
                        </View>
                    </Collapsible>
                </View>
                <View>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.2} onPress={this.toggleExpandedPending}>
                        <View style={[styles.header, { borderBottomWidth: collapsedPending ? 0 : 1 }]}>
                            <Text style={styles.headerText}>{"Pendientes de inicio"}</Text>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedPending} align="top">
                        <View>
                            <ListItem
                                key={"ID1289"}
                                title={"Orden de trabajo en Ripley"}
                                titleStyle={styles.listItemTitle}
                                subtitle={(
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>
                                            ID1289
                                        </Text>
                                    </View>
                                )}
                                subtitleStyle={styles.listItemSubtitle}
                                onPress={() => this.props.navigation.navigate('Order', {
                                    name: '#ID1289', client: 'Ripley', status: 'pending'
                                })}
                                containerStyle={styles.listItemContainer}
                            />
                            <View style={styles.dividerView}>
                                <Divider />
                            </View>
                        </View>
                    </Collapsible>
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.2} onPress={this.toggleExpandedFinished}>
                        <View style={[styles.header, { borderBottomWidth: collapsedFinished ? 0 : 1 }]}>
                            <Text style={styles.headerText}>{"Terminadas"}</Text>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedFinished} align="top">
                        <View>
                            <ListItem
                                key={"ID3367 "}
                                title={"Orden de trabajo en Cencosud"}
                                titleStyle={styles.listItemTitle}
                                subtitle={(
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>
                                            ID3367
                                        </Text>
                                    </View>
                                )}
                                subtitleStyle={styles.listItemSubtitle}
                                onPress={() => this.props.navigation.navigate('Order', {
                                    name: '#ID1289', client: 'Cencosud', status: 'finished'
                                })}
                                containerStyle={styles.listItemContainer}
                            />
                            <View style={styles.dividerView}>
                                <Divider />
                            </View>
                        </View>
                    </Collapsible>
                </View>

                <View style={styles.container}>
                    <View style={{ height: '90%' }}>
                        <ScrollView>
                            <View style={styles.collapsableTitleContainer}>
                                <TouchableOpacity onPress={this.toggleExpandedUnfinished} style={{ flexDirection: 'row' }}>

                                </TouchableOpacity>
                                <Divider style={styles.divider} />
                            </View>
                            <Collapsible collapsed={collapsedPending}>


                            </Collapsible>
                            <View style={styles.collapsableTitleContainer}>
                                <TouchableOpacity onPress={this.toggleExpandedPending} style={{ flexDirection: 'row' }}>
                                    <Text style={styles.collapsableTitle}>
                                        Pendientes
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

            
        );
    }
}


    