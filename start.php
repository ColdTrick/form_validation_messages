<?php

// register default elgg events
elgg_register_event_handler('init', 'system', 'form_validation_messages_init');

/**
 * Init function for this plugin
 *
 * @return void
 */
function form_validation_messages_init() {
	elgg_extend_view('js/elgg', 'js/form_validation_messages');
}
