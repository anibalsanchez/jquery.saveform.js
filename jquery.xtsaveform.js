/**
 * jquery.xtsaveform.js 1.0.0 - https://github.com/anibalsanchez/jquery.saveform.js
 * Saves automatically all entered form fields, to restore them in the next visit.
 * 
 * Copyright (c) 2013 Anibal Sanchez (http://www.extly.com) Licensed under the MIT
 * license (http://www.opensource.org/licenses/mit-license.php). 2013/05/04
 * 
 * Based on the original work of Yannick Albert (http://yckart.com)
 * jquery.saveform.js 0.0.1 - https://github.com/yckart/jquery.saveform.js
 */

;(function($, window) {
	
	// prefix - inorder to seperate the fields of different forms
	$.fn.xtautosave = function(prefix) {
		var storage = window.localStorage, $this = this;

		if (typeof prefix === 'undefined') {
			prefix = $this.attr('id') || $this.attr('name') || 'no-Id-Or-Name-Given';
		}

		prefix += "_"; // _ this will give unique names and will not clash with
		// other fields
		
		getKey = function(index) {
			return prefix + index;
		};
		
		getSelectKey = function(index) {
			return 'S' + prefix + index;
		};		

		saveInput = function(elem, index) {
			var value, key = getKey(index);
			
			if ((elem.attr('type') === 'checkbox') || (elem.attr('type') === 'radio')) {
				value = elem.prop('checked');
			} else {
				value = elem.val();
			}
			
			if ((value) && (value !== '')) {
				storage.setItem(key, value);			
			}
			else {
				storage.removeItem(key);
			}
		};
		
		saveSelect = function(elem, index) {
			var value = elem.val(), key = getSelectKey(index);
			
			if ((value) && (value !== '')) {
				storage.setItem(key, value);			
			}
			else {
				storage.removeItem(key);
			}			
		};
		
		function save() {
			$this.find('input:not([type=password],[type=submit],[type=hidden])').each(
					function(index) {
						saveInput($(this), index);
					});
			$this.find('select').each(
					function(index) {
						saveSelect($(this), index);
					});			
		};
		
		restoreInput = function(elem, index) {
			var value = storage.getItem(getKey(index));
			
			if (!value) {
				return;
			}
			
			if ((elem.attr('type') === 'checkbox') || (elem.attr('type') === 'radio')) {
				elem.prop('checked', value);
			} else {
				elem.val(value);
			}		
		};

		restoreSelect = function(elem, index) {
			var value = storage.getItem(getSelectKey(index));
			
			if (!value) {
				return;
			}
			// Just in case it's an array
			value = value.split(',');
			
			elem.val(value);
		};		
		
		function restore() {
			$this.find('input:not([type=password],[type=submit],[type=hidden])').each(
					function(index) {
						restoreInput($(this), index);
					});
			$this.find('select').each(
					function(index) {
						restoreSelect($(this), index);
					});			
		}

		$this.on({
			submit : save
		});
		restore();

	};
}(jQuery, window));