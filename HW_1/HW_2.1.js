//Вариант 1

;(function() {

	var items = [];

	function trash() {
	}

	function addItem(item) {
		items.push(item);
	}
	
	function getItem(ind) {
		return items[ind];
	}

	function clear(){
		items.splice(0, items.length )
	}

	trash.addItem = addItem;
	trash.getItem = getItem;
	trash.clear = clear;


	window.trash = trash;

}());

//Вариант 2

var trash = (function() {

	var items = [];

	function addItem(item) {
		items.push(item);
	}
	
	function getItem(ind) {
		return items[ind];
	}

	function clear(){
		items.splice(0, items.length )
	}
  
	return {
		addItem: addItem,
		getItem: getItem,
		clear: clear,
	}
})();