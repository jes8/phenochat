import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class MainMenuView extends Component {
	constructor(props) {
		super(props);
		this._onPressed = this._onPressed.bind(this);
	}

	_onPressed() {

	}

	render() {
		return (
		  <View>
			  <Button
			  	onPress={this._onPressed}
			  	title="Describe phenotype"
			  	color="#841584"
			  	accessibilityLabel="Describe patient phenotypes"
			  />
			  <Button
			  	onPress={this._onPressed}
			  	title="Browse phenotype/disease/gene"
			  	color="#841584"
			  	accessibilityLabel="Browse phenotype, disease, or gene information"
			  />
		  </View>
		)
	}
};

module.exports = MainMenuView;