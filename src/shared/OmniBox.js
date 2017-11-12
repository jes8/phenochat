import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
// import _ from 'underscore';

// const WAIT_INTERVAL = 300;

/**
 * Search box based on Todo app tutorial
 * https://hellokoding.com/todo-app-with-react-native/
 */
class OmniBox extends Component {
  constructor(props) {
    super(props);

    this.onChange = this._onChange.bind(this);
    // this.onChange =  _.debounce(this._onChange, WAIT_INTERVAL);
    this.onKeyPress = this._onKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  _onChange(event){
    var title = event.nativeEvent.text;

    this.setState({
      newValue: title
    });

    this.props.onSearch(title);
  }

  _onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {

      this.setState({
        newValue: ''
      });

      this.props.onSearch(title);
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
        onChange={this.onChange}>
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
