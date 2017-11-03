import DataHelper from './DataHelper';

class Phenotype {
	constructor() {
		this.dataHelper = new DataHelper;
		this.phenotypes = [];
	}

	/**
	 * Make an autocomplete query to sqlite
	 * @param  {string} phenoName - name to make an autocomplete request
	 * @param  {successCallback} successCB - must take tx and results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	autocomplete(phenoName, successCB, errorCB) {
		var result = [];

		// Table to query
		let tablesToQuery = ['phenotypes', 'phenotype_synonyms'];

		// Run multiple queries
		// https://github.com/andpor/react-native-sqlite-storage/issues/166
		Promise.all(tablesToQuery.map((tableName, index) => {
			return new Promise ((resolve, reject) => {
				// Assemble where query
				// https://stackoverflow.com/questions/15480319/case-sensitive-and-insensitive-like-in-sqlite
				let whereQuery = 'UPPER(name) like \'%' + phenoName.toUpperCase() + '%\'';

				// Assemble full query
				let fullQuery = 'SELECT hpo_id, name FROM ' + tableName + ' WHERE ' + whereQuery + ' ORDER BY name ASC LIMIT 12';

				// Query phenotypes
				this.dataHelper.query(
					fullQuery,
					(tx, results) => {
			      console.log("Query completed");

			      // Get rows with Web SQL Database spec compliance.
			      var len = results.rows.length;
			      for (let i = 0; i < len; i++) {
			        let row = results.rows.item(i);
			        // Add to result
			        result.push(row);
			      }
			      resolve();
					}, (err) => {
						console.log('query error:', err);
						reject();
					});
			});
		})).then(() => {
	    console.log('Phenotype name: ', result);
			if(successCB) successCB(result);
		}).catch(() => {
			if(errorCB) errorCB();
		});
	}

	/**
	 * Return list of phenotypes 
	 * @param  {[type]} disName [description]
	 * @return {[type]}         [description]
	 */
	assocWithDisease(disName) {

	}
}

module.exports = Phenotype;