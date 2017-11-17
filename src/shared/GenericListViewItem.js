import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Generic list view item to recycle in all list views
 */
class GenericListViewItem extends Component {
  constructor(props) {
    super(props);

    if (this.props.onPressButton !== undefined) {
      this.onPressButton = this._onPressButton.bind(this);
    }
    if (this.props.onPressItem !== undefined) {
      this.onPressItem = this._onPressItem.bind(this);
    }
  }

  _onPressItem() {
    this.props.onPressItem(this.props.data, this.props.dataIndex);

    // Toggle selection if selectable option is on
    if (this.props.selectable === true) {
      this.setState({ selected: !this.props.selected });
    }
  }

  _onPressButton() {
    this.props.onPressButton(this.props.data, this.props.dataIndex);
  }

  render() {
    var actionBtn = null;
    if (this.props.actionBtn !== undefined) {
      let baseColor = this.props.actionBtn.color || '#42A5F5';
      let baseLabel = this.props.actionBtn.label;

      var btnColor, btnLabel;
      if (this.props.selectable === true) {
        let selectedColor = this.props.actionBtn.selectedColor || '#78909C';
        btnColor = this.props.selected ? selectedColor : baseColor;

        let selectedLabel = this.props.actionBtn.selectedLabel || baseLabel;
        btnLabel = this.props.selected ? selectedLabel : baseLabel;
      } else {
        btnColor = baseColor;
        btnLabel = baseLabel;
      }

      actionBtn = <Icon.Button
          name={this.props.actionBtn.iconName || 'check'}
          backgroundColor={btnColor}
          size={this.props.actionBtn.iconSize || 16}
          style={styles.listItemButton}
          onPress={this.onPressButton}>
          {btnLabel}
        </Icon.Button>;
    }

    var simpleIcon = null;
    if (this.props.simpleIcon !== undefined) {
      let baseColor = this.props.simpleIcon.color || '#78909C';

      var iconColor;
      if (this.props.selectable === true) {
        let selectedColor = this.props.simpleIcon.selectedColor || '#AB47BC';
        iconColor = this.props.selected ? selectedColor : baseColor;
      } else {
        iconColor = baseColor;
      }

      simpleIcon = <Icon
        name={this.props.simpleIcon.iconName || 'chevron-right'}
        color={iconColor}
        size={this.props.simpleIcon.iconSize || 16}
        style={styles.listItemButton} />;
    }

    // If returning item is touch enabled, wrap in touchable view
    var itemView;
    if (this.props.onPressItem !== undefined) {
      itemView = <TouchableOpacity style={styles.listItem}
        onPress={this.onPressItem} >
        <Text style={styles.listItemText}>
          {this.props.data.name}
        </Text>
        {actionBtn}
        {simpleIcon}
      </TouchableOpacity>;
    } else {
      itemView = <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {this.props.data.name}
        </Text>
        {actionBtn}
        {simpleIcon}
      </View>;
    }

    return (itemView);
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
  }
});

module.exports = GenericListViewItem;
