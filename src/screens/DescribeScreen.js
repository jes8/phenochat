import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	FlatList,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import GenericListViewItem from '../shared/GenericListViewItem';
import Util from '../shared/Util';

/**
 * Screen for describing phenotypes
 */
class DescribeScreen extends Component {
	static navigationOptions = {
		title: 'Describe phenotypes'
	};

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			phenotypeList: []
		};

		this.onPhenotypeAdd = this._onPhenotypeAdd.bind(this);
		this.onPhenotypeRemove = this._onPhenotypeRemove.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onPhenotypeAdd (item) {
		var newList;
		if (Array.isArray(item)) {
			newList = Util.addListToList(
				this.state.phenotypeList, item, (item) => item.hpo_id
			);
		} else {
			newList = Util.addItemToList(
				this.state.phenotypeList, item, (item) => item.hpo_id
			);
		}
		this.setState({
			phenotypeList: newList
		});
	}

	_onPhenotypeRemove (item, index) {
		let newList = Util.removeItemFromList(
			this.state.phenotypeList, item, index, (item) => item.hpo_id
		);

		this.setState({ phenotypeList: newList });
	}

	_renderList ({item, index}) {
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
		const { navigate } = this.props.navigation;

		return (
		  <View style={styles.container}>

		  	<View style={styles.optionContainer}>
			  	<Text style={styles.instruction}>
			  		Select from the below options to describe phenotypes
			  	</Text>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={() => navigate(
				  			'DescribeSymptoms', {onPhenotypeSelected: this.onPhenotypeAdd}
				  		)}
				  		title='Add symptoms'
				  		accessibilityLabel='Add individual symptoms' />
				  </View>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={() => navigate(
				  			'DescribeDiagnoses', {onPhenotypeSelected: this.onPhenotypeAdd}
				  		)}
				  		title='Add suspected diagnoses'
				  		accessibilityLabel='Add suspected diagnoses' />
				  </View>
			  </View>

			  <View style={styles.selectedContainer}>
			  	<Text style={styles.instruction}>
			  		Selected phenotypes
			  	</Text>

			  	<ScrollView style={styles.listContainer}>
					  <FlatList
					  	data={this.state.phenotypeList}
					  	renderItem={this.renderList}
    		  		keyExtractor={ (item, index) => {return item.hpo_id} } />
					</ScrollView>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={() => navigate('Email')}
				  		title='Email phenotypes'
				  		accessibilityLabel='Email selected phenotype description' />
				  </View>
				</View>

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
  optionContainer: {
  	width: '100%',
  	paddingBottom: 10,
  	borderBottomWidth: 2,
  	borderBottomColor: '#BDBDBD',
  },
  selectedContainer: {
  	width: '100%',
  	paddingTop: 10,
  	flex: 1,
  },
  instruction: {
  	marginBottom: 10,
  },
  buttonContainer: {
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
  listContainer: {
  	flex: 1,
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
});

module.exports = DescribeScreen;
