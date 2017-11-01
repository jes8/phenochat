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

import OmniBox from '../shared/OmniBox';
import GenericListViewItem from '../shared/GenericListViewItem';

// Temporary list
let dataList = [{key: 'H1', name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
					  		{key: 'H2', name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
					  		{key: 'H3', name: 'cccccccccccccccccccc'},
					  		{key: 'H4', name: 'dddddddddddddddddddddddddddddddddddddddd'},
					  		{key: 'H5', name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}];

class DescribeSymptomsScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe symptoms',
		headerRight: <Button
			onPress= {() => navigation.goBack()}
  		title="Close"
			color={screenProps.tintColor} />
	});

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			symptomList: dataList
		};

		this.renderList = this._renderList.bind(this);
		this.onPhenotypeAdd = this._onPhenotypeAdd.bind(this);
	}

	_onPhenotypeAdd(item, index) {

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
		  	onButtonPress={this.onPhenotypeAdd}
		  	/>
		)
	}
	render() {
		return (
      <View style={styles.container}>
      	<Text>
      		Describe individual symptoms
      	</Text>
      	<OmniBox />
      	<ScrollView style={styles.listContainer}>
    		  <FlatList
    		  	data={this.state.symptomList}
    		  	renderItem={this.renderList}
    		  />
    		</ScrollView>
      </View>
		);
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

module.exports = DescribeSymptomsScreen;
