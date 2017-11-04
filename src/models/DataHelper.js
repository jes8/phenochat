import { Platform } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

/**
 * SQLite helper
 */
class DataHelper {
	constructor() {
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
	 * Alphabetically sort array
	 * @param  {[]} array - any array
	 */
	_alphaSort(array) {
		return array.sort((a, b) => {
    	var nameA = a.name.toLowerCase();
    	var nameB = b.name.toLowerCase();

    	if (nameA < nameB) return -1;
    	if (nameA > nameB) return 1;
    	return 0;
    });
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

	/**
	 * Make an autocomplete query to sqlite db
	 * @param  {string[]} tablesToQuery - name of tables to query
	 * @param  {string} colNames - names of columns to grab
	 * @param  {string} queryText - name to make an autocomplete request
	 * @param  {successCallback} successCB - must take tx and results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	autocomplete(tablesToQuery, colNames, queryText, successCB, errorCB) {
		var result = [];

		// Run multiple queries
		// https://github.com/andpor/react-native-sqlite-storage/issues/166
		Promise.all(tablesToQuery.map((tableName, index) => {
			// Wrap in promise so that call back doesn't execute right away
			return new Promise ((resolve, reject) => {
				// Assemble where query
				// https://stackoverflow.com/questions/15480319/case-sensitive-and-insensitive-like-in-sqlite
				let whereQuery =
					'UPPER(name) like \'%' + queryText.toUpperCase() + '%\'';

				// Assemble full query
				let fullQuery =
					'SELECT ' + colNames + ' FROM ' + tableName +
					' WHERE ' + whereQuery + ' ORDER BY name ASC LIMIT 12';

				// Query DB
				this.query(fullQuery, (tx, results) => {
		      console.log("Autocomplete completed");

	        // Add row to result
		      var len = results.rows.length;
		      for (let i = 0; i < len; i++) {
		        let row = results.rows.item(i);
		        result.push(row);
		      }
		      resolve();
				}, (err) => {
					console.log('Autocomplete error:', err);
					reject();
				});
			});

		})).then(() => {
	    console.log('Autocomplete result: ', result);

	    // Sort result alphabetically
			if(successCB) successCB(this._alphaSort(result));
		}).catch(() => {
			if(errorCB) errorCB();
		});
	}
}

module.exports = DataHelper;
