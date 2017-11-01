import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

class SendScreen extends Component {
	static navigationOptions = {
		title: 'Send phenotypes'
	};

	render() {
		return (
      <View style={styles.container}>
      	<Text>
      		Send
      	</Text>

      	// TODO share options with icons
      </View>
		)
	}
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
});

module.exports = SendScreen;