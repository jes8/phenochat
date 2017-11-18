import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	Text,
	View,
	ScrollView,
	FlatList,
	Clipboard,
	Alert,
	Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import GenericListViewItem from '../shared/GenericListViewItem';

import Phenotype from '../models/Phenotype';

class DiseaseDetailScreen extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Disease information',
		headerLeft: <Button
			onPress={() => {navigation.goBack()}}
  		title='Back' />
	});

	constructor(props) {
		super(props);

		const { params } = this.props.navigation.state;
		this.state = {
			disease: params.selected
		};

		this.goToOMIM = this._goToOMIM.bind(this);
		this.renderList = this._renderList.bind(this);
	}

  componentWillMount() {
  	// Set default
		this.setState({ symptomList: [] });

		// Get a list of symptoms related to selected disorder
		const { params } = this.props.navigation.state;

		function _onSuccess(res) {
			this.setState({ symptomList: res });
		}

		Phenotype.assocWithDisease(
			params.selected.omim_id, _onSuccess.bind(this)
		);
  }

  _goToOMIM() {
  	let url = 'http://omim.org/entry/' + this.state.disease.omim_id;

		const errorMsg =
			'Unfortunately, we could not access the web browser on your device.\n' +
			'We suggest clicking on \'Copy to clipboard\' button below to manually ' +
			'paste the URL to your browser app.';

		function errorHandler(err) {
			Alert.alert(
				'Error',
				errorMsg,
				[
					{text: 'Copy to clipboard', onPress: () => Clipboard.setString(url)},
					{text: 'Close'}
				],
				{ cancelable: false }
			);
		}

  	return Linking.openURL(url).catch(errorHandler);
  }

	_renderList({item, index}) {
		return (
		  <Text>
		  	{item.name}
		  </Text>
		)
	}

	render() {
		return (
		  <View style={styles.container}>
		  	<ScrollView style={styles.listContainer}>
				  <Text style={styles.titleText}>Name</Text>
				  <Text style={styles.bodyText}>
				  	{this.state.disease.name}
				  </Text>

				  <Text style={styles.titleText}>MIM number</Text>
				  <View style={styles.omimWrapper}>
					  <Text style={styles.omimText}>
					  	{this.state.disease.omim_id}
					  </Text>
						<Icon.Button
		          name={'share'}
		          backgroundColor={'#4CAF50'}
		          size={14}
		          onPress={this.goToOMIM}>
		          Go to OMIM
		        </Icon.Button>
		      </View>

			  	<Text style={styles.titleText}>Symptoms</Text>
				  <FlatList
				  	data={this.state.symptomList}
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
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
  	width: '100%',
  	flex: 1,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  bodyText: {
    paddingBottom: 20,
  },
  omimWrapper: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	paddingBottom: 20
  },
  omimText: {
  	marginRight: 20,
  }
});

module.exports = DiseaseDetailScreen;