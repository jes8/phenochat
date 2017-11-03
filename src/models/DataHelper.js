import { Platform } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

/**
 * SQLite helper
 */
class DataHelper {
	constructor() {
		console.log("hello");

		// Set db options
		// Path based on https://github.com/andpor/react-native-sqlite-storage/issues/184
		var opts;
		if (Platform.OS == "ios") {
			opts = {
				name: 'phenochat',
				readOnly: true,
				createFromLocation: '~www/phenochat.sqlite3'
			};
		} else {
			opts = {
				name: 'main',
				readOnly: true,
				createFromLocation : "~www/phenochat.sqlite3"
			};
		}

		function _successCB() {
			console.log("DB open");
		}

		function _errorCB(err) {
			console.log("SQL error: ", err);
		}

		// Open db
		this.db = SQLite.openDatabase(opts, _successCB, _errorCB);
	}

	/**
	 * Query sqlite db
	 * @param  {string} sqlStatement - string sql statement
	 * @param  {successCallback} successCB - must take tx and results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	query(sqlStatement, successCB, errorCB) {
		this.db.transaction((tx) => {
			tx.executeSql(sqlStatement, [], successCB, errorCB);
		}, (err) => {
			console.log('transaction error: ', err);
		});
	}
}

module.exports = DataHelper;
