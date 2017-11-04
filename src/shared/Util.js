/**
 * Utility functions
 */
class Util {
	/**
	 * Add item to list as well as sort it by name
	 * @param {[]} list - list to add the givem item
	 * @param {Object} item - item to add to list
	 */
	static addItemToList(list, item) {
		// Make a copy of the list
		let newList = list.slice();

		// Add item
		newList.push(item);

		// Sort alphabetically
		return newList.sort(function(a, b) {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			return 0;
		});
	}

	/**
	 * Remove item from list
	 * @param {[]} list - list to add the givem item
	 * @param {Object} item - item to add to list
	 * @param {number} itemIndex - index of item to be removed
	 */
	static removeItemFromList(list, item, itemIndex){
		// Make a copy of the list
		let newList = list.slice();

		// Make sure it's the correct item we're removing
		let toRemove = list[itemIndex];

		if (newList.length > 0 && toRemove.key === item.key) {
			newList.splice(itemIndex, 1);
		}

		return newList;
	}
}

module.exports = Util;
