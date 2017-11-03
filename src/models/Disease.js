import SQLite from 'react-native-sqlite-storage';

class Disease {
	constructor (name, omimId) {
		this.name = name;
		this.omimId = omimId;
	}
}

module.exports = Disease;