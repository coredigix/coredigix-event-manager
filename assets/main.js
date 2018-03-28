
//=require const.js
//=require defaults.js

/**
 * main function
 */
function addEventManager(obj, params){
	assert(arguments.length === 1 || arguments.length === 2, 'Illegal arguments');
	if(arguments.length === 2){
		for(var i in DEFAULT_PARAMS){
			assert(params.hasOwnProperty(i), i + ' is required on the seconde parameter');
			if(params[i].hasOwnProperty('wrapper'))
				assert(typeof params[i].wrapper === 'function', 'all wrapper must be functions');
			else params[i].wrapper	= DEFAULT_PARAMS[i].wrapper;
		}
	}
	else params	= DEFAULT_PARAMS;
	// add properties
	Object.defineProperties(obj, {
		// on
		[params.on.name || 'on']	: {
			value	: function(eventName, listener, options){
				// asserts
				assert(typeof eventName === 'string' && VALIDE_EVENT_NAME.test(eventName) === true, 'Illegal event name');
				assert(typeof listener === 'function', 'Illegal listener');
				// group
				var events	= eventName.trim().split(/\s+/).map(ev => strUtils.split(ev, '.'));
				// add listeners
				(fx => {
					if(typeof params.items === 'function')
						params.items(obj).forEach(fx);
					else fx(obj);
				})(ele => {
					for(var i = 0, len = events.length; i < len; ++i)
						_addListener(ele, events[i], options, listener, params.on.wrapper);
				});
			}
		},
		// off
		[params.off.name || 'off']	: {
			value	: function(eventName, listener, options){
				// remove all events
				if(arguments.length === 0){
					
				}
				// remove all event listeners
				else if(arguments.length === 1){}
				// remove a listener
				else if(arguments.length === 2){}
				// error
				else throw new Error('Illegal arguments');
				// asserts
				assert(typeof eventName === 'string' && VALIDE_EVENT_NAME.test(eventName) === true, 'Illegal event name');
				assert(typeof listener === 'function', 'Illegal listener');
			}
		},
		// trigger
		[params.trigger.name || 'trigger']	: {
			value	: function(){}
		},
	});
}

// add listener
function _addListener(element, eventListPath, options, listener, wrapper){
	// add event to element
		wrapper.call(element, element, eventListPath[0], listener, options);
	// get private data store
		var privateData	= _getListenerObj(element);
	// add listener to dest path
		$$.path({
			input		: privateData,
			path		: eventListPath,
			template	: {items: {}, listeners: []},
			childkey	: 'items'
		}).value.listeners.push(listener);
}