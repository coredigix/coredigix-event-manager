/*
LISTENER_MAP : {
	[listener]	: [
		['event', 'namespace1', 'subNamespace12'],
		['click', 'my-plugin', 'goupe1']
	]
}
 */
const LISTENER_MAP	= new WeakMap(); // store map of listeners
const EVENT_MAP		= new WeakMap(); // store map of events

const VALIDE_EVENT_NAME	= /^\s*(?:(?:[\w-]+\.)*[\w-]+\s*)+$/;



function _getEventSet(ele, eventName){
	if(EVENT_MAP.has(ele) === false)
		EVENT_MAP.set(ele, {});
	var data	= EVENT_MAP.get(ele);
	if(data.hasOwnProperty(eventName) === false)
		data[eventName] = new Set();
	return data[eventName];
}

function _getListenerObj(ele, listener){
	if(LISTENER_MAP.has(ele) === false)
		LISTENER_MAP.set(ele, new Map());
	var map	= LISTENER_MAP.get(ele);
	if(arguments.length === 2){
		if(map.has(listener) === false)
			map.set(listener, []);
		map = map.get(listener);
	}
	return map;
}