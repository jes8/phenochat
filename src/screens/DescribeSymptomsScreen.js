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
import Util from '../shared/Util';

import Phenotype from '../models/Phenotype';

class DescribeSymptomsScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe symptoms',
		headerRight: <Button
			onPress= {() => navigation.goBack()}
  		title="Close"
			color={screenProps.tintColor} />
	});

  // componentWillMount() {
  //   this.setState({
  //     queryText: ''
  //   });
  // }

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			queryText: '',
			symptomList: []
		};

		this.onAutocomplete = this._onAutocomplete.bind(this);
		this.clearText = this._clearText.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onAutocomplete(res) {
		this.setState({
			symptomList: res
		});
	}

	_clearText() {
		this.setState({queryText: ''});
	}

	_renderList ({item, index}) {
		const { params } = this.props.navigation.state;

		return (
		  <GenericListViewItem
		  	button={{
		  		iconName: 'plus',
		  		color: '#009688',
		  		label: 'Add'
		  	}}
		  	data={item}
		  	dataIndex={index}
		  	onButtonPress={(item, index) => {
		  		params.onPhenotypeSelected(item);
		  		this.clearText();
		  	}} />
		)
	}

	render() {
		return (
      <View style={styles.container}>
      	<Text>
      		Describe individual symptoms
      	</Text>
      	<OmniBox
      		newValue={this.state.queryText}
      		onSearch={(queryText) => {
			  		this.setState({queryText: queryText});
      			Phenotype.autocomplete(queryText, this.onAutocomplete)
      		}} />
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
