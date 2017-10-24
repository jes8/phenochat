import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Temporary list
let dataList = [{key: 'H1', name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
					  		{key: 'H2', name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
					  		{key: 'H3', name: 'cccccccccccccccccccc'},
					  		{key: 'H4', name: 'dddddddddddddddddddddddddddddddddddddddd'},
					  		{key: 'H5', name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}];

/**
 * Add item to list as well as sort it by name
 */
function addItemToList(list, item) {
	// Make a copy of the list
	let newList = list.slice();

	// Add item
	newList.push(item);

	// Sort alphabetically
	return newList.sort(function(a, b) {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		return 0;
	});
}

/**
 * Remove item from lits
 */
function removeItemFromList(list, item, itemIndex){
	// Make a copy of the list
	let newList = list.slice();

	// Make sure it's the correct item we're removing
	let toRemove = list[itemIndex];

	if (newList.length > 0 && toRemove.key === item.key) {
		newList.splice(itemIndex, 1);
	}

	return newList;
}

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
			phenotypeList: dataList
		};

		this.onPhenotypeAdd = this._onPhenotypeAdd.bind(this);
		this.onPhenotypeRemove = this._onPhenotypeRemove.bind(this);
	}

	_onPhenotypeAdd (item) {
		let newList = addItemToList(this.state.phenotypeList, item);
		this.setState({
			phenotypeList: newList
		});
	}

	_onPhenotypeRemove (item, index) {
		let newList = removeItemFromList(this.state.phenotypeList, item, index);
		this.setState({
			phenotypeList: newList
		});
	}

	_renderList ({item, index}) {
		return({

		})
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
				  		onPress= {() => navigate('DescribeSymptoms')}
				  		title="Add symptoms"
				  		accessibilityLabel="Add individual symptoms"
				  		/>
				  </View>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress= {() => navigate('DescribeDiagnoses')}
				  		title="Add suspected diagnoses"
				  		accessibilityLabel="Add suspected diagnoses"
				  		/>
				  </View>
			  </View>

			  <View style={styles.selectedContainer}>
			  	<Text style={styles.instruction}>
			  		Selected phenotypes
			  	</Text>

			  	<ScrollView style={styles.listContainer}>
					  <FlatList
					  	data={this.state.phenotypeList}
					  	renderItem={({item, index}) =>
					  		<View style={styles.listItem}>
					  			<Text style={styles.listItemText}>{item.name}</Text>
							  	<Icon.Button
							  		name="times"
							  		backgroundColor="#E53935"
							  		size={16}
							  		style={styles.listItemButton}
							  		onPress={() => this.onPhenotypeRemove(item, index)}
							  		>
							  		Remove
							  	</Icon.Button>
					  		</View>
					  	}
					  />
					</ScrollView>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress= {() => navigate('Send')}
				  		title="Send phenotypes"
				  		accessibilityLabel="Send selected phenotype description"
				  		/>
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
    padding: 10,
  },
  optionContainer: {
  	width: '90%',
  	paddingBottom: 10,
  	borderBottomWidth: 2,
  	borderBottomColor: '#BDBDBD',
  },
  selectedContainer: {
  	width: '90%',
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
  listItem: {
  	padding: 10,
    minHeight: 44,
  	borderBottomWidth: 1,
  	borderBottomColor: '#E0E0E0',
  	flexDirection: 'row',
  	alignItems: 'center',
  },
  listItemText: {
  	flex: 1,
  	marginRight: 10,
  },
  listItemButton: {
  	paddingLeft: 8,
  	paddingRight: 8,
  	paddingTop: 10,
  	paddingBottom: 10,
  }
});

module.exports = DescribeScreen;
