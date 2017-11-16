import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import GenericListViewItem from '../shared/GenericListViewItem';

// Temporary list
let dataList = [{key: 'D1', name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
					  		{key: 'D2', name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
					  		{key: 'D3', name: 'cccccccccccccccccccc'},
					  		{key: 'D4', name: 'dddddddddddddddddddddddddddddddddddddddd'},
					  		{key: 'D5', name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}];


class RefineSymptomsScreen extends Component {
	// For dismissing modal. Not an ideal solution but works for now
	// https://github.com/react-community/react-navigation/issues/686
	componentDidMount() {
		console.log(this.props.navigation.state);
    this.props.navigation.setParams({dismiss: this.props.navigation.dismiss});
  }

	static navigationOptions = ({navigation, screenProps}) => ({
		title: 'Select key symptoms',
		headerRight: <Button
			onPress={() => { navigation.state.params.dismiss() }}
  		title="Close"
			color={screenProps.tintColor} />
	});

	constructor(props) {
		super(props);

		// Set state
		this.state = {
			symptomList: dataList.map(function(item){
				item.selected = false;
				return item;
			}),
		};

		this.onSymptomToggleSelect = this._onSymptomToggleSelect.bind(this);
		this.onSymptomsSelectAll = this._onSymptomsSelectAll.bind(this);
		this.onSymptomsAdd = this._onSymptomsAdd.bind(this);
		this.renderList = this._renderList.bind(this);
	}

	_onSymptomToggleSelect(item, index) {
		// Toggle selected flag
		let newList = this.state.symptomList.slice();

		// If item is selcted deselect item
		if (item.selected === true) {
			newList[index].selected = false;
		} else {
			newList[index].selected = true;
		}

		this.setState({
			symptomList: newList
		});
	}

	_onSymptomsSelectAll() {
		let newList = this.state.symptomList.map(function(item){
			item.selected = true;
			return item;
		});

		this.setState({
			symptomList: newList
		});
	}

	_onSymptomsAdd() {
		const { params } = this.props.navigation.state;
		console.log(params);
		params.onPhenotypeSelected(
			this.state.symptomList.filter(function(item){
				return item.selected === true
			})
		);
	}

	_renderList ({item, index}) {
		return(
		  <GenericListViewItem
		  	simpleIcon={{
		  		iconName: 'check',
		  		color: '#B0BEC5',
		  		selectedColor: '#5C6BC0'
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
		  	<Text>
		  		Below are key symptoms of suspected diagnosis.
		  		Select matching symptoms from the list.
		  		Press the "Add selected symptoms" button upon completing the selection.
		  	</Text>
		  	<ScrollView style={styles.listContainer}>
				  <FlatList
				  	data={this.state.symptomList}
				  	renderItem={this.renderList}
				  />
				</ScrollView>
				<Button
					onPress={this.onSymptomsSelectAll}
					title='Select all symptoms'
					color='#FFFFFF' />
				<Button
					onPress={this.onSymptomsAdd}
					title='Add selected symptoms'
					color='#FFFFFF' />
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

module.exports = RefineSymptomsScreen;
