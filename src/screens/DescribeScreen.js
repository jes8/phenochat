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
		this.onDescribeSymptoms = this._onDescribeSymptoms.bind(this);
		this.onDescribeDiagnoses = this._onDescribeDiagnoses.bind(this);
		this.onEditSymptoms = this._onEditSymptoms.bind(this);
		this.onEditDiagnoses = this._onEditDiagnoses.bind(this);
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

	_onEditSymptoms() {
		this.props.navigation.navigate('EditSymptoms', {
			phenotypeList: this.state.phenotypeList,
			onPhenotypeRemove: this.onPhenotypeRemove
		});
	}

	_onEditDiagnoses() {
		this.props.navigation.navigate('EditDiagnoses', {
			diseaseList: this.state.diseaseList,
			onDiseaseRemove: this.onDiseaseRemove
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

	render() {
		return (
		  <View style={styles.container}>

		  	<View style={styles.topContainer}>
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

			  <View style={styles.bottomContainer}>
			  	<View style={styles.selectedContainer}>
					  <View style={styles.selectedRow}>
					  	<Text style={styles.counter}>
					  		Selected phenotypes: {this.state.phenotypeList.length}
					  	</Text>

					  	<Button
					  		onPress={this.onEditSymptoms}
					  		title='Edit'
					  		accessibilityLabel='Edit selected symptoms' />
						</View>

					  <View style={styles.selectedRow}>
					  	<Text style={styles.counter}>
					  		Selected diagnoses: {this.state.diseaseList.length}
					  	</Text>

					  	<Button
					  		onPress={this.onEditDiagnoses}
					  		title='Edit'
					  		accessibilityLabel='Edit selected diagnoses' />
						</View>
					</View>

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
  topContainer: {
  	width: '100%',
  	paddingBottom: 10,
  	borderBottomWidth: 2,
  	borderBottomColor: '#BDBDBD',
  },
  instruction: {
  	marginBottom: 10,
  },
  bottomContainer: {
  	width: '100%',
  	paddingTop: 10,
  	flex: 1,
  },
  selectedContainer: {
  	paddingTop: 5,
  	paddingBottom: 10,
  	marginBottom: 5,
  	borderBottomWidth: 2,
  	borderBottomColor: '#BDBDBD',
  },
  selectedRow: {
  	paddingTop: 15,
  	paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  counter: {
  	fontSize: 20,
  	fontWeight: 'bold',
  },
  buttonContainer: {
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
});

module.exports = DescribeScreen;
