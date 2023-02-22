/**
 * Take over presentation of form validation
 */
define('form_validation_messages', ['jquery', 'elgg/system_messages'], function($, system_messages) {

	var getLabelTextForElement = function(elem) {
		var $label;
		var id = $(elem).attr('id');
		
		if ($(elem).closest('#colorbox').length) {
			return false;
		}
		
		if (id === undefined) {
			// check if it is part of an input radio
			id = $(elem).parents('.elgg-input-radios').attr('id');
		}
		
		if (id === undefined) {
			// check if it is part of an input checkboxes
			id = $(elem).parents('.elgg-input-checkboxes').attr('id');
		}

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
		$('.elgg-system-messages .elgg-message:contains("' + message + '")').remove();
		system_messages.error(message, 0);
		
		event.preventDefault();
	};

	var hideValidateErrorMessage = function(event) {
		var label = getLabelTextForElement(this);
		if (!label) {
			return;
		}
		
		var message = label.replace(/\*+$/,'') + ": " + event.target.validationMessage;
		$('.elgg-system-messages .elgg-message:contains("' + message + '")').remove();
		
		event.preventDefault();
	};

	$(document).on('input change', 'input, textarea', hideValidateErrorMessage);
	$(document).on('change', 'select', hideValidateErrorMessage);
	
	$('input, textarea, select').on('invalid', showValidateErrorMessage);
	
	$(document).ajaxStop(function () {
		// invalid doesn't bubble so must be registered on element
		$('input, textarea, select').on('invalid', showValidateErrorMessage);
	});
});

require(['form_validation_messages']);
