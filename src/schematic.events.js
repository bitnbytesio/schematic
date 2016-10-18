'use strict';

 schematic.register('event', function () { 

   

    // create events

    this.create = function (name, type) {
        var event;
        var type = type || name;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(name, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = type;
        }
        event.eventName = name;

        return event;
    };

    this.dispatch = function (e) {
        if (document.createEvent) {
                try {
                    document.dispatchEvent(e);
                } catch (ex) {
                   console.info("Unable to dispatch event " + e);
                }
        } else {
            document.fireEvent("on" + e.eventType, e);
        }
    };

    
    

   
});