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
 * Screen for editing selected symptoms
 */
class EditSymptomsScreen extends Component {
	static navigationOptions = {
		title: 'Edit selected symptoms'
	};

	constructor(props) {
		super(props);

		// Set state
		// This is a stupid implementation....
		const { params } = this.props.navigation.state;
		this.state = {
			phenotypeList: params.phenotypeList
		};

		this.onPhenotypeRemove = this._onPhenotypeRemove.bind(this);
		this.renderPhenotypeList = this._renderPhenotypeList.bind(this);
	}

	_onPhenotypeRemove(item, index) {
		let newList = Util.removeItemFromList(
			this.state.phenotypeList, item, index, (item) => item.hpo_id
		);

		this.setState({ phenotypeList: newList });

		// Remove selected phenotype in parent
		const { params } = this.props.navigation.state;
		params.onPhenotypeRemove(item, index);
	}

	_renderPhenotypeList({item, index}) {
		return(
		  <GenericListViewItem
		  	actionBtn={{
		  		iconName: 'times',
		  		color: '#E53935',
		  		label: 'Remove'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onPressButton={this.onPhenotypeRemove} />
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<Text style={styles.instruction}>
	  			Below are selected symptoms
		  	</Text>

		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.phenotypeList}
				  	renderItem={this.renderPhenotypeList}
  		  		keyExtractor={ (item, index) => {return item.hpo_id} } />
				</ScrollView>
		  </View>
		)
	}
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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

module.exports = EditSymptomsScreen;
