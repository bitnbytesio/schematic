import {set as _setProvider} from 'registry';

// create schematic
Object.assign(window, {
	schematic: {}
});


Object.assign(window.schematic, {

	set(object, path, value) {

		
        var a = path.split('.');

        for (let i = 0; i < a.length - 1; i++) {
            var n = a[i];
            if (n in object) {
                object = object[n];
            } else {
                object[n] = {};
                object = object[n];
            }
        }
        object[a[a.length - 1]] = value;
    }

});

Object.assign(window.schematic, {
	
	get(object, path) {
        var o = object;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }

});

// deps decorator
Object.assign(window, {
	deps(args) {
	   return function decorator(target) {
	      _setProvider('$$' + target.name, args);
	   }
	}
});

// extend default String
Object.assign(String.prototype, { 

	slug() {
		return this.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
 	}
   
});


// extend default object
Object.assign(Object.prototype, { 

	toAttributes(i, prefix) {

		var attributes = [];

        Object.keys(i).map( function (k) {
            var k = (typeof prefix == 'string') ? prefix + k : k;
            attributes.push(prefix + '=' + i[k]);
        });

        return attributes.join(' ');
 	}
   
});

Object.assign(Object.prototype, { 

	toQueryString(data, prefix) {

		var str = [];

	      for(var o in data) {
	        if (data.hasOwnProperty(o)) {

	          var k = prefix ? prefix + "[" + o + "]" : o, v = data[o];
	          str.push(typeof v == "object" ?
	           Object.toQueryString(v, k) :
	            encodeURIComponent(k) + "=" + encodeURIComponent(v));

	        }
	      }
           
        return str.join("&");

 	}
   
});

Object.assign(Object.prototype, { 
	merge(){

        var mergedObject = {};

        for (var i in arguments) {
            if (typeof arguments[i] != 'object') {
                throw new Error('Invalid object reference.');
            }
            for (var attribute in arguments[i]) { mergedObject[attribute] = arguments[i][attribute]; }
        }
        return mergedObject;
	}
});

Object.assign(window, {
	__isFunction(obj) {
		
  		return !!(obj && obj.constructor && obj.call && obj.apply);

	}
});

Object.assign(window, {
	 __isClass(obj) {
	  	const isCtorClass = obj.constructor
	      && obj.constructor.toString().substring(0, 5) === 'class'

		  if(obj.prototype === undefined) {
		    return isCtorClass
		  }

		const isPrototypeCtorClass = obj.prototype.constructor 
		    && obj.prototype.constructor.toString
		    && obj.prototype.constructor.toString().substring(0, 5) === 'class'

		  return isCtorClass || isPrototypeCtorClass
	}
});


// create custom promise for es2015
if (typeof Promise === 'undefined') {

	class Promise {
		construct(fn) {	

			this._successCallbacks = [];
			this._errorCallbacks = [];
			this._callbacks = [];

			let instance = this;

			var notifyAll = function (response) {
				if (instance._callbacks.length) {
					for (let i = 0; i <= instance._callbacks.length; i++ ) {
						instance._callbacks[i](response);
					}
				}
			};

			fn(
				function (response) {

					if (instance._successCallbacks.length) {
						for (let i = 0; i <= instance._successCallbacks.length; i++ ) {
							instance._successCallbacks[i](response);
						}
					}

					notifyAll(response);

				}, 
				function () {

					if (instance._errorCallbacks.length) {
						for (let i = 0; i <= instance._errorCallbacks.length; i++ ) {
							instance._errorCallbacks[i](response);
						}
					}

					notifyAll(response);

				}
			);

			
		}

		all(fn) {
			this._check(fn);
			this._callbacks.push(fn);
		}

		then(fn) {

			this._check(fn);
			this._successCallbacks.push(fn);
		}

		catch(fn) {
			this._check(fn);
			this._errorCallbacks.push(fn);
		}

		_check(fn) {
			if (typeof fn != 'function') {
				throw new Error('Invalid callback in promise.');
			}
		}
	}

}
