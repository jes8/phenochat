import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class DescribeDiagnosesScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe diagnoses',
		headerRight: <Button 
			onPress= {() => navigation.goBack()}
  		title="Close"
			color={screenProps.tintColor}/>
	});

	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <View>
		  	<Text>
		  		Describe suspected diagnoses and select from their key symptoms
		  	</Text>
		  </View>
		)
	}
};

module.exports = DescribeDiagnosesScreen;