import SQLite from 'react-native-sqlite-storage';

class DiseaseModel {
	constructor (name, omimId) {
		this.name = name;
		this.omimId = omimId;
	}
}

module.exports = DiseaseModel;