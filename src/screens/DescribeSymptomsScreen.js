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

import Phenotype from '../models/Phenotype';

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
			symptomList: []
		};

		this.onSearch = this._onSearch.bind(this);
		this.onSymptomAdd = this._onSymptomAdd.bind(this);
		this.setRef = this._setRef.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onSearch(queryText) {
		function _onAutocomplete(res) {
			this.setState({ symptomList: res });
		}

		Phenotype.autocomplete(queryText, _onAutocomplete.bind(this));
	}

	_onSymptomAdd(item, index) {
		const { params } = this.props.navigation.state;
		params.onPhenotypeSelected(item);
		this._omniBox.clear();
	}

	_setRef(component) {
		this._omniBox = component;
	}

	_renderList ({item, index}) {
		return (
		  <GenericListViewItem
		  	actionBtn={{
		  		iconName: 'plus',
		  		color: '#009688',
		  		label: 'Add'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onPressButton={this.onSymptomAdd} />
		)
	}

	render() {
		return (
      <View style={styles.container}>
      	<Text>
      		Describe individual symptoms
      	</Text>
      	<OmniBox
      		setRef={this.setRef}
      		placeholderText='Search for symptoms'
      		onSearch={this.onSearch} />
      	<ScrollView style={styles.listContainer}>
    		  <FlatList
    		  	data={this.state.symptomList}
    		  	renderItem={this.renderList}
    		  	keyExtractor={ (item, index) => {return index} } />
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
