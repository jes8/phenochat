import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList,
	Alert,
	ActivityIndicator,
	Platform
} from 'react-native';

import GenericListViewItem from '../shared/GenericListViewItem';

import Phenotype from '../models/Phenotype';

/**
 * Screen for selecting key symptoms of selected diagnosis
 */
class RefineSymptomsScreen extends Component {
	// For dismissing modal. Not an ideal solution but works for now
	// https://github.com/react-community/react-navigation/issues/686
	componentDidMount() {
    this.props.navigation.setParams({dismiss: this.props.screenProps.dismiss});
  }

	static navigationOptions = ({navigation}) => ({
		title: 'Select key symptoms',
		headerLeft: <Button
			onPress={() => { navigation.goBack(); }}
  		title='Back' />,
		headerRight: <Button
			onPress={() => { navigation.state.params.dismiss(); }}
  		title='Close' />,
		headerStyle: styles.header
	});

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			symptomList: [],
			selectAll: false,
		};

		this.onSymptomToggleSelect = this._onSymptomToggleSelect.bind(this);
		this.onSymptomsToggleAll = this._onSymptomsToggleAll.bind(this);
		this.onSymptomsAdd = this._onSymptomsAdd.bind(this);
		this.renderList = this._renderList.bind(this);
	}

  componentWillMount() {
  	// Set default
		this.setState({ symptomList: [] });

		// Get a list of symptoms related to selected disorder
		const { params } = this.props.navigation.state;

		function _onSuccess(res) {
			let newList = res.map(function(item) {
				item.selected = false;
				return item;
			});

			this.setState({ symptomList: newList });
		}

		Phenotype.assocWithDisease(
			params.selectedDisease.omim_id, _onSuccess.bind(this)
		);
  }

	_onSymptomToggleSelect(item, index) {
		// Toggle selected flag
		let newList = this.state.symptomList.slice(0);
		newList[index].selected = !item.selected;

		this.setState({ symptomList: newList });
	}

	_onSymptomsToggleAll() {
		const selectAll = this.state.selectAll;

		let newList = this.state.symptomList.map(function(item) {
			item.selected = !selectAll;
			return item;
		});

		this.setState({
			symptomList: newList,
			selectAll: !selectAll
		});
	}

	_onSymptomsAdd() {
		let selectedSymptoms = this.state.symptomList.filter(function(item) {
			return item.selected === true
		});

		if (selectedSymptoms.length === 0) {
			// Alert user to select a symptom
			Alert.alert(
				'No symptoms selected',
				'Please select a symptom from the list',
				[
					{text: 'OK'}
				],
				{cancelable: false}
			)
		} else {
			const { params } = this.props.navigation.state;

			// Record suspected diagnosis
			params.onDiseaseSelect(params.selectedDisease);

			// Add to phenotype list
			params.onPhenotypeSelect(selectedSymptoms);

			// Dismiss modal
			this.props.screenProps.dismiss();
		}

	}

	_renderList({item, index}) {
		return (
		  <GenericListViewItem
		  	simpleIcon={{
		  		iconName: 'check-circle-o',
		  		iconSize: 24,
		  		color: '#B0BEC5',
		  		selectedColor: '#FFA726'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onPressItem={this.onSymptomToggleSelect}
		  	selectable={true}
		  	selected={item.selected} />
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<Text style={styles.instruction}>
		  		Below are key symptoms of suspected diagnosis.
		  		Select matching symptoms from the list.
		  		Press the "Add selected symptoms" button upon
		  		completing the selection.
		  	</Text>

		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.symptomList}
				  	renderItem={this.renderList}
    		  	keyExtractor={ (item, index) => {return index} } />
				</ScrollView>

			  <View style={styles.buttonContainer}>
					<Button
						onPress={this.onSymptomsToggleAll}
						title={this.state.selectAll ? 'Deselect all symptoms' : 'Select all symptoms'} />
				</View>

			  <View style={styles.buttonContainer}>
					<Button
						onPress={this.onSymptomsAdd}
						title='Add selected symptoms' />
				</View>
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
  buttonContainer: {
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
  header: {
    paddingRight: (Platform.OS === 'android' ? 5 : 0),
    paddingLeft: (Platform.OS === 'android' ? 5 : 0)
  }
});

module.exports = RefineSymptomsScreen;
