import DataHelper from './DataHelper';

class Phenotype {
	/**
	 * Make an autocomplete query to sqlite
	 * @param  {string} phenoName - phenotype name to make an autocomplete request
	 * @param  {successCallback} successCB - must take results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 * @param  {string[]} excludeHpoIds - (Optional) hpo ids to exclude
	 */
	static autocomplete(phenoName, successCB, errorCB, excludeHpoIds) {
		// If exclude ids are provided, construct exclude query
		let excludeQuery;
		if (excludeHpoIds !== undefined && excludeHpoIds.length > 0) {
			let excludeIds = excludeHpoIds.map((item) => "'" + item + "'");
			excludeQuery = 'AND hpo_id NOT IN (' + excludeIds.join(', ') + ') ';
		}

		let helper = new DataHelper;
		helper.autocomplete(
			{
				tables: ['phenotypes', 'phenotype_synonyms'],
				colNames: 'hpo_id, name',
				queryText: phenoName,
				excludeQuery: excludeQuery
			}, successCB, errorCB
		);
	}

	/**
	 * Return list of phenotypes for given disease
	 * @param  {string} omimId - OMIM id of disease to search
	 * @param  {successCallback} successCB - must take results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	static assocWithDisease(omimId, successCB, errorCB) {
		// Check omim ID
		let validOmim = /^\d{6}$/;
		if (validOmim.test(omimId)){
			// Form a query
			let query =
				'SELECT "phenotypes"."hpo_id", "phenotypes"."name" FROM "phenotypes"' +
				'INNER JOIN "disease_specs" ON "phenotypes"."id" = "disease_specs"."phenotype_id"' +
				'INNER JOIN "diseases" ON "disease_specs"."disease_id" = "diseases"."id"' +
				'WHERE "diseases"."omim_id" = "' + omimId + '" ORDER BY "phenotypes"."name" ASC';

			// Run a query
			let helper = new DataHelper;
			helper.query(query, successCB, errorCB);
		}
	}

}

module.exports = Phenotype;