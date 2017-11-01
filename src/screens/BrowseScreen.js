import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

class BrowseScreen extends Component {
	static navigationOptions = {
		title: 'Browse diseases'
	};

	render() {
		return (
      <View style={styles.container}>
      	<Text>
      		Browse
      	</Text>
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

module.exports = BrowseScreen;
