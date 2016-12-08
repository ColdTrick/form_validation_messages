/**
 * Take over presentation of form validation
 */
define('form_validation_messages', function(require) {
	var $ = require('jquery');
	var elgg = require('elgg');

	var getLabelTextForElement = function(elem) {
		var $label;
		var id = $(elem).attr('id');
		
		if (id) {
			$label = $('label[for="' + id + '"]').eq(0);
			if ($label.length) {
				return $label.text();
			}
		}
		
		return false;
	};
	
	var showValidateErrorMessage = function(event) {
		var label = getLabelTextForElement(this);
		if (!label) {
			return;
		}

		var message = label.replace(/\*+$/,'') + ": " + event.target.validationMessage;
		
		elgg.register_error(message, 2000);
		
		event.preventDefault();
	};
	
	var init = function() {
		$('input').on('invalid', showValidateErrorMessage);
		
		$(document).ajaxStop(function () {
			$('input').on('invalid', showValidateErrorMessage);
		});
	};
	
	elgg.register_hook_handler('init', 'system', init);
});

require(['form_validation_messages']);