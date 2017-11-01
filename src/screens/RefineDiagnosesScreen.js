import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { NavigationActions } from 'react-navigation';

import OmniBox from '../shared/OmniBox';
import GenericListViewItem from '../shared/GenericListViewItem';

// Temporary list
let dataList = [{key: 'D1', name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
					  		{key: 'D2', name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
					  		{key: 'D3', name: 'cccccccccccccccccccc'},
					  		{key: 'D4', name: 'dddddddddddddddddddddddddddddddddddddddd'},
					  		{key: 'D5', name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}];

class RefineDiagnosesScreen extends Component {
	// For dismissing modal. Not an ideal solution but works for now
	// https://github.com/react-community/react-navigation/issues/686
	componentDidMount() {
    this.props.navigation.setParams({dismiss: this.props.navigation.dismiss});
  }

	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Refine diagnoses',
		headerRight: <Button
			onPress={() => { navigation.state.params.dismiss() }}
  		title="Close"
			color={screenProps.tintColor} />
	});

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			diseaseList: dataList
		};

		this.renderList = this._renderList.bind(this);
		this.onDiagnosisAdd = this._onDiagnosisAdd.bind(this);
	}

	_onDiagnosisAdd(item, index) {

	}

	_renderList ({item, index}) {
		return(
		  <GenericListViewItem
		  	button={{
		  		iconName: 'plus',
		  		color: '#009688',
		  		label: 'Add'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onButtonPress={this.onDiagnosisAdd}
		  	/>
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<Text>
		  		Describe suspected diagnoses and select from their key symptoms
		  	</Text>
		  	<OmniBox />
		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.diseaseList}
				  	renderItem={this.renderList}
				  />
				</ScrollView>
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
  listContainer: {
  	width: '100%',
  	flex: 1,
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
});

module.exports = RefineDiagnosesScreen;
