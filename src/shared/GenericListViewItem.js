import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Generic list view item to recycle in all list views
 */
class GenericListViewItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {this.props.data.name}
        </Text>
        <Icon.Button
          name={this.props.button.iconName}
          backgroundColor={this.props.button.color}
          size={16}
          style={styles.listItemButton}
          onPress={ () =>
            this.props.onButtonPress(this.props.data, this.props.dataIndex)
          }
          >
          {this.props.button.label}
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    flex: 1,
    marginRight: 10,
  },
  listItemButton: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

module.exports = GenericListViewItem;
