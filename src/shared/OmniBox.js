import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import _ from 'underscore';

const WAIT_INTERVAL = 300;

/**
 * Search box based on Todo app tutorial
 * https://hellokoding.com/todo-app-with-react-native/
 */
class OmniBox extends Component {
  constructor(props) {
    super(props);

    this.onSearch = _.debounce(this.props.onSearch, WAIT_INTERVAL);
    this.onChangeText = this._onChangeText.bind(this);
    this.onKeyPress = this._onKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({ newValue: '' });
  }

  _onChangeText(text){
    this.setState({ newValue: text });

    this.onSearch(text);
  }

  _onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {
      this.setState({ newValue: '' });

      this.onSearch(text);
    }
  }

  render() {
    return (
      <TextInput
        ref={this.props.setRef}
        style={styles.searchBox}
        placeholder={this.props.placeholderText}
        blurOnSubmit={false}
        value={this.state.newValue}
        onKeyPress={this.onKeyPress}
        onChangeText={this.onChangeText}>
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    minHeight: 36,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    backgroundColor: '#FFF'
  },
});

module.exports = OmniBox;
