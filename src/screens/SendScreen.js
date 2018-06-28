import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Button,
	View,
	Clipboard,
	Alert,
	Linking,
} from 'react-native';

class SendScreen extends Component {
	static navigationOptions = {
		title: 'Send phenotypes'
	};

	constructor(props) {
		super(props);

		// Get phenotypes
		const { params } = this.props.navigation.state;
		this.state = {
			phenotypeList: params.phenotypeList,
			diseaseList: params.diseaseList
		};

		this.onCopyToClipboard = this._onCopyToClipboard.bind(this);
		this.onEmail = this._onEmail.bind(this);
	}

	_formatText() {
		// Format phenotypeList
		let phenotypeText =
			this.state.phenotypeList.map((item) => item.hpo_id + ',' + item.name);

		// Format diseaseList
		let diseaseText =
			this.state.diseaseList.map((item) => item.omim_id + ',' + item.name);

		// All text
		let text =
			'##phenochat_description\n' +
			'##phenotypes\n##format=hpo_id,hpo_name\n' +
			phenotypeText.join('\n') + '\n' +
			'##suspected_diagnoses\n##format=MIM_number,OMIM_name\n' +
			diseaseText.join('\n') + '\n';

		return text;
	}

	_onEmail() {
		// Trigger mail application via mailto URL
		// https://stackoverflow.com/questions/44221417/launch-mail-app-with-react-native-android
		// https://stackoverflow.com/questions/42098235/trying-to-add-mailto-react-native
		// Compose to mailto URL
		let subject = encodeURIComponent('[PhenoChat] Phenotype description');
		let body = encodeURIComponent(this._formatText());
		const url = 'mailto:?subject=' + subject + '&body=' + body;

		const errorMsg =
			'Unfortunately, we could not access the email application on ' +
			'your device.\n' +
			'We suggest using \'Copy to clipboard\' function to manually paste ' +
			'the description into email app.';

		function errorHandler(err) {
			Alert.alert('Error', errorMsg, [ {text: 'OK'} ], { cancelable: false });
		}

		// Note mailto doesn't work on Simulator
		return Linking.canOpenURL(url).then(supported => {
		  if (!supported) {
				errorHandler();
		  } else {
		    Linking.openURL(url).catch(errorHandler);
		  }
		}).catch(errorHandler);
	}

	_onCopyToClipboard() {
		Clipboard.setString(this._formatText());

		Alert.alert(
			'Alert',
			'Copied to clipboard!',
		  [ {text: 'OK'} ],
		  { cancelable: false }
		);
	}

	render() {
		return (
      <View style={styles.container}>
		  	<Text style={styles.instruction}>
      		Choose an option below to send phenotype and suspected diagnosis
      		description. You can also choose 'Copy to clipboard' and paste
      		the description on other messaging apps.
      	</Text>

			  <View style={styles.buttonContainer}>
			  	<Button
			  		onPress={this.onEmail}
			  		title='Email description'
			  		accessibilityLabel='Email description' />
			  </View>

			  <View style={styles.buttonContainer}>
			  	<Button
			  		onPress={this.onCopyToClipboard}
			  		title='Copy to clipboard'
			  		accessibilityLabel='Copy description to clipboard' />
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
  buttonContainer: {
  	marginTop: 5,
  	marginBottom: 5,
  	backgroundColor: '#FFFFFF',
  },
});

module.exports = SendScreen;
