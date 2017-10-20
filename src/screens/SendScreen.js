import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class SendScreen extends Component {
	static navigationOptions = {
		title: 'Send phenotypes'
	};

	render() {
		return (
		  <View>
			  <Text>Send</Text>
		  </View>
		)
	}
};

module.exports = SendScreen;