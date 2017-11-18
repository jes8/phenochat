import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	FlatList,
	ScrollView,
	Alert
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
			phenotypeList: [],
			diseaseList: []
		};

		this.onPhenotypeAdd = this._onPhenotypeAdd.bind(this);
		this.onPhenotypeRemove = this._onPhenotypeRemove.bind(this);
		this.onDiseaseAdd = this._onDiseaseAdd.bind(this);
		this.onDiseaseRemove = this._onDiseaseRemove.bind(this);
		this.renderPhenotypeList = this._renderPhenotypeList.bind(this);
		this.renderDiseaseList = this._renderDiseaseList.bind(this);
		this.onDescribeSymptoms = this._onDescribeSymptoms.bind(this);
		this.onDescribeDiagnoses = this._onDescribeDiagnoses.bind(this);
		this.onSend = this._onSend.bind(this);
	}

	_onPhenotypeAdd(item) {
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

	_onPhenotypeRemove(item, index) {
		let newList = Util.removeItemFromList(
			this.state.phenotypeList, item, index, (item) => item.hpo_id
		);

		this.setState({ phenotypeList: newList });
	}

	_onDiseaseAdd(item) {
		var newList;
		if (Array.isArray(item)) {
			newList = Util.addListToList(
				this.state.diseaseList, item, (item) => item.omim_id
			);
		} else {
			newList = Util.addItemToList(
				this.state.diseaseList, item, (item) => item.omim_id
			);
		}
		this.setState({
			diseaseList: newList
		});
	}

	_onDiseaseRemove(item, index) {
		let newList = Util.removeItemFromList(
			this.state.diseaseList, item, index, (item) => item.omim_id
		);

		this.setState({ diseaseList: newList });
	}

	_onDescribeSymptoms() {
		this.props.navigation.navigate('DescribeSymptoms', {
			onPhenotypeSelect: this.onPhenotypeAdd
		});
	}

	_onDescribeDiagnoses() {
		this.props.navigation.navigate('DescribeDiagnoses', {
			onPhenotypeSelect: this.onPhenotypeAdd,
			onDiseaseSelect: this.onDiseaseAdd
		});
	}

	_onSend() {
		if (this.state.phenotypeList.length === 0) {
			Alert.alert(
				'No phenotypes selected',
				'Please select a phenotype before sending the description',
			  [ {text: 'OK'} ],
			  { cancelable: false }
			);
		} else {
			this.props.navigation.navigate('Send', {
				phenotypeList: this.state.phenotypeList,
				diseaseList: this.state.diseaseList
			});
		}
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

		  	<View style={styles.optionContainer}>
			  	<Text style={styles.instruction}>
			  		Select from the below options to describe phenotypes
			  	</Text>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={this.onDescribeSymptoms}
				  		title='Add symptoms'
				  		accessibilityLabel='Add individual symptoms' />
				  </View>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={this.onDescribeDiagnoses}
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
					  	renderItem={this.renderPhenotypeList}
    		  		keyExtractor={ (item, index) => {return item.hpo_id} } />
					</ScrollView>

			  	<Text style={styles.instructionMid}>
			  		Selected diagnoses
			  	</Text>

			  	<ScrollView style={styles.listContainer}>
					  <FlatList
					  	data={this.state.diseaseList}
					  	renderItem={this.renderDiseaseList}
    		  		keyExtractor={ (item, index) => {return item.omim_id} } />
					</ScrollView>

				  <View style={styles.buttonContainer}>
				  	<Button
				  		onPress={this.onSend}
				  		title='Send description'
				  		accessibilityLabel='Send selected phenotype and suspected diagnosis description' />
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
  instructionMid: {
  	marginBottom: 10,
  	marginTop: 10,
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
