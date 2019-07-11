import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import HTML from 'react-native-render-html';


export default class DetailsCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
      isCollapsible: props.isCollapsible === undefined ? true : props.isCollapsible
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    const { isCollapsible, collapsed } = this.state;
    if (isCollapsible) {
      this.setState({ collapsed: !collapsed });
    }
  }

  render() {
    const { title, content } = this.props;
    const { isCollapsible, collapsed } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleExpanded} activeOpacity={isCollapsible ? 0.2 : 1}>
          <View style={[styles.header, { borderBottomWidth: collapsed ? 0 : 1 }]}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="top">
          <ScrollView style={styles.content} alwaysBounceVertical={false}>
            <View>
              <HTML html={content} />
            </View>
          </ScrollView>
        </Collapsible>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderColor: '#0c6',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  content: {
    paddingHorizontal: '5%',
    paddingVertical: '2%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  border: {
    borderWidth: 1,
    borderColor: '#0c6',
    margin: 10
  },
  topBorder: {
    borderTopWidth: 1,
    borderColor: '#0c6',
  },
  amount: {
    fontSize: 25,
    alignSelf: 'center',
  },
  paytext: {
    fontSize: 18,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  hugeButton: {
    width: '80%',
  }

});
