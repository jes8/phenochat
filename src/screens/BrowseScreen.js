import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class BrowseScreen extends Component {
	static navigationOptions = {
		title: 'Browse diseases'
	};

	render() {
		return (
		  <View>
			  <Text>Browse</Text>
		  </View>
		)
	}
};

module.exports = BrowseScreen;