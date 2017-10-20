import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class DescribeSymptomsScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe symptoms',
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
		  		Describe individual symptoms
		  	</Text>
		  </View>
		)
	}
};

module.exports = DescribeSymptomsScreen;