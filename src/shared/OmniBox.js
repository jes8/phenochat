import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

/**
 * Search box based on Todo app tutorial
 * https://hellokoding.com/todo-app-with-react-native/
 */
class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this._onChange.bind(this);
    this.onKeyPress = this._onKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  _onChange(event){
    var title = event.nativeEvent.text;

    // Wrap in timer
    // TODO call SQlite query wrapper

    this.setState({
      newValue: title
    });

    this.props.onSearch(title);
  }

  _onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {

      // TODO call SQlite query wrapper

      this.setState({
        newValue: ''
      });
      this.props.onSearch(title);
    }
  }

  render() {
    return (
      <TextInput style={styles.searchBox}
        placeholder='Search for disease'
        blurOnSubmit={false}
        value={this.props.newValue}
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
