'use strict';

 schematic.service('router', ['@xhr','@stage', function ($xhr, $stage) { 

 	var router = {};
 	
 	var routes = {};

 	var defaultPath = null;

 	var fetchMode = 'eager';

 	var url = '';
 	
 	var html5Mode = false;

        
 	router.url = function (u) {
 		url = u;
 	}

 	router.html5 = function () {

 		html5Mode = true;
 	};

 	router.fetchMode = function ( m ) {

 		if (['eager', 'lazy'].indexOf(m) < 0) throw new Error('Invalid fetch mode.');

 		fetchMode = m;

 	};

 	router.on = function (s, obj) {

 		routes[s] = obj;

 	};

 	router.default = function (s) {
 		defaultPath = s;
 	};

    router.test = function () {
        alert('router in...');
    };

    function handleRoute( hash, path ) {

    	if (typeof path == 'string') {
    		var fullUri = path;

    		if (fullUri.indexOf('http') < 0) {
    			fullUri = url + path;
    		}

    		$xhr.create(fullUri).then(function (o) {

                if (typeof o == 'string') {
                    o = JSON.parse(o);
                }
                
                if (o instanceof Array) {
    			 $stage.draw(router.meta.app, o);
                } else {
                    throw new Error('Invalid model ' + path);
                }

    		}).error(function (s,r) {

    		});
    	}
    	
    }

    router.init = function () {

            router.meta.app.routable = true;

            var routeListner = function () {
                var hash = window.location.hash.replace('#', '');

                if (typeof routes[hash] != 'undefined') {
                    handleRoute(hash, routes[hash]);
                } else if(defaultPath != null) {
                    window.location.hash = '#' + defaultPath;
                }
            };
                
            window.onhashchange = routeListner;

            if (window.location.hash) {
                routeListner();
            }
            
            window.location.hash = '#' + defaultPath;
         
        
    };
         
     
    return router;  
       
}]);