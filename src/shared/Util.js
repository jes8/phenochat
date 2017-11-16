import _ from 'underscore';

/**
 * Utility functions
 */
class Util {
	/**
	 * Add items of inputList to list as well as sort it by name
	 * @param {[]} list - list to add the givem item
	 * @param {[]} inputList - list with items to add to list
	 */
	static addListToList(list, inputList) {
		// Make a copy of the list
		let newList = list.slice();

		// Add given list
		newList.push(...inputList);

		// Select only unique items
		newList = _.uniq(newList, false, function(el){ return el.key });

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
	 * Add item to list as well as sort it by name
	 * @param {[]} list - list to add the givem item
	 * @param {Object} item - item to add to list
	 */
	static addItemToList(list, item) {
		// Make a copy of the list
		let newList = list.slice();

		// Add item only if it's unique
		if(newList.findIndex((el) => { return el.key == item.key }) === -1) {
			newList.push(item);
		}

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

		if (itemIndex === undefined) {
			let toRemoveIndex = newList.findIndex((el) => { return el.key == item.key });
			if (toRemoveIndex !== -1){
				newList.splice(toRemoveIndex, 1);
			}
		} else {
			// Make sure it's the correct item we're removing
			let toRemove = list[itemIndex];

			if (newList.length > 0 && toRemove.key === item.key) {
				newList.splice(itemIndex, 1);
			}
		}

		return newList;
	}
}

module.exports = Util;
