import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList,
	Platform
} from 'react-native';

import OmniBox from '../shared/OmniBox';
import GenericListViewItem from '../shared/GenericListViewItem';

import Phenotype from '../models/Phenotype';

class DescribeSymptomsScreen extends Component {
	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Describe symptoms',
		headerRight: <Button
			onPress= {() => navigation.goBack()}
  		title='Close'
			color={screenProps.tintColor} />,
		headerStyle: styles.header
	});

	constructor(props) {
		super(props);

		this.state = {
			symptomList: [],
			added: {}
		};

		this.onSearch = this._onSearch.bind(this);
		this.onSymptomAdd = this._onSymptomAdd.bind(this);
		this.setOmniBoxRef = this._setOmniBoxRef.bind(this);
		this.setScrollViewRef = this._setScrollViewRef.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onSearch(queryText) {
		function _onAutocomplete(res) {
			let newList = res.map(function(item) {
				item.added = false;
				return item;
			});

			this.setState({ symptomList: newList });
			this._scrollView.scrollTo({x: 0, y: 0, animated: false});
		}

		Phenotype.autocomplete(queryText, _onAutocomplete.bind(this),
			undefined, Object.keys(this.state.added));
	}

	_onSymptomAdd(item, index) {
		if (item.added === false) {
			// Update local list
			let newList = this.state.symptomList.slice();
			newList.splice(index, 1);

			let newlyAdded = {...this.state.added};
			newlyAdded[item.hpo_id] = true;

			this.setState({
				symptomList: newList,
				added: newlyAdded
			})

			// Add to overall list
			const { params } = this.props.navigation.state;
			params.onPhenotypeSelect(item);

			// Clear search box
			this._omniBox.clear();
		}
	}

	_setOmniBoxRef(component) {
		this._omniBox = component;
	}

	_setScrollViewRef(component) {
		this._scrollView = component;
	}

	_renderList({item, index}) {
		return (
		  <GenericListViewItem
		  	actionBtn={{
		  		iconName: 'plus',
		  		color: '#009688',
		  		label: 'Add',
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
      		setRef={this.setOmniBoxRef}
      		placeholderText='Search for symptoms'
      		onSearch={this.onSearch} />
      	<ScrollView
      		style={styles.listContainer}
      		ref={this.setScrollViewRef}>
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
  header: {
    paddingRight: (Platform.OS === 'android' ? 5 : 0),
    paddingLeft: (Platform.OS === 'android' ? 5 : 0)
  }
});

module.exports = DescribeSymptomsScreen;
