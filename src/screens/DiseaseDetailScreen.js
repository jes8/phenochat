import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class DiseaseDetailScreen extends Component {
	static navigationOptions = {
		title: 'Disease details'
	};

	render() {
		return (
		  <View>
			  <Text>Disease detail</Text>
		  </View>
		)
	}
};

module.exports = DiseaseDetailScreen;