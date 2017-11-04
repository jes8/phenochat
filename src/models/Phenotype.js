import DataHelper from './DataHelper';

class Phenotype {
	/**
	 * Make an autocomplete query to sqlite
	 * @param  {string} phenoName - phenotype name to make an autocomplete request
	 * @param  {successCallback} successCB - must take results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	static autocomplete(phenoName, successCB, errorCB) {
		let helper = new DataHelper;
		helper.autocomplete(
			['phenotypes', 'phenotype_synonyms'],
			'hpo_id, name',
			phenoName, successCB, errorCB);
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