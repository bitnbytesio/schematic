
class CreateEvent {

	constructor(name) {
		var successEvent;
	    if (document.createEvent) {
	        successEvent = document.createEvent("HTMLEvents");
	        successEvent.initEvent(name, true, true);
	    } else {
	        successEvent = document.createEventObject();
	        successEvent.eventType = name;
	    }
	    successEvent.eventName = name;
	}

}

class DispatchEvent {
	constructor(e) {
		if (document.createEvent) {
            try {
                document.dispatchEvent(e);
            } catch (ex) {
               console.info("Unable to dispatch event xhrEvent.");
            }
        } else {
            document.fireEvent("on" + e.eventType, e);
        }
	}
}

