const DEFAULT_PARAMS  = {
 	on  : {
 		wrapper : function(element, eventName, eventListener, _){
 			_getEventSet(element, eventName).add(eventListener);
		}
	},
	off : {
		wrapper : function(element, eventName, eventListener, _){
			_getEventSet(element, eventName).delete(eventListener);
		}
	},
	trigger : {
		wrapper : function(element, eventNameOrEvent, extraParams){
			var eventName;
			var evnt;
			// create event
			if(typeof eventNameOrEvent === 'string'){
				eventName	= eventNameOrEvent;
				// create event
				if(extraParams instanceof Event){
					evnt		= extraParams;
					extraParams	= null;
				}
				else
					evnt  = new Event(eventNameOrEvent);
			} else {
				eventName	= eventNameOrEvent.type;
				evnt		= eventNameOrEvent;
				// extrat
				if(arguments.length > 2){
					$$.merge(evnt, extraParams);
				}
			}
			// get all listeners
			_getEventSet(element, eventName).forEach(listener => {
				try{
					listener.call(element, evnt);
				}catch(e){
					$$.uncaughtError('EVENT-MANAGER', e);
				}
			});
		}
	}
};
