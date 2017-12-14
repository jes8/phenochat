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
	 * @return {[]} alphabetically sorted array
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
   * Return where in str that query starts
	 * @param  {String} query - query text to search for
	 * @param  {String} str - any string
	 * @return {Number} index of where query starts in str
   */
  _startsWith(query, str) {
    // Escape special characters; $& means the whole matched string
    const newQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const queryRe = new RegExp('\\b' + newQuery + '\\b', 'i');
    const res = queryRe.exec(str);
    return res !== null ? res.index : Number.MAX_VALUE;
  };

	/**
	 * Sort by where the query starts in the string
	 * @param  {[]} query - query text to fuzzy sort by
	 * @param  {[]} array - any array
	 * @return {[]} start sorted array
	 */
  _startSort(query, array) {
  	let startsWith = this._startsWith;
		return array.sort((a, b) => {
    	var nameA = startsWith(query, a.name);
    	var nameB = startsWith(query, b.name);

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
			tx.executeSql(sqlStatement, [], (tx, results) => {
				console.log('query success');
				var res = [];

        // Add row to result
	      var len = results.rows.length;
	      for (let i = 0; i < len; i++) {
	        let row = results.rows.item(i);
	        res.push(row);
	      }

	      // Call success callback
				if(successCB !== undefined) successCB(res);
			}, (err) => {
				console.log('query error: ', err);

	      // Call error callback
	      if(errorCB !== undefined) errorCB();
			});
		}, (err) => {
			console.log('transaction error: ', err);
		});
	}

	/**
	 * Make an autocomplete query to sqlite db
	 * @param  {Object} queryProps - query properties (tables: name of tables to query; colNames: names of columns to grab; queryText: name to make an autocomplete request)
	 * @param  {successCallback} successCB - must take tx and results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	autocomplete(queryProps, successCB, errorCB) {
		var result = [];

		// Run multiple queries
		// https://github.com/andpor/react-native-sqlite-storage/issues/166
		Promise.all(queryProps.tables.map((tableName, index) => {
			// Wrap in promise so that call back doesn't execute right away
			return new Promise ((resolve, reject) => {
				// Assemble where query
				// https://stackoverflow.com/questions/15480319/case-sensitive-and-insensitive-like-in-sqlite
				let whereQuery =
					'UPPER(name) like \'%' + queryProps.queryText.toUpperCase() + '%\'';

				// Assemble exclude query if provided
				let excludeQuery = queryProps.excludeQuery || '';

				// Assemble full query
				let fullQuery =
					'SELECT ' + queryProps.colNames + ' FROM ' + tableName +
					' WHERE ' + whereQuery + excludeQuery + ' ORDER BY name ASC LIMIT 12';

				// Query DB
				this.query(fullQuery, (res) => {
		      result.push(...res);
		      resolve();
				}, (err) => { reject(); });
			});

		})).then(() => {
	    // Sort result alphabetically and call success callback
			// if(successCB !== undefined) successCB(this._alphaSort(result));

			// Fuzzy sort results and call success callback
			if(successCB !== undefined)
				successCB(this._startSort(queryProps.queryText, result));
		}).catch(() => {
	    // Call error callback
			if(errorCB !== undefined) errorCB();
		});
	}
}

module.exports = DataHelper;
