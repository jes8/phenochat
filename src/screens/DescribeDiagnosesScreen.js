import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList
} from 'react-native';

import OmniBox from '../shared/OmniBox';
import GenericListViewItem from '../shared/GenericListViewItem';

import Disease from '../models/Disease';

class DescribeDiagnosesScreen extends Component {
	// For dismissing modal. Not an ideal solution but works for now
	// https://github.com/react-community/react-navigation/issues/686
  componentDidMount() {
    this.props.navigation.setParams({dismiss: this.props.screenProps.dismiss});
  }

	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe diagnoses',
		headerRight: <Button
			onPress={() => {navigation.state.params.dismiss()}}
  		title='Close'
			color={screenProps.tintColor} />
	});

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			diseaseList: []
		};

		this.onSearch = this._onSearch.bind(this);
		this.onDiagnosisSelect = this._onDiagnosisSelect.bind(this);
		this.setRef = this._setRef.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onSearch(queryText) {
		function _onAutocomplete(res) {
			this.setState({
				diseaseList: res
			})
		}

		Disease.autocomplete(queryText, _onAutocomplete.bind(this));
	}

	_onDiagnosisSelect(item, index) {
		// Clear select box
		this._omniBox.clear();

		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;

		navigate('RefineSymptoms', {
			selectedDisease: item,
			onPhenotypeSelected: params.onPhenotypeSelected
		});
	}

	_setRef(component) {
		this._omniBox = component;
	}

	_renderList({item, index}) {
		return(
		  <GenericListViewItem
		  	simpleIcon={{
		  		iconName: 'chevron-right',
		  		color: '#5C6BC0'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onPressItem={this.onDiagnosisSelect} />
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<Text>
		  		Describe suspected diagnoses and select from their key symptoms
		  	</Text>
		  	<OmniBox
      		setRef={this.setRef}
      		placeholderText='Search for diseases'
      		onSearch={this.onSearch} />
		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.diseaseList}
				  	renderItem={this.renderList}
    		  	keyExtractor={ (item, index) => {return index} } />
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

module.exports = DescribeDiagnosesScreen;
