import response from './response';

export default class request {

	constructor(url,config) {
		this._config = {
			method: 'get',
			headers: {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}
		};

		this._url = url;
	
	}

	_create() {

		let data = this._config.data || null;

		if (typeof data == 'object') {
            if ( !(data instanceof FormData) ) {
               data = Object.toQueryString(data);
            } else {
                delete this._config.headers['Content-Type'];
            }
        }

		if (['get', 'head', 'post', 'put', 'delete', 'jsonp', 'patch'].indexOf(this._config.method.toLowerCase()) < 0) {
            throw new Error('Invalid request method ' + type);
        }

		let instance = this;

		return new Promise( function (resolve, reject) {

			var xhr;

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

	            let r = new response(xhr);

	            if (xhr.status != 200) {
	            	reject(r);
	            }

	            if (xhr.status == 200) {
	            	resolve(r);
	            }

	        };

	        let url = instance._url;

	        if (instance._config.method == 'get') {
	            url += '?' + data;
	         }

	        xhr.open(instance._config.method, url, true);

	        if (instance._config.headers) {
		        Object.keys(instance._config.headers).map(function(key) {
		            xhr.setRequestHeader(key, instance._config.headers[key]);
		        });
	    	}	    	

	    	xhr.send(data);

        } );

	}

	static get(url) {

		let config = {};

		let r = new request(url, 'get', config);
		return r._create();
		
	}

	static post() {
		
	}

	static put() {
		
	}

	static options() {
		
	}

	static jsonp() {
		
	}

	static delete() {
		
	}



}

