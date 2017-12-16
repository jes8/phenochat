import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ScrollView,
} from 'react-native';

import GenericListViewItem from '../shared/GenericListViewItem';
import Util from '../shared/Util';

/**
 * Screen for editing selected diagnoses
 */
class EditDiagnosesScreen extends Component {
	static navigationOptions = {
		title: 'Edit selected diagnoses'
	};

	constructor(props) {
		super(props);

		// Set state
		// This is a stupid implementation....
		const { params } = this.props.navigation.state;
		this.state = {
			diseaseList: params.diseaseList
		};

		this.onDiseaseRemove = this._onDiseaseRemove.bind(this);
		this.renderDiseaseList = this._renderDiseaseList.bind(this);
	}

	_onDiseaseRemove(item, index) {
		// Remove diagnosis in current screen
		// This is a stupid implementation....
		let newList = Util.removeItemFromList(
			this.state.diseaseList, item, index, (item) => item.omim_id
		);

		this.setState({ diseaseList: newList });

		// Remove selected diagnosis in parent
		const { params } = this.props.navigation.state;
		params.onDiseaseRemove(item, index);
	}

	_renderDiseaseList({item, index}) {
		return(
		  <GenericListViewItem
		  	actionBtn={{
		  		iconName: 'times',
		  		color: '#E53935',
		  		label: 'Remove'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onPressButton={this.onDiseaseRemove} />
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<Text style={styles.instruction}>
		  		Below are selected diagnoses
		  	</Text>

		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.diseaseList}
				  	renderItem={this.renderDiseaseList}
  		  		keyExtractor={ (item, index) => {return item.omim_id} } />
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
  instruction: {
  	marginBottom: 10,
  },
  listContainer: {
  	width: '100%',
  	flex: 1,
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
});

module.exports = EditDiagnosesScreen;
