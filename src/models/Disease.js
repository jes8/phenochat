import DataHelper from './DataHelper';

class Disease {
	/**
	 * Make an autocomplete query to sqlite
	 * @param  {string} disName - disease name to make an autocomplete request
	 * @param  {successCallback} successCB - must take results as parameters
	 * @param  {errorCallback} errorCB - must take error as parameter
	 */
	static autocomplete(disName, successCB, errorCB) {
		let helper = new DataHelper;
		helper.autocomplete(
			['diseases', 'disease_synonyms'],
			'omim_id, name',
			disName, successCB, errorCB);
	}

}

module.exports = Disease;