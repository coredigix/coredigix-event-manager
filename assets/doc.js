/**
 * this brighter library add 3 utils functions to an element
 * on       : add event listener
 * off      : remove event listener
 * trigger  : trigger an event
 * 
 * * *
	 * .on('event1', eventListner)
	 * .on('event1 event2', eventListner)
	 * .on('eventName.namespace', eventListner)
	 * .on('eventName.namespace.sub-namespace', eventListner)    // namespaces are case unsensitive
	 * .on('eventName.grp', eventListner, {options})
	 * 
	 * .off()							               // unbind all avents
	 * .off('eventName')					      // unbind all listeners on this event
	 * .off('eventName.namespace')		   // unbind all events of this namespace
	 * .off('eventName', eventListener)	// unbind this listner on this event
	 * .off('eventName.namespace', eventListener)// unbind this listner on this event from this namespace
   *
   * .off('.namespace')           // remove all eventlisteners of this namespace 
   * .off('.namespace', listener) // remove this listener from all events with this namespace
   *
   * .off(listener)   // remove this event listener from all events
	 *
	 * .trigger('eventName', extraParams)
	 * .trigger('eventName')
   * .trigger(event)
 * * *
 *
 * Example of use
 * * *
  	 * add event manager on this object
  	 * $$.addEventManager(obj);
 * * *
 * we could add underlayer functions
 * * *
  	 * $$.addEventManager(clzz.prototype, {
  	 * 		on	: (eventName, eventListener) 		=> {this.addEventListener(eventName, eventListener, false)},
  	 * 		off	: (eventName, eventListener) 		=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		trigger	: (eventNameOrEvent, extraParams)	=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		// optional methods
  	 * 			items	: function(){} // when this is a helper too, and not the distination object, example; liste of object, must return a list
  	 * 			//exampe: items : obj => {return this.filter();}
  	 * });
  	 *
 * * *
 * we could costurmise functions too
 * * * 
  	 * $$.addEventManager(clzz.prototype, {
  	 * 		on	: {
  	 * 			name	: 'on',
  	 * 			wrapper	: (element, eventName, eventListener) 		=> {this.addEventListener(eventName, eventListener, false)},
  	 * 		},
  	 * 		off	: {
  	 * 			name	: 'off',
  	 * 			wrapper	: (element, eventName, eventListener) 		=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		},
  	 * 		trigger	: {
  	 * 			name	: 'fire',
  	 * 			wrapper	: (element, eventNameOrEvent, extraParams)	=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		}
  	 * });
  	 * 
 * * *
 * 
 */