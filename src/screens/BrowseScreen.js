import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList
} from 'react-native';

import OmniBox from '../shared/OmniBox';
import GenericListViewItem from '../shared/GenericListViewItem';

import Disease from '../models/Disease';

class BrowseScreen extends Component {
	static navigationOptions = {
		title: 'Browse diseases'
	};

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			diseaseList: []
		};

		this.onSearch = this._onSearch.bind(this);
		this.onSelect = this._onSelect.bind(this);
		this.setScrollViewRef = this._setScrollViewRef.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onSearch(queryText) {
		function _onAutocomplete(res) {
			this.setState({ diseaseList: res });
			this._scrollView.scrollTo({x: 0, y: 0, animated: false});
		}

		Disease.autocomplete(queryText, _onAutocomplete.bind(this));
	}

	_onSelect(item, index) {
		const { navigate } = this.props.navigation;

		// Navigate to next screen
		navigate('Detail', {
			selected: item
		});
	}

	_setScrollViewRef(component) {
		this._scrollView = component;
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
		  	onPressItem={this.onSelect} />
		)
	}

	render() {
		return (
      <View style={styles.container}>
		  	<Text>
		  		This page provides basic disease information
		  	</Text>
		  	<OmniBox
      		placeholderText='Look up disease information'
      		onSearch={this.onSearch} />
		  	<ScrollView
		  		style={styles.listContainer}
      		ref={this.setScrollViewRef}>
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

module.exports = BrowseScreen;
