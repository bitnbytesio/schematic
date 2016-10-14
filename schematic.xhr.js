'use strict';

 schematic.register('xhr', function () { 

    var url = undefined;
    var method = 'get';
    var headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'};
    var xhr = null;

    var callbacks = {};


    // create events

    var successEvent;
    if (document.createEvent) {
        successEvent = document.createEvent("HTMLEvents");
        successEvent.initEvent('xhrSuccess', true, true);
    } else {
        successEvent = document.createEventObject();
        successEvent.eventType = 'xhrSuccess';
    }
    successEvent.eventName = 'xhrSuccess';
    

     var errorEvent;
    if (document.createEvent) {
        errorEvent = document.createEvent("HTMLEvents");
        errorEvent.initEvent('xhrError', true, true);
    } else {
        errorEvent = document.createEventObject();
        errorEvent.eventType = 'xhrError';
    }
    errorEvent.eventName = 'xhrError';    

    // event dispatcher
    var dispatchEvent = function (e) {
        if (document.createEvent) {
                try {
                    document.dispatchEvent(e);
                } catch (ex) {
                   console.info("Unable to dispatch event xhrEvent.");
                }
        } else {
            document.fireEvent("on" + e.eventType, e);
        }
    };

    // serializer

    var helpers = schematic.get('@helpers');


    this.create = function (src, type, data) {

        var data = data || '';
        var type = type || method;

        if (typeof data == 'object') {
            if ( !(data instanceof FormData) ) {
               data = helpers.serializeToQS(data);
            } else {
                delete headers['Content-Type'];
            }
        }
      

        if (['get', 'post', 'put', 'delete'].indexOf(type.toLowerCase()) < 0) {
            throw new Error('Invalid request method ' + type);
        }

        method = type;
      
        url = src;


        if(typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
             } // end for
        }

        xhr.onreadystatechange = function () {
            if(xhr.readyState < 4) {
                return;
            }
            
            // some error occurred 
            if(xhr.status !== 200 && typeof callbacks.error == 'function') {
                errorEvent.status = xhr.status;
                errorEvent.response = xhr.responseText;
                dispatchEvent(errorEvent);
                return callbacks.error(xhr.status, xhr.responseText);
            }
 
            // all is well  
            if(xhr.readyState === 4 && typeof callbacks.then == 'function' && xhr.status === 200) {

                successEvent.status = xhr.status;
                successEvent.response = xhr.response;

                dispatchEvent(successEvent);

                return callbacks.then(xhr.response, xhr.status);
            }           
        }
         
        xhr.open(method, url, true);

        // set headers
            
        Object.keys(headers).map(function(key) {
            xhr.setRequestHeader(key, headers[key]);
        });
                
            
        
        xhr.send(data);

        var callbackHandler = new (function () {

             this.then = function ( obj ) {

                if (typeof obj != 'function') {
                    throw new Error('Invalid callback in then.');
                }

                callbacks.then = obj;

                return this;

            };

            this.error = function ( obj ) {

                if (typeof obj != 'function') {
                    throw new Error('Invalid callback in error.');
                }

                callbacks.error = obj;

                return this;

            };

            return this;


        })();

        return callbackHandler;

    };

   
         
    return this;       
       
});