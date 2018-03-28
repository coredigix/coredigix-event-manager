const LISTENER_MAP	= new WeakMap(); // store map of listeners
const EVENT_MAP		= new WeakMap(); // store map of events

const VALIDE_EVENT_NAME	= /^\s*(?:(?:[\w-]+\.)*[\w-]+\s*)+$/;



function _getEventSet(ele, eventName){
	var data	= EVENT_MAP[ele];
	if(data === undefined)
		data	= EVENT_MAP[ele] = {};
	if(data.hasOwnProperty(eventName) === false)
		data[eventName] = new Set();
	return data[eventName];
}

function _getListenerObj(ele){
	var data	= LISTENER_MAP[ele];
	if(data === undefined)
		data	= LISTENER_MAP[ele] = {};
	return data;
}