import _ from 'underscore';

/**
 * Utility functions
 */
class Util {
	/**
	 * Add items of inputList to list as well as sort it by name
	 * @param {[]} list - list to add the givem item
	 * @param {[]} inputList - list with items to add to list
	 * @param {accessorCallback} keyAccessor - mmethod that returns key
	 */
	static addListToList(list, inputList, keyAccessor = (item) => item.key) {
		// Make a copy of the list
		let newList = list.slice();

		// Add given list
		newList.push(...inputList);

		// Select only unique items
		newList = _.uniq(newList, false, function(el){ return keyAccessor(el) });

		// Sort alphabetically
		return _.sortBy(newList, 'name');
	}

	/**
	 * Add item to list as well as sort it by name
	 * @param {[]} list - list to add the givem item
	 * @param {Object} item - item to add to list
	 */
	static addItemToList(list, item, keyAccessor = (item) => item.key) {
		// Make a copy of the list
		let newList = list.slice();

		// Add item only if it's unique
		if(newList.findIndex((el) => {
				return keyAccessor(el) == keyAccessor(item)
			}) === -1) {
			newList.push(item);
		}

		// Sort alphabetically
		return _.sortBy(newList, 'name');
	}

	/**
	 * Remove item from list
	 * @param {[]} list - list to add the givem item
	 * @param {Object} item - item to add to list
	 * @param {number} itemIndex - index of item to be removed
	 */
	static removeItemFromList(
		list, item, itemIndex, keyAccessor = (item) => item.key
	){
		// Make a copy of the list
		let newList = list.slice();

		if (itemIndex === undefined) {
			let toRemoveIndex = newList.findIndex((el) => {
				return keyAccessor(el) == keyAccessor(item)
			});

			if (toRemoveIndex !== -1){
				newList.splice(toRemoveIndex, 1);
			}
		} else {
			// Make sure it's the correct item we're removing
			let toRemove = list[itemIndex];

			if (newList.length > 0 && keyAccessor(toRemove) === keyAccessor(item)) {
				newList.splice(itemIndex, 1);
			}
		}

		return newList;
	}
}

module.exports = Util;
