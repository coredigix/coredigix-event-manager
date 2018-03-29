
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
				_on(this, eventName, listener, options, params);
			}
		},
		// off
		[params.off.name || 'off']	: {
			value	: function(eventName, listener, options){
				_off(this, eventName, listener, options, params);
			}
		},
		// trigger
		[params.trigger.name || 'trigger']	: {
			value	: function(){}
		},
	});
}

// add event listner
function _on(obj, eventName, listener, options, params){
	var i, j, len, len2, element, eventPath;
	// asserts
	assert(typeof eventName === 'string' && VALIDE_EVENT_NAME.test(eventName) === true, 'Illegal event name');
	assert(typeof listener === 'function', 'Illegal listener');
	// group
	var events	= eventName.trim().split(/\s+/).map(ev => strUtils.split(ev, '.'));
	// items
	var items;
	if(typeof params.items === 'function')
		items	= params.items(obj);
	else items = [obj];
	// add listeners
	for(i=0, len = items.length; i < len; ++i){
		element	= items[i];
		for(j = 0, len2 = events.length; j < len2; ++j){
			eventPath = events[j];
			// add event to element
			params.on.wrapper(element, eventPath[0], listener, options);
			// get private data store
			var namespaceList	= _getListenerObj(element, listener);
			// add listener if not already exists
			if(namespaceList.every(it => !pathEquals(eventPath, it)))
				namespaceList.push(eventPath);
		}
	}
}
// remove event
function _off(obj, eventName, listener, options, params){
	var items, map, element;
	var off = params.off.wrapper;
	// listener
	if(listener === undefined && typeof eventName === 'function'){
		listener = eventName;
		eventName= undefined;
	}
	// get items
	if(typeof params.items === 'function')
		items = params.items(obj);
	else
		items = [obj];
	// apply
	for(var i=0, len = items.length; i < len; ++i){
		element	= items[i];
	}
	if(eventName === undefined && listener === undefined){
		items.forEach(ele => {
			map = _getListenerObj(ele);
			map.forEach((v,k) => {
				off(obj, eventName, listener, options);
			});
			map.clear();
		});
	}
	// .off('eventName')									// remove all listeners of this event
	// .off('eventName1.namespace eventName2.namespace')	// remove all listeners of thoses events of namespaces
	// .off('.namespace')									// remove all listeners of this namespace
	// .off(listener)										// remove this listener from all events
	else if(arguments.length === 1){

	}
	// .off('event', listener)
	// .off('event.namespace', listener)
	// .off('event.namespace event2', listener)
	// .off('.namespace', listener)
	else if(arguments.length === 2){
		assert(typeof)
	}
	else throw new Error('Illegal arguments');
}